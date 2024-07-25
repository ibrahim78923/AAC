import React, { useEffect } from 'react';

import {
  Grid,
  Box,
  Button,
  useTheme,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';

import {
  FormProvider,
  RHFAutocompleteAsync,
  RHFCheckbox,
  RHFRadioGroup,
  RHFSwitch,
} from '@/components/ReactHookForm';

import {
  createDashboardDefaultValue,
  dashboardReportsData,
  validationSchema,
} from './CreateForm.data';

import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import DetailsView from '../DetailsView';
import { PrimaryPreviewEyeIcon } from '@/assets/icons';
import DialogCards from '../../Preview/DialogCards';
import useCreateForm from './useCreateForm';
import {
  useLazyGetSalesDashboardUserAccessListDropdownListForDashboardQuery,
  usePostSalesDashboardMutation,
} from '@/services/airSales/dashboard';
import { LoadingButton } from '@mui/lab';
import RHFTextField from '../../../../../components/ReactHookForm/RHFTextField';
import useAuth from '@/hooks/useAuth';
import { pxToRem } from '@/utils/getFontValue';
import { MANAGE_DASHBOARD_ACCESS_TYPES } from '@/modules/airServices/Dashboard/CreateDashboard/CreateDashboard.data';
import { enqueueSnackbar } from 'notistack';

export const specificUsersAccessColumns = [
  { _id: 'name', label: 'Name' },
  { _id: 'viewAndEdit', label: 'View and Edit' },
  { _id: 'viewOnly', label: 'View Only' },
];

export const specificUsersAccessFormFieldsDynamic = (
  name: string,
  index: number,
) => [
  {
    id: 1,
    data: <RHFTextField name={`${name}.${index}.name`} size="small" disabled />,
  },
  {
    id: 2,
    align: 'center',
    data: (
      <RHFRadioGroup
        name={`${name}.${index}.permission`}
        size="small"
        fullWidth
        options={[
          {
            value: MANAGE_DASHBOARD_ACCESS_TYPES?.EDIT_AND_VIEW,
          },
        ]}
      />
    ),
  },
  {
    id: 3,
    align: 'center',
    data: (
      <RHFRadioGroup
        name={`${name}.${index}.permission`}
        size="small"
        fullWidth
        options={[
          {
            value: MANAGE_DASHBOARD_ACCESS_TYPES?.ONLY_VIEW,
          },
        ]}
      />
    ),
  },
];

const CreateForm = ({}: any) => {
  const { isOpenPreview, setIsOpenPreview, selectedDashoardWidget } =
    useCreateForm();

  const theme = useTheme();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: createDashboardDefaultValue?.(),
  });
  const { handleSubmit, reset, control, setValue } = methods;

  const [postSalesDashboard, { isLoading: postSalesDashboardLoading }] =
    usePostSalesDashboardMutation();

  const auth: any = useAuth();
  const { _id: productId } = auth?.product;

  const specificUserWatch: any = useWatch({
    control,
    name: 'specialUsers',
    defaultValue: [],
  });

  useEffect(() => {
    if (!!specificUserWatch?.length)
      setValue(
        'permissionsUsers',
        specificUserWatch?.map((item: any) => ({
          name: `${item?.firstName} ${item?.lastName}`,
          userId: item?._id,
          permission: item?.permission,
        })),
      );
  }, [specificUserWatch]);

  const onSubmit = async (values: any) => {
    const payload: any = {
      name: values?.dashboardName,
      reportType: [],
      sharedWith: values?.access,
    };

    try {
      await postSalesDashboard({
        body: payload,
      }).unwrap();
      enqueueSnackbar('Dashboard Created Successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
    reset();
  };

  const { fields } = useFieldArray<any>({
    control,
    name: 'permissionsUsers',
  });

  const apiQueryUsers =
    useLazyGetSalesDashboardUserAccessListDropdownListForDashboardQuery?.();

  return (
    <>
      <Box>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid sm={12} lg={6}>
              <Grid item xs={12} style={{ paddingTop: '10px' }}>
                <RHFTextField
                  size="small"
                  placeholder="Enter name"
                  name="dashboardName"
                  label="Dashboard Name"
                />
              </Grid>
              <Grid item xs={12} style={{ paddingTop: '10px' }}>
                <Box display="flex" justifyContent="space-between">
                  <Grid item xs={12} md={9}>
                    <RHFRadioGroup
                      name="access"
                      row={false}
                      options={[
                        {
                          value:
                            MANAGE_DASHBOARD_ACCESS_TYPES?.PRIVATE_TO_OWNER,
                          label: 'Private to owner',
                        },
                        {
                          value: MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE,
                          label: 'Everyone',
                          filter: (
                            <Box px={3}>
                              <RHFRadioGroup
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
                    />
                  </Grid>

                  <Box display={{ xl: 'block', xs: 'none' }}>
                    <RHFSwitch name="default" label="Set as default" />
                  </Box>
                </Box>
              </Grid>

              <Typography variant="h6" sx={{ fontWeight: '600', mt: 2, mb: 1 }}>
                Use the checkboxes to remove/add any report you want
              </Typography>

              {dashboardReportsData?.map((item: any) => (
                <Grid item xs={12} key={uuidv4()}>
                  <RHFCheckbox name={item?.value} label={item?.label} />
                </Grid>
              ))}

              <Grid sm={12} sx={{ textAlign: 'end' }} mt={6} mr={3}>
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
            <Grid sm={12} lg={6}>
              <DetailsView selectedDashoardWidget={selectedDashoardWidget} />
            </Grid>

            <Grid item sm={12} style={{ textAlign: 'end' }}>
              <Button
                className="small"
                sx={{
                  border: `1px solid ${theme?.palette?.custom?.dark}`,
                  color: theme?.palette?.custom?.main,
                  width: '112px',
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                variant="contained"
                className="small"
                type="submit"
                sx={{ marginLeft: '10px' }}
                loading={postSalesDashboardLoading}
              >
                Save
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
      {isOpenPreview && (
        <DialogCards
          open={isOpenPreview}
          setOpen={setIsOpenPreview}
          selectedDashoardWidget={selectedDashoardWidget}
        />
      )}
    </>
  );
};
export default CreateForm;
