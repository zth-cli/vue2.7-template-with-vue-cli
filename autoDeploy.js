// 测试环境
const dev = {
  host: '10.172.246.234', // 服务器ip地址或域名
  password: 'root.2011', // 密码
  catalog: '/usr/local/etc/apache-tomcat-8.5.53/webapps/sjzc', // 前端文件压缩目录
  port: 22, // 服务器ssh连接端口号
  username: 'root', // ssh登录用户
  // ssh连接跳转至目标机配置，适用于跳板机-内网登录，如无需跳转请注释掉该配置
  // agent: {
  //   host: '10.186.77.223',
  //   port: 22,
  //   username: "root",
  //   password: ""
  // },
}
// 线上环境
const pro = {
  host: '103.24.179.134',
  password: 'Root@2020',
  catalog: '/home/tomcat/webapps/sjzc',
  port: 10012,
  username: 'root',
}

// 项目打包时根据环境，替换接口IP
const fileConfig = {
  url: './public/config.js',
  replaceRegx: /proApiUrl:\s*["|'](.*?)["|']/g,
  dev: "proApiUrl: 'http://10.172.246.234:9095'",
  pro: "proApiUrl: 'http://103.24.179.134:9095'",
}

// 全局配置
const Config = {
  publishEnv: dev,
  // publishEnv: [pro,dev], // 发布环境，可填写多个，也可只填写一个
  buildDist: 'dist', // 前端文件打包之后的目录，默认dist
  buildCommand: 'npm run build', // 打包前端文件的命令
  readyTimeout: 20000, // ssh连接超时时间
  deleteFile: true, // 是否删除线上上传的dist压缩包
}

const { exec } = require('child_process')
const path = require('path')
const archiver = require('archiver') // 问价压缩
const fs = require('fs')
const Client = require('ssh2').Client // 链接远程主机

// 前端打包文件的目录
// const dir = path.resolve(__dirname, Config.buildDist);

/**
 * ssh连接
 */
class SSH {
  constructor({ host, port, username, password, agent }) {
    this.server = { host, port, username, password }

    this.hasAgent = agent && agent.host && agent.port && agent.username
    if (this.hasAgent) {
      this.connAgent = new Client() // 连接跳板机
      this.conn = new Client() // 连接目标机
      this.agent = agent
    } else {
      this.conn = new Client()
    }
  }

  // 连接服务器
  connectServer() {
    return new Promise((resolve, reject) => {
      let conn = this.conn
      if (this.hasAgent) {
        conn = this.connAgent
      }
      conn
        .on('ready', () => {
          if (this.hasAgent) {
            // Alternatively, you could use netcat or socat with exec() instead of
            // forwardOut()
            console.log('----连接跳板机成功----')
            conn.forwardOut('127.0.0.1', 12345, this.agent.host, this.agent.port, (err, stream) => {
              if (err) {
                conn.end()
                reject({
                  success: false,
                  error: err,
                })
              }
              // 连接目标机
              this.conn
                .on('ready', () => {
                  console.log('----连接目标机成功----')
                  resolve({
                    success: true,
                  })
                })
                .on('error', (err) => {
                  reject({
                    success: false,
                    error: err,
                  })
                })
                .on('end', () => {
                  console.log('target ssh connect end!')
                })
                .on('close', (had_error) => {
                  console.log('target ssh connect close')
                })
                .connect({
                  sock: stream,
                  username: this.agent.username,
                  password: this.agent.password,
                })
            })
          } else {
            resolve({ success: true })
          }
        })
        .on('error', (err) => {
          reject({ success: false, error: err })
        })
        .on('end', () => {
          console.log('----SSH连接已结束----')
        })
        .on('close', (had_error) => {
          console.log('----SSH连接已关闭----')
        })
        .connect(this.server)
    })
  }

  // 上传文件
  uploadFile({ localPath, remotePath }) {
    return new Promise((resolve, reject) => {
      return this.conn.sftp((err, sftp) => {
        if (err) {
          reject({ success: false, error: err })
        } else {
          sftp.fastPut(localPath, remotePath, (err, result) => {
            if (err) {
              reject({ success: false, error: err })
            }
            resolve({ success: true, result })
          })
        }
      })
    })
  }

  // 执行ssh命令
  execSsh(command) {
    return new Promise((resolve, reject) => {
      return this.conn.exec(command, (err, stream) => {
        if (err || !stream) {
          reject({ success: false, error: err })
        } else {
          stream
            .on('close', (code, signal) => {
              resolve({
                success: true,
              })
            })
            .on('data', function (data) {
              console.log(data.toString())
            })
            .stderr.on('data', function (data) {
              resolve({
                success: false,
                error: data.toString(),
              })
            })
        }
      })
    })
  }

  // 结束连接
  endConn() {
    this.conn.end()
    if (this.connAgent) {
      this.connAgent.end()
    }
  }
}

/*
 * 本地操作,文件的打包，压缩，删除
 * */
class File {
  constructor(fileName) {
    this.fileName = fileName
  }

  // 删除本地文件
  deleteLocalFile() {
    return new Promise((resolve, reject) => {
      fs.unlink(this.fileName, function (error) {
        if (error) {
          reject({
            success: false,
            error,
          })
        } else {
          resolve({
            success: true,
          })
        }
      })
    })
  }

  // 压缩文件夹下的所有文件
  zipFile(filePath) {
    return new Promise((resolve, reject) => {
      // 创建文件输出流
      const output = fs.createWriteStream(__dirname + '/' + this.fileName)
      const archive = archiver('zip', {
        zlib: {
          level: 9,
        }, // 设置压缩级别
      })
      // 文件输出流结束
      output.on('close', function () {
        console.log(`----压缩文件总共 ${archive.pointer()} 字节----`)
        console.log('----压缩文件夹完毕----')
        resolve({
          success: true,
        })
      })
      // 数据源是否耗尽
      output.on('end', function () {
        console.error('----压缩失败，数据源已耗尽----')
        reject()
      })
      // 存档警告
      archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
          console.error('----stat故障和其他非阻塞错误----')
        } else {
          console.error('----压缩失败----')
        }
        reject(err)
      })
      // 存档出错
      archive.on('error', function (err) {
        console.error('----存档错误，压缩失败----')
        console.error(err)
        reject(err)
      })
      // 通过管道方法将输出流存档到文件
      archive.pipe(output)

      // 打包dist里面的所有文件和目录
      archive.directory(filePath, false)
      // archive.directory(`../${Config.buildDist}/`, false);

      // 完成归档
      archive.finalize()
    })
  }

  // 打包本地前端文件
  buildProject() {
    console.log('----开始编译打包文件，请耐心等待----')
    return new Promise((resolve, reject) => {
      exec(Config.buildCommand, async (error, stdout, stderr) => {
        if (error) {
          console.error(error)
          reject(new Error(error))
        } else if (stdout) {
          resolve({
            stdout,
            success: true,
          })
        } else {
          console.error(stderr)
          reject(new Error(stderr))
        }
      })
    })
  }

  // 停止程序之前需删除本地压缩包文件
  stopProgress() {
    this.deleteLocalFile()
      .catch((e) => {
        console.error('----删除本地文件失败，请手动删除----')
        console.error(e)
      })
      .then(() => {
        console.log('----已删除本地压缩包文件----')
      })
  }
}

