<script lang="ts">
import { defineComponent, onBeforeMount, getCurrentInstance } from 'vue'
// 重定向然后返回到重定向之前页面，实现页面重载
export default defineComponent({
  name: 'Redirect',
  setup() {
    onBeforeMount(() => {
      const router = getCurrentInstance()?.proxy.$router
      const route = getCurrentInstance()?.proxy.$route
      const { params, query } = route
      const { path } = params
      router.replace({
        path: '/' + (Array.isArray(path) ? path.join('/') : path),
        query
      })
    })
    return () => null
  }
})
</script>
