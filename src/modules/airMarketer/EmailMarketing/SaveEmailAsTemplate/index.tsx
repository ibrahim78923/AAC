import * as React from 'react';

import { Grid, Box, Typography, Button } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { enqueueSnackbar } from 'notistack';
import {
  dataArraySaveEmailAsTemplate,
  defaultValuesSaveEmailAsTemplate,
  validationSchemaSaveEmailAsTemplate,
} from './SaveEmailAsTemplate.data';

import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import CommonModal from '@/components/CommonModal';
import { styles } from '../ManageAccess/ManageAccess.style';
import { FeaturedIcon } from '@/assets/icons';
import { usePostEmailMarketingTemplatesMutation } from '@/services/airMarketer/emailTemplates';
import { LoadingButton } from '@mui/lab';

const SaveEmailAsTemplate = ({
  handleReset,
  selectedRecords,
  openSaveEmailAsTemplateModal,
  handleCloseSaveEmailAsTemplateModal,
}: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchemaSaveEmailAsTemplate),
    defaultValues: defaultValuesSaveEmailAsTemplate,
  });

  const { handleSubmit } = methods;

  const [postEmailTemplate, { isLoading: loadingPostTemplate }] =
    usePostEmailMarketingTemplatesMutation();

  const onSubmit = async (values: any) => {
    const payload = {
      name: values?.templateTitle,
      html: selectedRecords?.message,
    };
    try {
      await postEmailTemplate({
        body: payload,
      })?.unwrap();
      enqueueSnackbar('Template added successful ', {
        variant: 'success',
      });
      handleReset();
      handleCloseSaveEmailAsTemplateModal();
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  return (
    <div>
      <CommonModal
        open={openSaveEmailAsTemplateModal}
        handleClose={handleCloseSaveEmailAsTemplateModal}
        handleCancel={handleCloseSaveEmailAsTemplateModal}
        handleSubmit={handleCloseSaveEmailAsTemplateModal}
        isLoading={loadingPostTemplate}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'inline-flex' }} component={'span'}>
              <FeaturedIcon />
            </Box>
            <Box sx={{ display: 'inline-flex', ml: '12px' }} component={'span'}>
              Save as Template
            </Box>
          </Box>
        }
      >
        <Box sx={{ margin: '20px 0' }}>
          <Grid container>
            <Grid item xs={12} mb={2}>
              <Typography>
                Are you sure you want to save this email as a template ?
              </Typography>
            </Grid>
          </Grid>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              {dataArraySaveEmailAsTemplate?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>
            <Box sx={styles?.buttonBox} mt={2}>
              <Button
                variant="outlined"
                onClick={handleCloseSaveEmailAsTemplateModal}
              >
                Cancel
              </Button>
              <LoadingButton
                variant="contained"
                type="submit"
                onClick={handleSubmit}
                loading={loadingPostTemplate}
              >
                Save
              </LoadingButton>
            </Box>
          </FormProvider>
        </Box>
      </CommonModal>
    </div>
  );
};
export default SaveEmailAsTemplate;
