import { computed } from 'vue'

export default function useSortable<T>(props, emit) {

  //1、记录有排序功能的列
  //2、排序回调
  let sortColumns = computed(() => {
    console.log(111);

    return props.value.filter(item => item.isSort);
  });

  function sortCallBack(config, order) {
    console.log(222, config);

    console.log('点击排序后的回调', config);
    config.order === 'desc' ? 'asc' : 'desc'
    sortColumns.value.forEach(item => {
      item.order = order
    });

    emit('sort', { props, order })
  };

  return { sortColumns, sortCallBack };
}