type Log = {
    level: string;
    message: any;
};
const logs: Log[] = [];
export function addLog(log:Log) {
    logs.push(log);
}

// 每过一定时间将数据返回至日志服务器
// setTimeout(() => {
//     axios({
//         url: '日志服务器',
//         data: logs
//     })
// },timer)