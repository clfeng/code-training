import { TableProps, BaseConfig } from '../type'


function pick<O, K extends Array<keyof O>>(obj: O, keys: K): Pick<O, K[number]> {
    let newObj = {} as Pick<O, K[number]>
    return keys.reduce((newObj, key) => {
        if (key in obj) {
            newObj[key] = obj[key]
        }
        return newObj
    }, newObj)
}


//表格的一些基础配置，在表格渲染后，这些字段应该是不变的，单独提出来，否则直接使用tableProps的话，可能会导致一些监听方法无意义执行
export default function useBaseConfig(props: TableProps): BaseConfig {
    return pick(props, ['orderBy', 'orderColumnMultiple', 'orderType', 'defaultSort', 'rowKey', 'filterType', 'filterColumnMultiple'])
}