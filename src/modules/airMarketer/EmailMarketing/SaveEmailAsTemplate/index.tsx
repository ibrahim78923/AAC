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

const SaveEmailAsTemplate = ({
  openSaveEmailAsTemplateModal,
  handleCloseSaveEmailAsTemplateModal,
}: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchemaSaveEmailAsTemplate),
    defaultValues: defaultValuesSaveEmailAsTemplate,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    handleCloseSaveEmailAsTemplateModal();
    enqueueSnackbar('Move To Folder Added Successfully', {
      variant: 'success',
    });
  };

  return (
    <div>
      <CommonModal
        open={openSaveEmailAsTemplateModal}
        handleClose={handleCloseSaveEmailAsTemplateModal}
        handleCancel={handleCloseSaveEmailAsTemplateModal}
        handleSubmit={handleCloseSaveEmailAsTemplateModal}
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
              <Button variant="contained" type="submit" onClick={handleSubmit}>
                Save
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </CommonModal>
    </div>
  );
};
export default SaveEmailAsTemplate;
