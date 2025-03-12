import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import { Box, FormGroup, FormControlLabel } from '@mui/material';
import { chipColor } from './ExistingIncident.data';
import { useExistingIncident } from './useExistingIncident';
import NoData from '@/components/NoData';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import CustomPagination from '@/components/CustomPagination';
import { truncateText } from '@/utils/avatarUtils';
import { CustomChip } from '@/components/Chip/CustomChip';
import { CheckboxField } from '@/components/InputFields/CheckboxField';

export const ExistingIncident: React.FC<{
  openDrawer: boolean;
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const { openDrawer } = props;
  const {
    handleSubmit,
    handleSearch,
    theme,
    checkboxValues,
    handleCheckboxChange,
    existingTicketsData,
    lazyGetTicketsStatus,
    setPageLimit,
    setPage,
    metaData,
    isLoading,
    onClose,
  } = useExistingIncident(props);

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={() => onClose?.()}
      title={'Associate Existing Incident'}
      okText={'Associate'}
      isOk
      cancelText={'Cancel'}
      isLoading={isLoading}
      disabledCancelBtn={isLoading}
      footer
      submitHandler={handleSubmit}
    >
      <Box my={1}>
        <Search label={'Search Here'} setSearchBy={handleSearch} fullWidth />
      </Box>
      {!lazyGetTicketsStatus?.isFetching ? (
        existingTicketsData?.length ? (
          existingTicketsData?.map((item: any) => (
            <Box
              border={`1px solid `}
              borderColor="grey.400"
              borderRadius={2}
              p={1}
              mt={2}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              key={item?._id}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <CheckboxField
                      checked={checkboxValues?.[item?._id] || false}
                      onChange={handleCheckboxChange}
                      id={item?._id}
                    />
                  }
                  label={`${'  '} ${item?.ticketIdNumber}-${truncateText(
                    item?.subject,
                  )}`}
                />
              </FormGroup>
              <CustomChip
                label={item?.status ?? '---'}
                size="medium"
                backgroundColor={
                  theme?.['palette']?.[`${chipColor(item?.status)}`]?.[
                    'lighter'
                  ] + 30
                }
                textColor={
                  theme?.['palette']?.[`${chipColor(item?.status)}`]?.['main']
                }
              />
            </Box>
          ))
        ) : (
          <NoData message={'No data is available'} height="40vh" />
        )
      ) : (
        <SkeletonTable />
      )}
      {metaData && (
        <Box>
          <CustomPagination
            currentPage={metaData?.page}
            count={metaData?.pages}
            pageLimit={metaData?.limit}
            totalRecords={metaData?.total}
            onPageChange={(page: number) => setPage(page)}
            setPage={setPage}
            setPageLimit={setPageLimit}
          />
        </Box>
      )}
    </CommonDrawer>
  );
};
