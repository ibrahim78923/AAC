import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { callActionsArray } from './CallActions.data';
import { useEffect } from 'react';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_CALL_CENTER_SETTING_CHANNELS_PHONE_NUMBER_PERMISSION } from '@/constants/permission-keys';
const CallActions = (props: any) => {
  const { methods, setIsValidation } = props;

  useEffect(() => {
    setIsValidation(false);
  }, []);

  return (
    <PermissionsGuard
      permissions={[
        AIR_CALL_CENTER_SETTING_CHANNELS_PHONE_NUMBER_PERMISSION?.CHANNELS_PHONE_NUMBERS_EDIT_CALL_ACTIONS,
      ]}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {callActionsArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </PermissionsGuard>
  );
};

export default CallActions;
