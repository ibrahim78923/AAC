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
  RHFMultiCheckbox,
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
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { is } from 'immutable';

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

const CreateForm = ({ }: any) => {
  const { isOpenPreview, setIsOpenPreview, router } = useCreateForm();

  const theme = useTheme();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: createDashboardDefaultValue?.(),
  });
  const { handleSubmit, reset, control, setValue, watch }: any = methods;

  const selectedReports = watch('reportType');

  const dashboardPermissions = (radioVal: any) => {
    switch (radioVal) {
      case MANAGE_DASHBOARD_ACCESS_TYPES?.PRIVATE_TO_OWNER:
        return 'VIEW_AND_EDIT';
      case MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE_ONLY_VIEW:
        return 'VIEW_ONLY';
      case MANAGE_DASHBOARD_ACCESS_TYPES?.EVERYONE_EDIT_AND_VIEW:
        return 'VIEW_AND_EDIT';
      case MANAGE_DASHBOARD_ACCESS_TYPES?.SPECIFIC_USER_AND_TEAMS:
      default:
        return 'VIEW_AND_EDIT';
    }
  }

  const [postSalesDashboard, { isLoading: postSalesDashboardLoading }] = usePostSalesDashboardMutation();

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
      reports: values?.reportType?.map((item: any) => ({
        visibility: true,
        type: "static",
        name: item
      })),
      access: values?.access,
      permissions: dashboardPermissions(values?.access),
      specialUsers: values?.permissionsUsers.map((user: any) => {
        return {
          userId: user?.userId,
          permission: user?.permission,
        }
      }),
      isDefault: values?.isDefault,
    }

    try {
      await postSalesDashboard({
        body: payload,
      }).unwrap();
      reset();
      router.back();
      enqueueSnackbar('Dashboard Created Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', { variant: NOTISTACK_VARIANTS?.ERROR });
    }
  };

  const { fields } = useFieldArray<any>({
    control,
    name: 'permissionsUsers',
  });

  const apiQueryUsers = useLazyGetSalesDashboardUserAccessListDropdownListForDashboardQuery?.();




  return (
    <>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Grid item xs={12}>
              <RHFTextField
                size="small"
                placeholder="Enter name"
                name="dashboardName"
                label="Dashboard Name"
                required={true}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12} md={9}>
                  <Typography variant='body1' fontWeight={600} >
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
                <Grid item xs={12} md={3} textAlign={'end'}>
                  <RHFSwitch name="isDefault" label="Set as default" />
                </Grid>
              </Grid>
            </Grid>

            <Typography variant="h6" fontWeight={600} sx={{ my: 1.5 }}>
              Use the checkboxes to remove/add any report you want
            </Typography>

            <Grid item xs={12} key={uuidv4()}>
              <RHFMultiCheckbox
                name='reportType'
                options={
                  dashboardReportsData?.map((item: any) => ({
                    value: item?.value,
                    label: item?.label,
                  }))
                }
                isCheckBox={true}
                GridView={12}
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
            <DetailsView
              selectedReports={selectedReports}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: 'end' }}>
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
