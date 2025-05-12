import { Box, Grid } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { attachmentsDataArray } from './AttachmentsEditorDrawer.data';
import { DRAWER_TITLE } from '@/constants';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

const AttachmentsEditorDrawer = (props: any) => {
  const { isOpen, onClose, title, methods, handleSubmit, loading } = props;

  const formFields = attachmentsDataArray(
    title === DRAWER_TITLE?.VIEW ? true : false,
  );

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={isOpen}
        onClose={onClose}
        title={`${title} Attachment`}
        okText={
          title === DRAWER_TITLE?.ADD
            ? GENERIC_UPSERT_FORM_CONSTANT?.CREATE
            : title === DRAWER_TITLE?.EDIT
              ? DRAWER_TITLE?.EDIT
              : DRAWER_TITLE?.VIEW
        }
        isOk={true}
        footer={title === DRAWER_TITLE?.VIEW ? false : true}
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
              {formFields?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
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
