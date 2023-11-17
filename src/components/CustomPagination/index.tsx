import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {
  Box,
  IconButton,
  Pagination,
  TablePagination,
  useTheme,
} from '@mui/material';

import { styles } from './CustomPagination.style';
import { PAGINATION } from '@/config';

const CustomPagination = (props: any) => {
  const {
    count = PAGINATION?.PAGE_COUNT,
    rowsPerPageOptions = PAGINATION?.ROWS_PER_PAGE,
    pageLimit = PAGINATION?.PAGE_LIMIT,
    currentPage = PAGINATION?.CURRENT_PAGE,
    onPageChange,
    setPage,
    setPageLimit,
    totalRecords = PAGINATION?.TOTAL_RECORDS,
  } = props;

  const theme = useTheme();

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
            count={totalRecords}
            page={currentPage - 1}
            onPageChange={(_: any, page) => onPageChange?.(page)}
            rowsPerPage={pageLimit}
            onRowsPerPageChange={(event: any) => {
              setPageLimit?.(parseInt(event?.target?.value, 10));
              setPage?.(0);
            }}
            rowsPerPageOptions={rowsPerPageOptions}
            sx={styles?.tablePaginationStyle(theme)}
          />
        </Box>
        <Box display={'flex'}>
          <IconButton
            disabled={currentPage === 1}
            onClick={() => setPage?.((page: any) => page - 1)}
            sx={styles?.iconStyleTwo(theme)}
          >
            <ArrowCircleLeftIcon />
          </IconButton>
          <Pagination
            count={count}
            page={currentPage}
            boundaryCount={1}
            siblingCount={0}
            onChange={(_: any, page) => {
              onPageChange?.(page);
            }}
            hidePrevButton
            hideNextButton
            sx={styles?.paddingStyle(theme)}
          />
          <IconButton
            disabled={currentPage === count}
            onClick={() => setPage?.((page: any) => page + 1)}
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
