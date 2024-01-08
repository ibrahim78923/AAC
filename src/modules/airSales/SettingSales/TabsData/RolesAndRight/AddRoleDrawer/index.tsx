import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import useAddRoleDrawer from './useAddRoleDrawer';
import { dataArray } from './AddRoleDrawer.data';
import PermissionsAccordion from '../PermissionsAccordion';
import { FormProvider } from '@/components/ReactHookForm';

const AddRoleDrawer = (props: any) => {
  const { isDrawerOpen, onClose } = props;
  const { methods, theme, onSubmit, handleSubmit, viewPerdetails } =
    useAddRoleDrawer(isDrawerOpen, onClose);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen?.isToggle}
      onClose={onClose}
      title={isDrawerOpen?.type === 'add' ? 'Add New Role' : 'User Role'}
      okText={isDrawerOpen?.type === 'add' ? 'Add' : 'Edit'}
      footer={
        isDrawerOpen?.type === 'add' || isDrawerOpen?.type === 'edit'
          ? true
          : false
      }
      isOk={true}
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box sx={{ paddingTop: '1rem' }}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {dataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
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
          <PermissionsAccordion permissionsData={viewPerdetails} />
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default AddRoleDrawer;
