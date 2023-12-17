import { Box, Typography, Grid, Divider, Button, Stack } from '@mui/material';

import PermissionsAccordion from './PermissionsAccordion';

import { FormProvider } from '@/components/ReactHookForm';

import { v4 as uuidv4 } from 'uuid';

import { ORG_ADMIN } from '@/constants';

import { addUsersArrayData } from '../RoleAndRights.data';

import useAddRole from './useAddRole';

import { ArrowBack } from '@mui/icons-material';

const AddRole = () => {
  const {
    navigate,
    onSubmit,
    methods,
    theme,
    handleSubmit,
    productVal,
    productPermissionsData,
  } = useAddRole();

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <ArrowBack
          onClick={() => {
            navigate.push(ORG_ADMIN?.ROLES_AND_RIGHTS);
          }}
          sx={{ cursor: 'pointer' }}
        />
        <Typography variant="h4">Add New Role</Typography>
      </Box>
      <Box sx={{ my: 3 }}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {addUsersArrayData()?.map((item: any) => (
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
          <Grid container>
            <Grid item xs={12} lg={10} mt={3}>
              <Stack direction="row">
                <Typography variant="h4">Permissions</Typography>
                <Typography style={{ color: theme?.palette?.error?.main }}>
                  *
                </Typography>
              </Stack>
            </Grid>
            {productVal && (
              <Grid item xs={12} lg={10} mt={2}>
                <PermissionsAccordion
                  permissionsData={productPermissionsData}
                />
              </Grid>
            )}
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{ display: 'flex', gap: '10px', justifyContent: 'end', my: 2 }}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => {
                navigate.push(ORG_ADMIN.ROLES_AND_RIGHTS);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Add
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </>
  );
};

export default AddRole;