// SSH连接，上传，解压，删除等相关操作
async function sshUpload(sshConfig, fileName) {
  const sshCon = new SSH(sshConfig)
  const sshRes = await sshCon.connectServer().catch((e) => {
    console.error(e)
  })
  if (!sshRes || !sshRes.success) {
    console.error('----连接服务器失败，请检查用户名密码是否正确以及服务器是否已开启远程连接----')
    return false
  }

  console.log('----连接服务器成功，开始上传文件----')

  const uploadRes = await sshCon
    .uploadFile({
      localPath: path.resolve(__dirname, fileName),
      remotePath: sshConfig.catalog + '/' + fileName,
    })
    .catch((e) => {
      console.error(e)
    })

  if (!uploadRes || !uploadRes.success) {
    console.error('----上传文件失败，请重新上传----')
    return false
  }
  console.log('----上传文件成功，开始解压文件----')

  const zipRes = await sshCon
    .execSsh(`unzip -o ${sshConfig.catalog + '/' + fileName} -d ${sshConfig.catalog}`)
    .catch((e) => {})
  if (!zipRes || !zipRes.success) {
    console.error('----解压文件失败，请手动解压zip文件----')
    console.error(`----错误原因：${zipRes.error}----`)
  }
  if (Config.deleteFile) {
    console.log('----解压文件成功，开始删除上传的压缩包----')

    // 注意：rm -rf为危险操作，请勿对此段代码做其他非必须更改
    const deleteZipRes = await sshCon
      .execSsh(`rm -rf ${sshConfig.catalog + '/' + fileName}`)
      .catch((e) => {})
    if (!deleteZipRes || !deleteZipRes.success) {
      console.error('----删除文件失败，请手动删除zip文件----')
      console.error(`----错误原因：${deleteZipRes.error}----`)
    }
  }
  // 结束ssh连接
  sshCon.endConn()
}

// 根据环境自动替换接口IP地址
async function replaceIP(env, fileConfig) {
  fs.readFile(path.resolve(__dirname, fileConfig.url), 'utf8', (err, data) => {
    if (err) {
      console.error('读取错误' + err)
      return
    }
    let list = data
    list = list.replace(fileConfig.replaceRegx, fileConfig[env])
    console.log(list)
    fs.writeFile(path.resolve(__dirname, './public/config.js'), list, (err) => {
      if (err) {
        console.error('写入错误' + err)
      }
    })
  })
}

// 执行前端部署
;(async () => {
  const argv = process.argv.slice(2)
  console.log(eval(argv[0]))
  Config.publishEnv = argv ? eval(argv[0]) : ''
  // 替换接口IP地址
  await replaceIP(argv[0], fileConfig)
  // 压缩包的名字
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const timeStr = `${year}_${month}_${day}`
  const fileName =
    `${Config.buildDist}-` + timeStr + '-' + Math.random().toString(16).slice(2) + '.zip'

  const file = new File(fileName)

  // 打包文件
  const buildRes = await file.buildProject().catch((e) => {
    console.error(e)
  })
  if (!buildRes || !buildRes.success) {
    console.error('----编译打包文件出错----')
    return false
  }
  console.log(buildRes.stdout)
  console.log('----编译打包文件完成----')

  // 压缩文件

  const res = await file.zipFile(`${Config.buildDist}/`).catch(() => {})
  if (!res || !res.success) return false
  console.log('----开始进行SSH连接----')

  if (Config.publishEnv instanceof Array && Config.publishEnv.length) {
    for (let i = 0; i < Config.publishEnv.length; i++) {
      await sshUpload(Config.publishEnv[i], fileName)
    }
  } else {
    await sshUpload(Config.publishEnv, fileName)
  }

  console.log('----部署成功，正在为您删除本地压缩包----')
  file.stopProgress()
})()
