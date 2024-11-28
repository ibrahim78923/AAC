import React from 'react';
import {
  Grid,
  Box,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Stack,
} from '@mui/material';
import {
  FormProvider,
  RHFAutocompleteAsync,
  RHFMultiCheckbox,
  RHFRadioGroup,
  RHFSwitch,
} from '@/components/ReactHookForm';
import {
  dashboardReportsData,
  specificUsersAccessFormFieldsDynamic,
} from './CreateForm.data';
import DetailsView from '../DetailsView';
import { PrimaryPreviewEyeIcon } from '@/assets/icons';
import DialogCards from '../../Preview/DialogCards';
import useCreateForm from './useCreateForm';
import { LoadingButton } from '@mui/lab';
import RHFTextField from '../../../../../components/ReactHookForm/RHFTextField';
import { pxToRem } from '@/utils/getFontValue';
import { DRAWER_TYPES } from '@/constants/strings';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const specificUsersAccessColumns = [
  { _id: 'name', label: 'Name' },
  { _id: 'viewAndEdit', label: 'View and Edit' },
  { _id: 'viewOnly', label: 'View Only' },
];

const CreateForm = ({ formType }: any) => {
  const {
    MANAGE_DASHBOARD_ACCESS_TYPES,
    postSalesDashboardLoading,
    dashboardDetailsLoading,
    loadingUpdateDashboard,
    specificUserWatch,
    setIsOpenPreview,
    selectedReports,
    isOpenPreview,
    apiQueryUsers,
    disableAccess,
    handleSubmit,
    disbaleForm,
    productId,
    onSubmit,
    methods,
    router,
    fields,
  } = useCreateForm(formType);

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {dashboardDetailsLoading ? (
          <SkeletonTable />
        ) : (
          <Grid container spacing={2}>
            <Grid item container xs={12} lg={6}>
              <Grid item xs={12}>
                <RHFTextField
                  label="Dashboard Name"
                  placeholder="Enter name"
                  name="dashboardName"
                  size="small"
                  required={true}
                  disabled={disbaleForm}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12} md={9}>
                    <Typography variant="body1" fontWeight={600}>
                      Who can access this dashboard?
                    </Typography>
                    <RHFRadioGroup
                      name="access"
                      row={false}
                      options={[
                        {
                          value:
                            MANAGE_DASHBOARD_ACCESS_TYPES?.PRIVATE_TO_OWNER,
                          label: 'Private to owner (me)',
                        },
                        {
                          value: MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE,
                          label: 'Everyone',
                          filter: (
                            <Box px={3}>
                              <RHFRadioGroup
                                disabled={
                                  disableAccess ||
                                  formType === DRAWER_TYPES?.VIEW
                                    ? true
                                    : false
                                }
                                name="permissions"
                                row={false}
                                options={[
                                  {
                                    value:
                                      MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE_EDIT_AND_VIEW,
                                    label: 'Everyone can edit and view',
                                  },
                                  {
                                    value:
                                      MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE_ONLY_VIEW,
                                    label: 'Everyone can view',
                                  },
                                ]}
                              />
                            </Box>
                          ),
                        },
                        {
                          value:
                            MANAGE_DASHBOARD_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS,
                          label: 'Only Specific users',
                          filter: (
                            <>
                              <RHFAutocompleteAsync
                                disabled={
                                  formType === DRAWER_TYPES?.VIEW ? true : false
                                }
                                label=""
                                name="specialUsers"
                                fullWidth
                                required
                                apiQuery={apiQueryUsers}
                                multiple
                                size="small"
                                placeholder="Select user and team"
                                externalParams={{
                                  productId,
                                }}
                                getOptionLabel={(option: any) =>
                                  `${option?.firstName} ${option?.lastName}`
                                }
                              />
                              {specificUserWatch?.length > 0 && (
                                <TableContainer
                                  sx={{
                                    maxHeight: pxToRem(400),
                                    border: '1px solid',
                                    borderColor: 'custom.off_white_three',
                                    borderRadius: 2,
                                  }}
                                >
                                  <Table
                                    stickyHeader
                                    sx={{ minWidth: pxToRem(400) }}
                                  >
                                    <TableHead>
                                      <TableRow>
                                        {specificUsersAccessColumns?.map(
                                          (column: any) => (
                                            <TableCell key={column?._id}>
                                              {column?.label}
                                            </TableCell>
                                          ),
                                        )}
                                      </TableRow>
                                    </TableHead>

                                    <TableBody>
                                      {fields?.map(
                                        (item: any, index: number) => {
                                          return (
                                            <TableRow key={item?.id}>
                                              {specificUsersAccessFormFieldsDynamic?.(
                                                'permissionsUsers',
                                                index,
                                              )?.map((singleField: any) => (
                                                <TableCell
                                                  key={singleField?.id}
                                                  align={singleField?.align}
                                                >
                                                  {singleField?.data}
                                                </TableCell>
                                              ))}
                                            </TableRow>
                                          );
                                        },
                                      )}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              )}
                            </>
                          ),
                        },
                      ]}
                      disabled={
                        disableAccess || formType === DRAWER_TYPES?.VIEW
                          ? true
                          : false
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={3} textAlign={'end'}>
                    <RHFSwitch
                      disabled={disbaleForm}
                      name="isDefault"
                      label="Set as default"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight={600} sx={{ my: 1.5 }}>
                  Use the checkboxes to remove/add any report you want
                </Typography>
                <RHFMultiCheckbox
                  name="reportType"
                  options={dashboardReportsData?.map((item: any) => ({
                    value: item?.value,
                    label: item?.label,
                  }))}
                  // isCheckBox={true}
                  GridView={12}
                  disabled={disbaleForm}
                />
              </Grid>
              <Grid item sm={12} sx={{ textAlign: 'end' }} mt={6} mr={3}>
                <Button
                  variant="outlined"
                  onClick={() => setIsOpenPreview(true)}
                  startIcon={<PrimaryPreviewEyeIcon />}
                  sx={{ border: '1px solid White' }}
                >
                  Preview Dashboard
                </Button>
              </Grid>
            </Grid>

            <Grid item xs={12} lg={6}>
              <DetailsView selectedReports={selectedReports} />
            </Grid>

            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  className="small"
                  variant="outlined"
                  onClick={() => router?.back()}
                  color="inherit"
                >
                  Back
                </Button>
                <Stack direction="row" justifyContent="end" gap={1}>
                  <Button
                    className="small"
                    variant="outlined"
                    onClick={() => router?.back()}
                    color="inherit"
                  >
                    Cancel
                  </Button>
                  {formType !== DRAWER_TYPES?.VIEW && (
                    <LoadingButton
                      variant="contained"
                      className="small"
                      type="submit"
                      loading={
                        postSalesDashboardLoading || loadingUpdateDashboard
                      }
                    >
                      {formType === DRAWER_TYPES?.EDIT ? 'Update' : 'Save'}
                    </LoadingButton>
                  )}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        )}
      </FormProvider>

      {isOpenPreview && (
        <DialogCards
          open={isOpenPreview}
          setOpen={setIsOpenPreview}
          selectedReports={selectedReports}
        />
      )}
    </>
  );
};
export default CreateForm;
