import * as React from 'react';

import {
  Grid,
  Box,
  Button,
  FormControl,
  Typography,
  useTheme,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

import { FormProvider, RHFSelect } from '@/components/ReactHookForm';

import { enqueueSnackbar } from 'notistack';
import {
  dataArraySavedView,
  defaultValuesFeatures,
  validationSchemaFeatures,
} from './ManageSharingModal.data';
import { styles } from './ManageSharingModal.style';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import CommonModal from '@/components/CommonModal';
import useManageSharingModal, { teamsArr } from './useManageSharingModal';

const ManageSharingModal = ({
  isAllViewActionsModal,
  handleCloseModal,
}: any) => {
  const { accessValue, handleChangeAccessValue } = useManageSharingModal();
  const methods: any = useForm({
    resolver: yupResolver(validationSchemaFeatures),
    defaultValues: defaultValuesFeatures,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    handleCloseModal;
    enqueueSnackbar('Clone Successfully', {
      variant: 'success',
    });
  };
  const theme = useTheme();

  return (
    <div>
      <CommonModal
        open={isAllViewActionsModal}
        handleClose={handleCloseModal}
        handleCancel={handleCloseModal}
        handleSubmit={handleCloseModal}
        title="Create a new saved view"
      >
        <Box sx={{ margin: '20px 0' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              {dataArraySavedView?.map((item: any) => (
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
            <FormControl>
              <Typography
                variant="h6"
                fontWeight={600}
                color={theme?.palette?.slateBlue.main}
              >
                Shared with *
              </Typography>
              <RadioGroup
                value={accessValue}
                onChange={handleChangeAccessValue}
                name="access"
              >
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label="Private"
                />
                <FormControlLabel
                  value="specificUserOrTeam"
                  control={<Radio />}
                  label="Specific User or Team"
                />
                {accessValue === 'specificUserOrTeam' && (
                  <FormControl sx={{ ml: 2 }} component="fieldset">
                    <RHFSelect name="users" label="Users" size="small">
                      {teamsArr?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect name="teams" label="Teams" size="small">
                      {teamsArr?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                    </RHFSelect>
                  </FormControl>
                )}
                <FormControlLabel
                  value="everyOne"
                  control={<Radio />}
                  label="EveryOne"
                />
              </RadioGroup>
            </FormControl>
            <Box sx={styles?.buttonBox} mt={2}>
              <Button variant="outlined">Cancel</Button>
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
export default ManageSharingModal;
