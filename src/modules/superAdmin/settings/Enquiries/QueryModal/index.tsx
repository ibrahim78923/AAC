import React from 'react';

import { Box, Grid, Typography, useTheme } from '@mui/material';

import CommonModal from '@/components/CommonModal';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

import { QueryModalPropsI } from './QueryModal.interface';

import {
  replyQueryDefaultValues,
  replyQueryFiltersDataArray,
  replyQueryValidationSchema,
} from './Query.data';

import { PostIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';

const QueryModal = ({
  isQueryModalOpen,
  setIsQueryModalOpen,
}: QueryModalPropsI) => {
  const theme = useTheme();

  const methodsAddFaqs = useForm({
    resolver: yupResolver(replyQueryValidationSchema),
    defaultValues: replyQueryDefaultValues,
  });

  const onSubmit = () => {
    setIsQueryModalOpen(false);
  };
  const { handleSubmit } = methodsAddFaqs;
  return (
    <CommonModal
      open={isQueryModalOpen}
      handleClose={() => setIsQueryModalOpen(false)}
      handleSubmit={() => setIsQueryModalOpen(false)}
      title="Query from User"
      okText="Submit"
      submitIcon={<PostIcon color={theme.palette.common.white} />}
      footer={true}
    >
      <>
        <FormProvider
          methods={methodsAddFaqs}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box>
            <Typography variant="body2" sx={{ fontWeight: '500' }}>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. In publishing
              and graphic design, Lorem ipsum is a placeholder text commonly
              used to demonstrate the visual form of a document or a typeface
              without relying on meaningful content.
            </Typography>
          </Box>
          <br />
          <Grid container spacing={4}>
            {replyQueryFiltersDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : null}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </>
    </CommonModal>
  );
};

export default QueryModal;
