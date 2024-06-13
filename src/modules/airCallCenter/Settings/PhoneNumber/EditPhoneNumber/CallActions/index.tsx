import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { callActionsArray } from './CallActions.data';
import { useEffect } from 'react';
const CallActions = (props: any) => {
  const { methods, setIsValidation } = props;

  useEffect(() => {
    setIsValidation(false);
  }, []);

  return (
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
  );
};

export default CallActions;
