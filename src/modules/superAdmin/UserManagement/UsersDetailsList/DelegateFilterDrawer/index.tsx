import { Grid, Box, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';

import {
  DelegateArray,
  DelegateDefaultValues,
  DelegateValidationSchema,
} from './DelegateFilterDrawer.data';

import { FormProvider } from '@/components/ReactHookForm';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { v4 as uuidv4 } from 'uuid';

const DelegateFilterDrawer = (props: any) => {
  const { isOpen, setIsOpen } = props;

  const methods: any = useForm({
    resolver: yupResolver(DelegateValidationSchema),
    defaultValues: DelegateDefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = () => {};

  return (
    <CommonDrawer
      isDrawerOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      title="Filters"
      okText="Add"
      isOk={true}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {DelegateArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <Typography variant="body2" fontWeight={500}>
                  {item?.title}
                </Typography>
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

export default DelegateFilterDrawer;
