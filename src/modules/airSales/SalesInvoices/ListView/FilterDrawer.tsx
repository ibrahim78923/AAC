import { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FilterAlt } from '@mui/icons-material';
import {
  invoiceFilterFields,
  defaultValues,
  validationSchema,
} from '../SalesInvoices.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';

const FilterDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onSubmit = () => {
    // console.log(data);
  };

  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit } = methods;

  return (
    <Box>
      <Button
        sx={{ border: '1px solid #D1D5DB', color: '#6B7280' }}
        startIcon={<FilterAlt />}
        onClick={() => setIsDrawerOpen(true)}
      >
        Filter
      </Button>

      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Filters"
        isOk={true}
        okText="Apply"
        cancelText="Cancel"
        footer={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <FormProvider methods={methods}>
          <Grid container spacing={4}>
            {invoiceFilterFields?.map((item: any) => (
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
      </CommonDrawer>
    </Box>
  );
};

export default FilterDrawer;
