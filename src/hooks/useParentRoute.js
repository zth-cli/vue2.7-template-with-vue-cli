import { ref, computed, watch, getCurrentInstance } from 'vue'

// 通过子路ID 寻找父级路由集合
export function useParentRoute() {
  const store = getCurrentInstance()?.proxy.$store
  const route = getCurrentInstance()?.proxy.$route
  const routeArr = computed(() => store.getters.routes)

  const parentRoute = ref([])
  const findRouteById = (routeArrs, id) => {
    for (let index = 0; index < routeArrs.length; index++) {
      const element = routeArrs[index]
      if (element.id === id) {
        parentRoute.value = [element]
        findRouteById(routeArr.value, element.parentId)
        break
      } else if (element.children) {
        findRouteById(element.children, id)
      }
    }
  }
  findRouteById(routeArr.value, route.meta.rId)

  watch(
    () => route.path,
    () => {
      findRouteById(routeArr.value, route.meta.rId)
    }
  )

  return { parentRoute }
}
