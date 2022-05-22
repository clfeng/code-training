import { computed, defineComponent, toRefs } from 'vue'
//样式
import './style.less'

import { tableProps } from 'components/SimpleTable/type'
//组件
import TableHeader from './components/TableHeader'
import TableBody from './components/TableBody'
import Pagination from '../Pagination/index.vue'
//hook
import useBaseConfig from './hooks/useBaseConfig'
import useColumns from './hooks/useColumns'
import useSortable from './hooks/useSortable'
import useFilter from './hooks/useFilter'
import useData from './hooks/useData'
import useStyle from './hooks/useStyle'

export default defineComponent({
    name: 'SimpleTable',
    props: tableProps,
    emits: ['sortChange', 'filterChange', 'currentChange'],
    setup(props, { slots, emit }) {

        //收集表格基本配置
        let baseConfig = useBaseConfig(props)

        //收集表格列信息
        let columns = useColumns(baseConfig, slots)

        //处理排序相关信息
        let { activeSorters, onChangeSort } = useSortable(baseConfig, columns, emit)

        //处理筛选相关信息
        let { activeFilters, onFilterChange } = useFilter(baseConfig, columns, emit)

        //处理数据
        let filterData = useData(props, baseConfig, activeSorters, activeFilters)

        //处理表格样式
        let { tableStyle } = useStyle(props)

        let { pageSize, total, pagerCount, currentPage } = toRefs(props)


        return () => {
            return (
                <section class="simple-table" style={tableStyle.value}>
                    <div class="simple-table__header-warp">
                        <TableHeader onChangeSort={onChangeSort} onFilterChange={onFilterChange} columns={columns.value} />
                    </div>
                    <div class="simple-table__body-warp">
                        <TableBody columns={columns.value} data={filterData.value} row-key={props.rowKey} />
                    </div>
                    <div class="simple-table__pagination">
                        <Pagination page-size={pageSize.value} total={total.value} pager-count={pagerCount.value} current-page={currentPage.value} onCurrentChange={(...args: any[]) => emit('currentChange', ...args)} />
                    </div>
                </section>
            )
        }
    },
})