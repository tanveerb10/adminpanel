// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

const TablePaginationComponent = ({ total, currentPage, limit, handlePageChange }) => {
  // Ensure table and its properties are defined before accessing them
  const filteredRowCount = total
  const pageIndex = currentPage - 1
  const pageSize = limit

  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled'>
        {`Showing ${filteredRowCount === 0 ? 0 : pageIndex * pageSize + 1}
        to ${Math.min((pageIndex + 1) * pageSize, filteredRowCount)} of ${filteredRowCount} entries`}
      </Typography>
      <Pagination
        shape='rounded'
        color='primary'
        variant='tonal'
        count={Math.ceil(filteredRowCount / pageSize)}
        page={currentPage}
        onChange={(_, page) => {
          handlePageChange(page)
        }}
        showFirstButton
        showLastButton
      />
    </div>
  )
}

export default TablePaginationComponent
