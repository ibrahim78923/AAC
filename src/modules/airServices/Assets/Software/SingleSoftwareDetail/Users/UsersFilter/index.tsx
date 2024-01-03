import * as React from 'react';
import Button from '@mui/material/Button';
import { FilterIcon } from '@/assets/icons';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  userDataArray,
  userDefaultValues,
  userValidationSchema,
} from './UsersFilter.data';
import { Box, Grid } from '@mui/material';

export const UsersFilter = () => {
  const methods: any = useForm({
    resolver: yupResolver(userValidationSchema),
    defaultValues: userDefaultValues,
  });

  const [isFilterOpen, setIsFilterOpen] = React?.useState(false);

  const openFilterDrawer = () => {
    setIsFilterOpen(true);
  };

  const closeFilterDrawer = () => {
    setIsFilterOpen(false);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        id="demo-positioned-button"
        onClick={openFilterDrawer}
        startIcon={<FilterIcon />}
        color="secondary"
      >
        Filter
      </Button>

      <CommonDrawer
        isDrawerOpen={isFilterOpen}
        onClose={closeFilterDrawer}
        title={'Filters'}
        okText={'Apply'}
        footer={true}
        isOk={true}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {userDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
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
    </Box>
  );
};
