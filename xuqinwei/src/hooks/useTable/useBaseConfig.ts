import { toRefs, reactive } from 'vue'

export default function useBaseConfig(props) {
  let data = toRefs(props)

  const { defaultSort, rowKey, orderType } = data

  const baseConfig = reactive({
    defaultSort,
    rowKey,
    orderType
  })
  return [baseConfig] as const;
}
