import { Pagination } from 'react-admin';

const CustomPagination = () => (
  <Pagination
    rowsPerPageOptions={[10, 25, 50, 100]}
    sx={{
      '.MuiTablePagination-toolbar': {
        display: 'flex',
        flexDirection: 'row',      // 👈 force horizontal
        alignItems: 'center',
        flexWrap: 'nowrap',        // 👈 prevent wrapping
      },
      '.MuiTablePagination-selectLabel': {
        margin: 0,
        display: 'block',
      },
      '.MuiTablePagination-select': {
        marginRight: '8px',
      },
      '.MuiTablePagination-displayedRows': {
        margin: 0,
      },
    }}
  />
);

export default CustomPagination;