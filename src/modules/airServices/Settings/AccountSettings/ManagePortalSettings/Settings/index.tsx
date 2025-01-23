import { Box, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { ISettingsDataItem } from './Settings.interface';
import { useSettings } from './useSettings';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const Settings = () => {
  const { methods, settingsDataArray, checkApiErrorOrLoading } = useSettings();

  return (
    <Box border={'.1rem solid'} borderColor={'grey.700'} p={2} borderRadius={4}>
      {checkApiErrorOrLoading?.() ?? (
        <>
          <Typography variant="h4">Security Help Desk</Typography>
          <Box bgcolor={'grey.100'} borderRadius={3} p={2} mt={1}>
            <FormProvider methods={methods}>
              <CustomGrid isContainer>
                {settingsDataArray?.map((item: ISettingsDataItem) => (
                  <CustomGrid md={item?.md} key={item?.id}>
                    <item.component
                      {...item?.componentProps}
                      size={'small'}
                      disabled
                    />
                  </CustomGrid>
                ))}
              </CustomGrid>
            </FormProvider>
          </Box>
        </>
      )}
    </Box>
  );
};
