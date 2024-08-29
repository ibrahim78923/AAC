import { Grid, Box, CircularProgress } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { dataArray } from './EditCampaign.data';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import useEditCampaigns from './useEditCampaign';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { DRAWER_TYPES } from '@/constants/strings';

export default function EditCampaign({
  isOpenDrawer,
  onClose,
  selectedRows,
  setSelectedRows,
}: any) {
  const {
    handleSubmit,
    onSubmit,
    methods,
    updateCampaignLoading,
    campaignByIdLoading,
    createCampaignsLoading,
    userListData,
    organizationId,
    getDynamicFieldsStatus,
    form,
  } = useEditCampaigns(selectedRows, onClose, isOpenDrawer, setSelectedRows);
  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer?.isToggle}
      onClose={() => onClose(false)}
      title={
        isOpenDrawer?.type !== DRAWER_TYPES?.CREATE
          ? 'Edit Campaign'
          : 'Create Campaign'
      }
      okText={isOpenDrawer?.type !== DRAWER_TYPES?.CREATE ? 'Update' : 'Create'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
      isLoading={updateCampaignLoading || createCampaignsLoading}
    >
      {campaignByIdLoading ? (
        <SkeletonTable />
      ) : (
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              {dataArray(userListData, organizationId)?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
              {getDynamicFieldsStatus?.isLoading ||
              getDynamicFieldsStatus?.isFetching ? (
                <Grid item xs={12} textAlign={'center'}>
                  <CircularProgress />
                </Grid>
              ) : (
                form?.map((item: any) => (
                  <Grid item xs={12} key={item?.id}>
                    {componentMap[item?.component] &&
                      createElement(componentMap[item?.component], {
                        ...item?.componentProps,
                        name: item?.componentProps?.label,
                        size: 'small',
                      })}
                  </Grid>
                ))
              )}
            </Grid>
          </FormProvider>
        </Box>
      )}
    </CommonDrawer>
  );
}
