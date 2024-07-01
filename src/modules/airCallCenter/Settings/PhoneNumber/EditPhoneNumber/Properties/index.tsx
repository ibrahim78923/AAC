import { FormProvider } from '@/components/ReactHookForm';
import { Box, Button, Grid, MenuItem, Select } from '@mui/material';
import { propertiesArray } from './Properties.data';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect } from 'react';

import AddNewCallerId from './AddNewCallerId';
import VerifyCode from './VerifyCode';
import CallerIdCreated from './CallerIdCreated';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_CALL_CENTER_SETTING_CHANNELS_PHONE_NUMBER_PERMISSION } from '@/constants/permission-keys';
import { PHONE_NUMBER_TYPE } from '@/constants/strings';

const Properties = (props: any) => {
  const {
    methods,
    maskValue,
    callerIds,
    setIsValidation,
    isNewNumber,
    setISNewNumber,
    callerIDCreated,
    setCallerIDCreated,
    isVerification,
    setIsVerification,
  } = props;
  useEffect(() => {
    setIsValidation(true);
  }, []);

  return (
    <PermissionsGuard
      permissions={[
        AIR_CALL_CENTER_SETTING_CHANNELS_PHONE_NUMBER_PERMISSION?.CHANNELS_PHONE_NUMBERS_EDIT_PROPERTIES,
      ]}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={0.5}>
          {propertiesArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
              <Box mt={1}>
                {item?.componentProps?.name ===
                  PHONE_NUMBER_TYPE?.MASK_NUMBER &&
                  maskValue && (
                    <Select
                      fullWidth
                      size="small"
                      placeholder="select"
                      value="jjciodeo"
                    >
                      {callerIds?.map((item: any) => (
                        <MenuItem value={item?.value} key={item?.id}>
                          {item?.label}
                        </MenuItem>
                      ))}
                      <MenuItem value="option3">
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<AddCircleIcon sx={{ width: '20px' }} />}
                          className="small"
                          onClick={() => setISNewNumber(true)}
                        >
                          Custom Button
                        </Button>
                      </MenuItem>
                    </Select>
                  )}
              </Box>
            </Grid>
          ))}
        </Grid>
        {isNewNumber && (
          <AddNewCallerId
            isNewNumber={isNewNumber}
            setISNewNumber={setISNewNumber}
            setIsVerification={setIsVerification}
          />
        )}
        {isVerification && (
          <VerifyCode
            isVerification={isVerification}
            setIsVerification={setIsVerification}
            setCallerIDCreated={setCallerIDCreated}
          />
        )}
        {callerIDCreated && (
          <CallerIdCreated
            callerIDCreated={callerIDCreated}
            setCallerIDCreated={setCallerIDCreated}
          />
        )}
      </FormProvider>
    </PermissionsGuard>
  );
};

export default Properties;
