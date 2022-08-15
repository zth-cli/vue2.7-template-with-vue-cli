/*
 * @Author: rzx007
 * @Date: 2021-07-02 15:29:05
 * @LastEditors: rzx007
 * @LastEditTime: 2021-07-02 16:30:08
 * @FilePath: \vue-template-with-elementui\autoGit.js
 * @Description: Do not edit
 */
const util = require('util')
const { exec } = require('child_process')
const build = util.promisify(exec)
async function lsExample() {
  const { stdout, stderr } = await build('npm run build')
  console.log('stdout:', stdout)
  console.error('stderr:', stderr)
}
lsExample()
