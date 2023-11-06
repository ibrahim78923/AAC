import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Box, IconButton, Pagination, TablePagination } from '@mui/material';
import { CustomPaginationPropsI } from './CustomPagination.interface';
import { useCustomPagination } from './useCustomPagination';
import { styles } from './CustomPagination.style';

const CustomPagination: React.FC<CustomPaginationPropsI> = ({
  count,
  rowsPerPageOptions,
  entriePages,
}) => {
  const {
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    theme,
  } = useCustomPagination();

  const handlePageChange = (_: any, value: number) => {
    handleChangePage(value);
  };

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={2}
      >
        <Box>
          <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) =>
              handleChangeRowsPerPage(parseInt(e.target.value, 10))
            }
            labelRowsPerPage="Show"
            labelDisplayedRows={() => `of ${entriePages} entries`}
            rowsPerPageOptions={rowsPerPageOptions}
            sx={styles?.tablePaginationStyle(theme)}
          />
        </Box>
        <Box display={'flex'}>
          <IconButton
            disabled={page === 1}
            onClick={() => handleChangePage(page - 1)}
            sx={styles?.iconStyleTwo(theme)}
          >
            <ArrowCircleLeftIcon />
          </IconButton>
          <Pagination
            count={count}
            page={page}
            boundaryCount={1}
            siblingCount={0}
            onChange={handlePageChange}
            hidePrevButton
            hideNextButton
            sx={styles?.paddingStyle(theme)}
          />
          <IconButton
            disabled={page === count}
            onClick={() => handleChangePage(page + 1)}
            sx={styles?.iconStyle(theme)}
          >
            <ArrowCircleRightIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default CustomPagination;
