import { PaginationProps } from '../typs'
import { toRefs, computed } from 'vue'

export default function usePage(props: PaginationProps) {
    let { total, pageSize, currentPage, pagerCount } = toRefs(props)

    //当前总页数
    let pageCount = computed(() => {
        return Math.ceil(total.value / pageSize.value)
    })

    //处理当前显示的分页按钮
    let pagers = computed(() => {
        //分页按钮开始的位置
        let start = 1
        //分页按钮结束的位置
        let end = pagerCount.value
        //如果当前分页总数小于显示的按钮数量 ，直接显示所以分页按钮
        if (pageCount.value <= pagerCount.value) {
            end = pageCount.value
        } else {
            //否则计算分页开始的位置 ，最小从1开始
            start = Math.max(currentPage.value - Math.floor(pagerCount.value / 2), 1)
            //防止分页按钮超出最大值
            start = Math.min(start, pageCount.value - pagerCount.value + 1)
            end = start + end - 1
        }
        let pages: number[] = []
        //记录分页按钮信息
        while (start <= end) {
            pages.push(start)
            start++
        }
        return pages
    })
    return { pageCount, pagers, currentPage }
}