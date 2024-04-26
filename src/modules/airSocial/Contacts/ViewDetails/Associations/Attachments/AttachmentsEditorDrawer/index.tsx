import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { attachmentsDataArray } from './AttachmentsEditorDrawer.data';

import { v4 as uuidv4 } from 'uuid';
import { IMG_URL } from '@/config';

const AttachmentsEditorDrawer = (props: any) => {
  const {
    isOpen,
    onClose,
    title,
    methods,
    handleSubmit,
    loading,
    attachmentData,
  } = props;

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={isOpen}
        onClose={onClose}
        title={`${title} Attachment`}
        okText={title === 'Add' ? 'Add' : title === 'Edit' ? 'Edit' : 'View'}
        isOk={true}
        footer={title === 'View' ? false : true}
        submitHandler={handleSubmit}
        isLoading={loading}
      >
        <Box>
          <FormProvider methods={methods}>
            <Grid
              container
              sx={{
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {title === 'View' ? (
                <Box
                  sx={{
                    border: (theme: any) =>
                      `1px solid ${theme?.palette?.custom?.hex_grey}`,
                    borderRadius: '8px',
                    padding: '16px',
                    width: '100%',
                    textAlign: 'center',
                    '& > img': {
                      m: '0 auto',
                    },
                  }}
                >
                  <Box
                    component={'img'}
                    src={`${IMG_URL}${attachmentData?.fileUrl}`}
                  />
                </Box>
              ) : (
                attachmentsDataArray?.map((item: any) => (
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
                ))
              )}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default AttachmentsEditorDrawer;
