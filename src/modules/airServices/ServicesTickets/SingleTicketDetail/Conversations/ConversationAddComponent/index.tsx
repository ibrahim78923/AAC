import React from 'react';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import ConversationArticleSelect from '../ConversationArticleSelect';

const ConversationAddComponent = ({
  show,
  setShow,
  addConversationModal,
  onSubmit,
  dataArray,
  editConversationItem,
}: any) => {
  return (
    <CommonDrawer
      isDrawerOpen={show || editConversationItem}
      onClose={() => setShow(false)}
      okText={'Add Note'}
      footer={true}
      isOk={true}
      submitHandler={() => {
        addConversationModal?.handleSubmit(onSubmit)();
      }}
    >
      <FormProvider methods={addConversationModal}>
        <Grid container spacing={2}>
          {dataArray?.map((item: any) => (
            <Grid
              item
              xs={12}
              md={item?.md}
              key={item?._id}
              mb={item?.mb || ''}
            >
              <Grid item xs={12} md={item?.md}>
                <item.component
                  {...item?.componentProps}
                  size={'small'}
                  options={item?.options}
                >
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={item?._id} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 2 }}>
          <ConversationArticleSelect />
        </Box>
      </FormProvider>
    </CommonDrawer>
  );
};

export default ConversationAddComponent;
