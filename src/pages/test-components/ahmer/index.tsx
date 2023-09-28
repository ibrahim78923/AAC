import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function CreateNewTicketPage({ disabled }: any) {
  const theme = useTheme();

  const dataArray = [
    {
      id: 1,
      componentProps: {
        name: 'requester',
        label: 'Requester',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 6,
    },
  ];

  const methods: any = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        requester: Yup.string().trim().required('Field is Required'),
      }),
    ),
    defaultValues: { requester: '' },
  });

  const {
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    // console.log(data);
  };

  return (
    <Box>
      <Typography
        variant={'h4'}
        display={'flex'}
        alignItems={'center'}
        color={theme?.palette?.primary?.main}
      >
        <ArrowBackIcon sx={{ marginRight: 1, cursor: 'pointer' }} /> Create
        Ticket
      </Typography>

      <Box mt={2}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            {dataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component
                  disabled={disabled}
                  {...item.componentProps}
                  size={'small'}
                >
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : item?.heading}
                </item.component>
              </Grid>
            ))}
            {/* <Grid item xs={12}>
            {!disabled && (
              <LoadingButton
                type="submit"
                variant="contained"
                sx={{ mr: 2 }}
                loading={isSubmitting}
                color={isError ? 'error' : isSuccess ? 'success' : 'primary'}
              >
                {isError ? 'Try Again!' : isSuccess ? 'Success' : 'Submit'}
              </LoadingButton>
            )}
            <Button
              type="button"
              variant="contained"
              onClick={() =>
                router.push(
                  makePath({
                    path: '/foster-child/referrals/child-referral',
                    skipQueries: ['childReferralId'],
                  }),
                )
              }
            >
              Back
            </Button>
          </Grid> */}
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  );
}

export default CreateNewTicketPage;

CreateNewTicketPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
