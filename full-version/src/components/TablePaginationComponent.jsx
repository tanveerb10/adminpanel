// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

const TablePaginationComponent = ({ table }) => {
  // Ensure table and its properties are defined before accessing them
  const filteredRowCount = table?.getFilteredRowModel()?.rows.length ?? 0;
  const pageIndex = table?.getState()?.pagination.pageIndex ?? 0;
  const pageSize = table?.getState()?.pagination.pageSize ?? 10; // Default page size example
  
  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled'>
        {`Showing ${
          filteredRowCount === 0
            ? 0
            : pageIndex * pageSize + 1
        }
        to ${Math.min((pageIndex + 1) * pageSize, filteredRowCount)} of ${filteredRowCount} entries`}
      </Typography>
      <Pagination
        shape='rounded'
        color='primary'
        variant='tonal'
        count={Math.ceil(filteredRowCount / pageSize)}
        page={pageIndex + 1}
        onChange={(_, page) => {
          table?.setPageIndex(page - 1);
        }}
        showFirstButton
        showLastButton
      />
    </div>
  )
}

export default TablePaginationComponent
