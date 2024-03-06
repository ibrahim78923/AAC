import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { dataArray } from '../Users.data';
import useUserManagement from '../../useUserManagement';

const AddUsers = (props: any) => {
  const { isAddUserOpen, setIsAddUserOpen } = props;
  const theme = useTheme();
  const { methods } = useUserManagement();
  return (
    <CommonDrawer
      isDrawerOpen={isAddUserOpen}
      onClose={() => setIsAddUserOpen(false)}
      title={'Add User'}
      okText={'Add'}
      footer={true}
      isOk={true}
    >
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: '12px',
          color: `${theme.palette.custom.main}`,
        }}
      >
        Add a new user to this organization
      </Typography>
      <Box sx={{ paddingTop: '1rem' }}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
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
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default AddUsers;
