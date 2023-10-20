import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { uuid } from 'uuidv4';
import { UploadAttachmentsArray } from './UploadAttachements.data';
import useUploadAttachments from './useUploadAttachments';
function UploadAttachments() {
  const { methods, handleSubmit, onSubmit } = useUploadAttachments();

  return (
    <>
      <Grid
        container
        justifyContent={'center'}
        display={'flex'}
        alignItems={'center'}
        flexDirection={'row'}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {UploadAttachmentsArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuid()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : item?.heading}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Grid>
    </>
  );
}

export default UploadAttachments;
