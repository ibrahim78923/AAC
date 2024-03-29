import React from 'react';

import { Button, Grid, useTheme } from '@mui/material';

import CommonModal from '@/components/CommonModal';

import { FormProvider } from '@/components/ReactHookForm';
import { NewsAndEventsPropsI } from './NewsAndEventsModal.interface';

import {
  newsAndEventsFormDefaultValues,
  newsAndEventsFormFiltersDataArray,
  newsAndEventsFormValidationSchema,
} from './NewsAndEventsModal.data';

import { PostIcon } from '@/assets/icons';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {
  usePostNewsEventsMutation,
  useUpdateNewsEventsMutation,
} from '@/services/superAdmin/settings/news-events';
import { enqueueSnackbar } from 'notistack';

const NewsAndEventsModal = ({
  isNewsAndEventAddModal,
  setIsNewsAndEventAddModal,
  isNewsAndEventAdd,
  tableRowValues,
  setTableRowValues,
  setIsDisabled,
}: NewsAndEventsPropsI) => {
  const theme = useTheme();
  const methodsAddFaqs = useForm({
    resolver: yupResolver(newsAndEventsFormValidationSchema),
    defaultValues: async () => {
      if (tableRowValues?.row?.original) {
        const { name, type, description } = tableRowValues?.row?.original;
        return {
          name,
          type,
          description,
        };
      }
      return newsAndEventsFormDefaultValues;
    },
  });
  const [postNewsEvents] = usePostNewsEventsMutation();
  const [updateNewsEvents] = useUpdateNewsEventsMutation();

  const { handleSubmit, reset } = methodsAddFaqs;

  const onSubmit = async (values: any) => {
    try {
      isNewsAndEventAdd
        ? await updateNewsEvents({
            id: tableRowValues?.row?.original?._id,
            body: values,
          })?.unwrap()
        : await postNewsEvents({ body: values })?.unwrap();
      enqueueSnackbar(
        `News Events ${isNewsAndEventAdd ? 'updated' : 'added'} Successfully`,
        {
          variant: 'success',
        },
      );
      setIsNewsAndEventAddModal(false);
      setTableRowValues('');
      setIsDisabled(false);
      reset();
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  return (
    <CommonModal
      open={isNewsAndEventAddModal}
      handleCancel={() => setIsNewsAndEventAddModal(false)}
      handleClose={() => setIsNewsAndEventAddModal(false)}
      handleSubmit={() => setIsNewsAndEventAddModal(false)}
      title={
        isNewsAndEventAdd ? 'update  News and Events' : 'Add  News and Events'
      }
      okText="add"
      footer={false}
      submitIcon={<PostIcon color={theme.palette.common.white} />}
    >
      <>
        <FormProvider
          methods={methodsAddFaqs}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={4}>
            {newsAndEventsFormFiltersDataArray?.map((item: any) => (
              <Grid
                item
                xs={12}
                md={item?.md}
                key={uuidv4()}
                sx={{ paddingTop: '10px !important' }}
              >
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
          <Grid sm={12} mt={3} sx={{ textAlign: 'end' }}>
            <Button variant="contained" className="medium" type="submit">
              Add
            </Button>
          </Grid>
        </FormProvider>
      </>
    </CommonModal>
  );
};

export default NewsAndEventsModal;
