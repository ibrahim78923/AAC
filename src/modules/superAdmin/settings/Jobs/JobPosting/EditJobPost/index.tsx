import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { EditJobPostPropsI } from './EditJobPost.interface';
import { jobPostingDataArray } from './EditJobPost.data';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { parseISO } from 'date-fns';
import {
  useGetJobByIdQuery,
  useUpdateJobMutation,
} from '@/services/superAdmin/settings/jobs';
import { jobPostingValidationSchema } from './EditJobPost.data';

const EditJobPost = ({ isModalOpen, onClose, rowId }: EditJobPostPropsI) => {
  const [initValues, setInitValues]: any = useState({});
  const { data: jobDataById } = useGetJobByIdQuery(rowId);

  useEffect(() => {
    if (jobDataById && jobDataById.data) {
      setInitValues({
        title: jobDataById?.data?.title,
        jobType: jobDataById?.data?.jobType,
        jobCategory: jobDataById?.data?.jobCategory,
        experience: jobDataById?.data?.experience,
        numberOfVacancy: jobDataById?.data?.numberOfVacancy,
        deadline: dayjs(jobDataById?.data?.deadline).format('YYYY-MM-DD'),
        description: jobDataById?.data?.description,
      });
    }
  }, [jobDataById, rowId]);

  const [updateJobPost, { isLoading: loadingUpdateJobPost }] =
    useUpdateJobMutation();
  const methods = useForm({
    resolver: yupResolver(jobPostingValidationSchema),
  });
  useEffect(() => {
    if (initValues) {
      methods.setValue('title', initValues?.title);
      methods.setValue('jobType', initValues?.jobType);
      methods.setValue('jobCategory', initValues?.jobCategory);
      methods.setValue('experience', initValues?.experience);
      methods.setValue('numberOfVacancy', initValues?.numberOfVacancy);
      methods.setValue('deadline', parseISO(initValues?.deadline));
      methods.setValue('description', initValues?.description);
    }
  }, [initValues, methods]);
  const { handleSubmit } = methods;

  const onSubmitEditJob = async (values: any) => {
    try {
      await updateJobPost({ id: rowId, body: values })?.unwrap();
      onClose();
      enqueueSnackbar('Job updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleSubmitAddJobPost = handleSubmit(onSubmitEditJob);

  return (
    <CommonDrawer
      isDrawerOpen={isModalOpen}
      onClose={onClose}
      title="Update a Job"
      okText="Update"
      isOk={true}
      footer={true}
      submitHandler={handleSubmitAddJobPost}
      loading={loadingUpdateJobPost}
    >
      <>
        <FormProvider methods={methods}>
          <Grid container spacing={4}>
            {jobPostingDataArray?.map((item: any) => (
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
    </CommonDrawer>
  );
};

export default EditJobPost;
