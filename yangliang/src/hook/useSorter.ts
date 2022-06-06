export type Sorter = {
    key: string;
    asc: boolean;
}
export const useSorter = (dataSource:any[], currentSorter:Sorter):any[] => {
      if(currentSorter.key) {
        if(currentSorter.asc){
          dataSource.sort((a,b) => a[currentSorter.key] - b[currentSorter.key]);
        } else {
          dataSource.sort((a,b) => b[currentSorter.key] - a[currentSorter.key]);
        }
      }      
      return dataSource;
}