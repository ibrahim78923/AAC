import { Typography, Box, Chip } from '@mui/material';
import useCreateDashboardOptions from './useCreateDashboardOptions';
import { truncateText } from '@/utils/avatarUtils';
import { pxToRem } from '@/utils/getFontValue';
import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import useAuth from '@/hooks/useAuth';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect } from 'react';

const CreateDashboardOptions = (props: any) => {
  const {
    listData,
    selectedDashboard,
    setSelectedDashboard,
    defaultDashboard,
  } = props;
  const auth: any = useAuth();
  const productId: any = auth?.product?._id ?? {};
  const { handleMenuItemClick } =
    useCreateDashboardOptions(setSelectedDashboard);
  const methods = useForm({
    defaultValues: {
      dashboardId: selectedDashboard ? selectedDashboard : defaultDashboard,
    },
  });
  const { watch } = methods;
  const currDashboardId = watch('dashboardId');

  useEffect(() => {
    if (currDashboardId?._id) {
      setSelectedDashboard(currDashboardId?._id);
    } else {
      setSelectedDashboard(defaultDashboard?._id || selectedDashboard?._id);
    }
  }, [
    currDashboardId?._id,
    defaultDashboard,
    selectedDashboard,
    setSelectedDashboard,
  ]);

  return (
    <FormProvider {...methods}>
      <RHFAutocompleteAsync
        name="dashboardId"
        size="small"
        sx={{
          minWidth: pxToRem(230),
          '.MuiInputBase-input': {
            padding: `${pxToRem(5)} !important`,
          },
          '.MuiFormHelperText-root': {
            display: 'none',
          },
          '& .MuiOutlinedInput-root ': {
            height: pxToRem(36),
          },
        }}
        placeholder="Dashboards"
        apiQuery={listData}
        externalParams={{ productId }}
        renderOption={(option: any) => (
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            width={'100%'}
          >
            <Box onClick={() => handleMenuItemClick(option?._id)}>
              <Typography variant="body2" component={'span'} flex={1}>
                {truncateText(option?.name)}
              </Typography>
            </Box>
            {option?.isDefault && (
              <Chip
                size="small"
                label="Default"
                variant="outlined"
                color={'success'}
                component={'span'}
              />
            )}
          </Box>
        )}
      />
    </FormProvider>
  );
};

export default CreateDashboardOptions;
