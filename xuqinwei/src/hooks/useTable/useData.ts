import { computed, toRefs } from 'vue'

export default function useData<T>(props, sortColumns, config) {
  let { data } = toRefs(props)

  // 1、原始数据
  // 2、排序后的数据
  // 排序数据
  function sortData(data, baseConfig) {
    if (baseConfig.orderType || data.value.length === 0) {
      return data.value
    }
    console.log('data-->', data);

    let sortedData = data.value.slice()
    sortColumns.value.forEach(column => {
      sortedData.sort((a, b) => {
        let flag = column.order === 'desc' ? -1 : 1

        return (b[column.prop] - a[column.prop]) * flag;
      })

    });
    return sortedData;
  }
  const dealDate = computed(() => {

    const sortedData = sortData(data, config)

    return sortedData
  });

  return dealDate;
};