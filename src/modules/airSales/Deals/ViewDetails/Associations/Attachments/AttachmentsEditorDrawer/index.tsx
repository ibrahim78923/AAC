import { Box, Grid } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import {
  attachmentsDataArray,
  drawerButtonTitle,
  drawerTitle,
} from './AttachmentsEditorDrawer.data';
import useAttachmentsEditorDrawer from './useAttachmentEditorDrawer';
import { AttachFileCard } from '@/components/AttachFileCard';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

const AttachmentsEditorDrawer = (props: any) => {
  const { openDrawer, setOpenDrawer, dealId } = props;
  const { handleSubmit, onSubmit, methodsAttachments, loadingPostAttachment } =
    useAttachmentsEditorDrawer({
      setOpenDrawer,
      dealId,
    });

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer?.isToggle}
        onClose={() => setOpenDrawer({ ...openDrawer, isToggle: false })}
        title={drawerTitle[openDrawer?.type]}
        okText={drawerButtonTitle[openDrawer?.type]}
        isOk={true}
        footer={
          openDrawer === GENERIC_UPSERT_FORM_CONSTANT?.VIEW ? false : true
        }
        submitHandler={handleSubmit(onSubmit)}
        isLoading={loadingPostAttachment}
      >
        <Box>
          <FormProvider methods={methodsAttachments}>
            <Grid
              container
              sx={{
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {openDrawer?.type === GENERIC_UPSERT_FORM_CONSTANT?.ADD ? (
                attachmentsDataArray?.map((item: any) => (
                  <Grid item xs={12} key={item?.componentProps?.name}>
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
              ) : (
                <Grid item xs={12}>
                  <AttachFileCard
                    data={openDrawer?.recData}
                    onDelete={() => {}}
                    permissionKey={[]}
                  />
                </Grid>
              )}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default AttachmentsEditorDrawer;
