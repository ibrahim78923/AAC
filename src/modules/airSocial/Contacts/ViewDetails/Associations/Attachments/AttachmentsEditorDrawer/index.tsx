import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { attachmentsDataArray } from './AttachmentsEditorDrawer.data';

import useAttachmentsEditorDrawer from './useAttachmentEditorDrawer';

import { v4 as uuidv4 } from 'uuid';

const AttachmentsEditorDrawer = (props: any) => {
  const { isOpen, onClose, title, methods } = props;
  const { handleSubmit, onSubmit } = useAttachmentsEditorDrawer();

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={isOpen}
        onClose={onClose}
        title={`${title} Attachment`}
        okText={title === 'Add' ? 'Add' : title === 'Edit' ? 'Edit' : 'View'}
        isOk={true}
        footer={title === 'View' ? false : true}
      >
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
