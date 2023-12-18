import * as React from 'react';

import {
  Box,
  Button,
  Typography,
  useTheme,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import { enqueueSnackbar } from 'notistack';
import {
  defaultValuesEmailAccess,
  validationSchemaEmailAccess,
} from './ManageAccess.data';
import { styles } from './ManageAccess.style';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import CommonModal from '@/components/CommonModal';
import useEmailMarketing from '../useEmailMarketing';

const ManageAccess = ({
  isOpenManageAccessModal,
  handleCloseManageAccessModal,
}: any) => {
  const { handleChangeAccessValue, isAccessValue } = useEmailMarketing();
  const theme = useTheme();
  const methods: any = useForm({
    resolver: yupResolver(validationSchemaEmailAccess),
    defaultValues: defaultValuesEmailAccess,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    handleCloseManageAccessModal();
    enqueueSnackbar('Manage Access Successfully', {
      variant: 'success',
    });
  };

  return (
    <div>
      <CommonModal
        open={isOpenManageAccessModal}
        handleClose={handleCloseManageAccessModal}
        handleCancel={handleCloseManageAccessModal}
        handleSubmit={handleCloseManageAccessModal}
        title="Email Access"
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <Typography
              variant="h6"
              fontWeight={600}
              color={theme?.palette?.slateBlue?.main}
            >
              Shared with *
            </Typography>
            <RadioGroup
              value={isAccessValue}
              onChange={handleChangeAccessValue}
              name="access"
            >
              <FormControlLabel
                value="availableToEveryOne"
                control={<Radio />}
                label="Available to EveryOne"
              />
              <FormControlLabel
                value="selectUserAndTeamWhoCanEdit"
                control={<Radio />}
                label="Select user and team who can edit"
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
      </CommonModal>
    </div>
  );
};
export default ManageAccess;
