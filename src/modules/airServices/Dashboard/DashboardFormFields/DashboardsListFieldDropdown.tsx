import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetServicesDashboardDashboardNameDropdownListQuery } from '@/services/airServices/dashboard';
import { getActiveProductSession } from '@/utils';
import { truncateText } from '@/utils/avatarUtils';
import { pxToRem } from '@/utils/getFontValue';
import { Box, Chip, Typography } from '@mui/material';
import { useMemo } from 'react';

export const DashboardListFieldDropdown = (props: any) => {
  const apiQueryDashboardList =
    useLazyGetServicesDashboardDashboardNameDropdownListQuery?.();
  const { disabled } = props;

  const productId = useMemo(() => {
    const product = getActiveProductSession() as any;
    return product?._id ?? {};
  }, []);

  return (
    <RHFAutocompleteAsync
      disabled={disabled}
      name="dashboardId"
      size="small"
      sx={{
        minWidth: pxToRem(200),
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
      apiQuery={apiQueryDashboardList}
      externalParams={{ productId }}
      renderOption={(option: any) => (
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Box>
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
  );
};
