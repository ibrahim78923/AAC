import {
  Box,
  Typography,
  Grid,
  Button,
  ButtonGroup,
  Divider,
  Skeleton,
} from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import useDetails from './useDetails';

import { detailsDataArray } from './Details.data';

import { styles } from '../ViewDetails.style';

import { v4 as uuidv4 } from 'uuid';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS } from '@/constants/permission-keys';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { LoadingButton } from '@mui/lab';

const Details = ({ data, isLoading }: any) => {
  const {
    theme,
    methodsDetails,
    onSubmit,
    handleSubmit,
    lifeCycleStagesData,
    UserListData,
    form,
    getDynamicFieldsStatus,
    updateIsLoading,
  } = useDetails(data);
  return (
    <PermissionsGuard
      permissions={[
        SOCIAL_COMPONENTS_COMPANIES_VIEW_DETAILS_PERMISSIONS?.VIEW_DETAILS,
      ]}
    >
      <Box sx={styles?.horizontalTabsBox}>
        <Typography variant="h4">Details</Typography>
        {data ||
        !isLoading ||
        getDynamicFieldsStatus?.isLoading ||
        getDynamicFieldsStatus?.isFetching ? (
          <Box sx={styles?.horizontalTabsInnnerBox}>
            <FormProvider
              methods={methodsDetails}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={4}>
                {detailsDataArray({ lifeCycleStagesData, UserListData })?.map(
                  (item: any) => (
                    <Grid
                      item
                      xs={12}
                      md={item?.md}
                      key={uuidv4()}
                      sx={{ paddingTop: '20px !important' }}
                    >
                      <item.component {...item?.componentProps} size={'small'}>
                        {item?.componentProps?.select
                          ? item?.options?.map((option: any) => (
                              <option key={option?.value} value={option?.value}>
                                {option?.label}
                              </option>
                            ))
                          : null}
                      </item.component>
                    </Grid>
                  ),
                )}
                {form?.map((item: any) => (
                  <Grid
                    item
                    xs={4}
                    key={item?.id}
                    sx={{ paddingTop: '10px !important' }}
                  >
                    {componentMap[item?.component] &&
                      createElement(componentMap[item?.component], {
                        ...item?.componentProps,
                        name: item?.componentProps?.label,
                        size: 'small',
                      })}
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Divider sx={{ borderColor: theme?.palette?.grey[700] }} />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'end',
                      gap: 1.5,
                    }}
                  >
                    <ButtonGroup>
                      <Button sx={{ height: '35px' }}>Cancel</Button>
                    </ButtonGroup>
                    <ButtonGroup variant="contained" color="primary">
                      <LoadingButton
                        sx={{ height: '35px' }}
                        type="submit"
                        loading={updateIsLoading}
                      >
                        Update
                      </LoadingButton>
                    </ButtonGroup>
                  </Box>
                </Grid>
              </Grid>
            </FormProvider>
          </Box>
        ) : (
          <Skeleton
            variant="rectangular"
            width={'100%'}
            height={500}
            sx={{ marginTop: '20px' }}
          />
        )}
      </Box>
    </PermissionsGuard>
  );
};

export default Details;
