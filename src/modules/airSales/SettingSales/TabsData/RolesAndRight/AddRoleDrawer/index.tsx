import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import useAddRoleDrawer from './useAddRoleDrawer';
import { dataArray } from './AddRoleDrawer.data';
import PermissionsAccordion from '../PermissionsAccordion';
import { FormProvider } from '@/components/ReactHookForm';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const AddRoleDrawer = (props: any) => {
  const { isDrawerOpen, onClose } = props;
  const {
    postRoleLoading,
    drawerConstants,
    viewPerdetails,
    allPermissions,
    handleSubmit,
    isLoading,
    onSubmit,
    disabled,
    methods,
    theme,
  } = useAddRoleDrawer(isDrawerOpen, onClose);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen?.isToggle}
      onClose={onClose}
      title={
        isDrawerOpen?.type === drawerConstants?.ADD
          ? 'Add New Role'
          : 'User Role'
      }
      okText={isDrawerOpen?.type === drawerConstants?.ADD ? 'Add' : 'Edit'}
      footer={
        isDrawerOpen?.type === drawerConstants?.ADD ||
        isDrawerOpen?.type === drawerConstants?.EDIT
          ? true
          : false
      }
      isOk={true}
      submitHandler={handleSubmit(onSubmit)}
      isLoading={postRoleLoading}
    >
      {isLoading ? (
        <SkeletonTable />
      ) : (
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              {dataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component
                    disabled={
                      isDrawerOpen?.type === drawerConstants?.VIEW
                        ? true
                        : false
                    }
                    {...item.componentProps}
                    size={'small'}
                  >
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: `${theme?.palette?.grey[600]}`,
                my: 1,
              }}
            >
              Permissions
              <span style={{ color: `${theme?.palette?.error?.main}` }}>*</span>
            </Typography>
            {allPermissions?.data?.permissions?.length === 0 ? (
              <Typography variant="body2" color={theme?.palette?.grey[0]}>
                Please assign a plan to this product before proceeding.
              </Typography>
            ) : (
              <PermissionsAccordion
                permissionsData={
                  isDrawerOpen?.type === drawerConstants?.VIEW
                    ? allPermissions?.data?.permissions
                    : viewPerdetails?.data
                }
                disabled={disabled}
              />
            )}
          </FormProvider>
        </Box>
      )}
    </CommonDrawer>
  );
};

export default AddRoleDrawer;
