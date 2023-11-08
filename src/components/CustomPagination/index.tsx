import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Grid, IconButton, Pagination, TablePagination } from '@mui/material';
import { CustomPaginationPropsI } from './CustomPagination.interface';
import { useCustomPagination } from './useCustomPagination';
import { styles } from './CustomPagination.style';

const CustomPagination: React.FC<CustomPaginationPropsI> = ({
  count,
  rowsPerPageOptions,
  entriePages,
}) => {
  const { rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } =
    useCustomPagination();

  const handlePageChange = (_: any, value: number) => {
    handleChangePage(value);
  };

  return (
    <>
      <Grid
        container
        justifyContent={'space-between'}
        alignItems={'center'}
        px={2.4}
      >
        <Grid
          item
          lg={2.5}
          sm={4}
          xs={12}
          sx={{ display: 'flex', mb: { sm: '0', xs: '10px' } }}
        >
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
            sx={styles?.tablePaginationStyle}
          />
        </Grid>
        <Grid
          item
          lg={3.5}
          sm={5}
          xs={12}
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
          // pr={2.4}
        >
          <IconButton
            disabled={page === 1}
            onClick={() => handleChangePage(page - 1)}
            sx={styles?.iconStyleTwo}
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
            sx={styles?.paddingStyle}
          />
          <IconButton
            disabled={page === count}
            onClick={() => handleChangePage(page + 1)}
            sx={styles?.iconStyle}
          >
            <ArrowCircleRightIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default CustomPagination;
