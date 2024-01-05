import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import {
  attachmentsDataArray,
  drawerButtonTitle,
  drawerTitle,
} from './AttachmentsEditorDrawer.data';

import useAttachmentsEditorDrawer from './useAttachmentEditorDrawer';

import { v4 as uuidv4 } from 'uuid';

const AttachmentsEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer } = props;
  const { handleSubmit, onSubmit, methodsAttachments } =
    useAttachmentsEditorDrawer();

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={() => setOpenDrawer('')}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitle[openDrawer]}
        isOk={true}
        footer={openDrawer === 'View' ? false : true}
      >
        <Box>
          <FormProvider
            methods={methodsAttachments}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              container
              sx={{
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {attachmentsDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
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
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default AttachmentsEditorDrawer;
