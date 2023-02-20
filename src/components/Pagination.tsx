import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
// import { DropdownSimple } from '@/components/DropdownSimple'

type PaginationProps = {
  page: number;
  setPage: any;
  total: number;
  limit: number; 
  setLimit: any;
};

export const Pagination: React.FC<PaginationProps> = ({ page, setPage, total, limit, setLimit }) => {
  const gap = 1
  const gapThreshold = 7
  const gapSymbol = '...'
  const incrementPage = () => page < getLastPage() && setPage(page + 1)
  const decrementPage = () => page > 1 && setPage(page - 1)
  const setCurPage = (number: number) => setPage(number)
  const getLastPage = () => Math.ceil(total / limit)

  const range = (start: number, end: number) => {
    let length = end - start + 1
    return Array.from({ length }, (_, idx) => idx + start)
  }

  let pageNumbers: any[] = []

  if (getLastPage() > gapThreshold) {
    const leftIndex = Math.max(page - gap, 1)
    const rightIndex = Math.min(page + gap, getLastPage())

    const showLeftGap = leftIndex > 2
    const showRightGap = rightIndex < getLastPage() - 2

    const firstPage = 1

    if (!showLeftGap && showRightGap) {
      let leftItemCnt = 3 + 2 * gap
      let leftRange = range(1, leftItemCnt)

      pageNumbers = [...leftRange, gapSymbol, getLastPage()];
    }

    if (showLeftGap && !showRightGap) {
      let rightItemCount = 3 + 2 * gap
      let rightRange = range(
        getLastPage() - rightItemCount + 1,
        getLastPage()
      )
      pageNumbers = [firstPage, gapSymbol, ...rightRange]
    }

    if (showLeftGap && showRightGap) {
      let middleRange = range(leftIndex, rightIndex)
      pageNumbers = [firstPage, gapSymbol, ...middleRange, gapSymbol, getLastPage()]
    }
  } else if (getLastPage() > 1 && getLastPage() <= gapThreshold) {
    for (let i = 1; i <= getLastPage(); i++) {
      pageNumbers.push(i)
    } 
  }

  return (
    total > limit ? 
    <div>
      <nav className="inline-flex">
        <button
          onClick={() => decrementPage()}
          className="relative inline-flex items-center rounded-r-md border px-2 py-2 border-gray"
        >

          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        {pageNumbers.map((number, idx) => (
          number == gapSymbol ?
            <div key={idx} className="border border-gray">
              <span className="relative inline-flex items-center px-4 py-2">...</span>
            </div>
          :
          <button
            key={idx}
            onClick={() => setCurPage(number)}
            className={
              number == page ?
                "cursor-text relative z-10 inline-flex items-center border px-4 py-2 selected"
                : "relative inline-flex items-center border px-4 py-2 border-gray"
            }
          >
            {number}
          </button>
        ))}
        <button onClick={() => incrementPage()} className="relative inline-flex items-center rounded-r-md border px-2 py-2 border-gray">
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div> : null
  )
}
export default Pagination
