import React from 'react';
import { Grid } from '@mui/material';
import CommonModal from '@/components/CommonModal';
import { FormProvider } from '@/components/ReactHookForm';
import { NewsAndEventsPropsI } from './NewsAndEventsModal.interface';
import { newsAndEventsFormFiltersDataArray } from './NewsAndEventsModal.data';
import { MODAL_TITLE } from '../NewsAndEvents.data';

const NewsAndEventsModal = ({
  title,
  isNewsAndEventAddModal,
  handleOnClode,
  methods,
  handleOnSubmit,
  isLoading,
}: NewsAndEventsPropsI) => {
  return (
    <CommonModal
      open={isNewsAndEventAddModal}
      handleCancel={handleOnClode}
      handleClose={handleOnClode}
      handleSubmit={handleOnSubmit}
      title={`${title} News and Events`}
      okText={title === MODAL_TITLE.ADD ? 'Add' : 'Update'}
      footer={true}
      isLoading={isLoading}
    >
      <>
        <FormProvider methods={methods}>
          <Grid container spacing={4}>
            {newsAndEventsFormFiltersDataArray?.map((item: any) => (
              <Grid
                item
                xs={12}
                md={item?.md}
                key={item?.componentProps?.name}
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
        </FormProvider>
      </>
    </CommonModal>
  );
};

export default NewsAndEventsModal;
