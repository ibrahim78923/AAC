import React from 'react';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import CommonDrawer from '@/components/CommonDrawer';
import ConversationArticleSelect from '../ConversationArticleSelect';

const ConversationAddComponent = ({
  show,
  setShow,
  addConversationModal,
  onSubmit,
  dataArray,
}: any) => {
  return (
    <CommonDrawer
      isDrawerOpen={show}
      onClose={() => setShow(false)}
      okText={'Add Note'}
      footer={true}
      isOk={true}
    >
      <FormProvider
        methods={addConversationModal}
        onSubmit={addConversationModal?.handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          {dataArray?.map((item: any) => (
            <Grid
              item
              xs={12}
              md={item?.md}
              key={uuidv4()}
              mb={item?.mb ? item?.mb : ''}
            >
              <Grid item xs={12} md={item?.md}>
                <item.component
                  {...item?.componentProps}
                  size={'small'}
                  options={item?.options}
                >
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : null}
                </item.component>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <ConversationArticleSelect />
      </FormProvider>
    </CommonDrawer>
  );
};

export default ConversationAddComponent;
