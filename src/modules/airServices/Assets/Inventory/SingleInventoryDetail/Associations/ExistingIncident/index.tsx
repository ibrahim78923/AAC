import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
} from '@mui/material';
import { chipColor } from './ExistingIncident.data';
import { v4 as uuidv4 } from 'uuid';
import { useExistingIncident } from './useExistingIncident';
import { NoAssociationFoundImage } from '@/assets/images';
import NoData from '@/components/NoData';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import CustomPagination from '@/components/CustomPagination';

export const ExistingIncident = ({ openDrawer, onClose }: any) => {
  const {
    handleSubmit,
    searchBy,
    setSearchBy,
    theme,
    checkboxValues,
    handleCheckboxChange,
    existingTicketsData,
    lazyGetTicketsStatus,
    pageLimit,
    setPageLimit,
    page,
    setPage,
    metaData,
  } = useExistingIncident({ onClose });

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={() => onClose(false)}
      title={'Associate Existing Incident'}
      okText={'Associate'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit}
    >
      <Box my={1}>
        <Search
          label={'Search'}
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
          fullWidth
        />
      </Box>
      {!lazyGetTicketsStatus?.isFetching ? (
        existingTicketsData?.length ? (
          existingTicketsData?.map((item: any) => (
            <Box
              border={`1px solid ${theme?.palette?.grey?.[400]}`}
              borderRadius={2}
              p={1}
              mt={2}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              key={uuidv4()}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkboxValues?.[item?._id] || false}
                      onChange={handleCheckboxChange}
                      id={item?._id}
                    />
                  }
                  label={`${item?.ticketIdNumber}-${item?.subject}`}
                />
              </FormGroup>
              <Chip
                label={item?.status}
                sx={{
                  bgcolor:
                    theme?.['palette']?.[`${chipColor(item?.status)}`]?.[
                      'lighter'
                    ],
                  color:
                    item?.status === 'InProgress'
                      ? 'common.white'
                      : 'success.darker',
                }}
              />
            </Box>
          ))
        ) : (
          <NoData
            image={NoAssociationFoundImage}
            message={'No data is available'}
            height="40vh"
          />
        )
      ) : (
        <SkeletonTable />
      )}
      {metaData && (
        <Box>
          <CustomPagination
            currentPage={page}
            count={metaData?.pages}
            pageLimit={pageLimit}
            totalRecords={metaData?.total}
            onPageChange={(page: any) => setPage(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </Box>
      )}
    </CommonDrawer>
  );
};
