import React, { useState } from 'react';

import { useRouter } from 'next/router';

import {
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  useTheme,
} from '@mui/material';

import CommonAccordian from './Accordian';

import { ArrowBack, ExpandMore } from '@mui/icons-material';

import { FormProvider } from '@/components/ReactHookForm';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';

import {
  addUserDefault,
  addUserSchema,
  addUsersArrayData,
} from '../RoleAndRights.data';

const AddRole = () => {
  const [switchVal, setSwitchVal] = useState(false);
  const navigate = useRouter();
  const theme = useTheme();
  const methods: any = useForm({
    resolver: yupResolver(addUserSchema),
    defaultValues: addUserDefault,
  });

  const { handleSubmit } = methods;
  const onSubmit = async (data: any) => {
    alert(data);
  };

  const accData = [
    {
      title: 'Dashboard',
      hasSwitch: true,
      content: 'Dashboard content here',
      endIcon: <ExpandMore sx={{ color: theme?.palette?.common?.white }} />,
    },
    {
      title: 'Deals',
      hasSwitch: true,
      content: 'Deals content here',
      endIcon: <ExpandMore sx={{ color: theme?.palette?.common?.white }} />,
    },
  ];

  const handleSwitch = () => {
    setSwitchVal(!switchVal);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <ArrowBack
          onClick={() => {
            navigate.push('/super-admin/user-management');
          }}
          sx={{ cursor: 'pointer' }}
        />
        <Typography variant="h5">Add New Role</Typography>
      </Box>
      <Box sx={{ my: 3 }}>
        <FormProvider methods={methods}>
          <Grid container spacing={4}>
            {addUsersArrayData?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
      <Grid container>
        <Grid item xs={12} lg={10}>
          <Typography variant="h5">Permissions</Typography>
        </Grid>
        <Grid item xs={12} lg={10}>
          <CommonAccordian
            data={accData}
            handleSwitch={handleSwitch}
            checked={switchVal}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'end', my: 2 }}>
        <Button
          variant="outlined"
          onClick={() => {
            navigate.push('/super-admin/user-management');
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            handleSubmit(onSubmit);
          }}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddRole;
