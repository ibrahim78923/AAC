import React from 'react';
import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { EditJobPostPropsI } from './EditFaq.interface';
import { jobPostingDataArray } from './EditJobPost.data';
import { v4 as uuidv4 } from 'uuid';
import {
  useGetJobByIdQuery,
  useUpdateJobMutation,
} from '@/services/superAdmin/settings/jobs';
import { jobPostingValidationSchema } from './EditJobPost.data';

const EditJobPost = ({
  isModalOpen,
  onClose,
  isLoading,
  rowId,
}: EditJobPostPropsI) => {
  const { data: jobDataById } = useGetJobByIdQuery(rowId);

  const [updateJobPost] = useUpdateJobMutation();

  const defaultValues = {
    title: jobDataById?.data?.title,
    jobType: jobDataById?.data?.jobType,
    jobCategory: jobDataById?.data?.jobCategory,
    experience: jobDataById?.data?.experience,
    numberOfVacancy: jobDataById?.data?.numberOfVacancy,
    deadline: jobDataById?.data?.deadline,
    description: jobDataById?.data?.description,
  };

  const methods = useForm({
    resolver: yupResolver(jobPostingValidationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmitEditJob = async (values: any) => {
    try {
      await updateJobPost({ id: rowId, body: values })?.unwrap();

      enqueueSnackbar('Job added successfully', {
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
      title="Post a Job"
      okText="Update"
      isOk={true}
      footer={true}
      loading={isLoading}
      submitHandler={handleSubmitAddJobPost}
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
