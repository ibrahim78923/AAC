import React, { useState } from 'react';

import {
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  Theme,
  useTheme,
  Grid,
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import UserTable from './UserTable';
import TeamsTable from './TeamsTable';

import {
  dataArray,
  defaultValues,
  validationSchema,
} from './UserManagement.data';

import { UserManagementProps } from './UserManagement.interface';

import { teamsDataArray } from './TeamsTable/TeamsTable.data';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';

function CustomTabPanel(props: UserManagementProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const UserManagement = ({ initialValueProps = defaultValues }: any) => {
  const [value, setValue] = React.useState(0);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const theme = useTheme<Theme>();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCloseDrawer = () => {
    setIsAddUserOpen(false);
    setIsCreateTeamOpen(false);
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isAddUserOpen}
        onClose={handleCloseDrawer}
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

      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          borderRadius: '8px',
          boxShadow: '0px 1px 2px 0px #1018280F, 0px 1px 3px 0px #1018281A',
          padding: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h4">User Management</Typography>
          <Button
            className="small"
            onClick={() => {
              {
                value === 0
                  ? setIsAddUserOpen(true)
                  : setIsCreateTeamOpen(true);
              }
            }}
            variant="contained"
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '10px',
              marginTop: { xs: '10px', sm: '0px' },
              width: { xs: '100%', sm: 'fit-content' },
            }}
          >
            <AddCircleIcon
              sx={{
                color: `${theme?.palette?.common.white}`,
                fontSize: '16px',
              }}
            />
            {value === 0 ? 'Add User' : 'Create Team'}
          </Button>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="User" {...a11yProps(0)} />
              <Tab label="Teams" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <UserTable />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <TeamsTable />
          </CustomTabPanel>
        </Box>
      </Box>

      <CommonDrawer
        isDrawerOpen={isCreateTeamOpen}
        onClose={handleCloseDrawer}
        title={'Create Team'}
        okText={'Add'}
        footer={true}
        isOk={true}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {teamsDataArray?.map((item: any) => (
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
    </>
  );
};

export default UserManagement;
