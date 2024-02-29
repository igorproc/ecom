export interface IPaginationItem {
  id?: string,
  text: string,
  value: number,
}

export function getDefaultPagination(totalPages: number, currentPage: number): IPaginationItem[] {
  const MAX_ITEMS = 2
  const result: IPaginationItem[] = []

 return result
}
