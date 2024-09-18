import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetDashboardNameListDropdownListForDashboardQuery } from '@/services/airServices/dashboard';
import { truncateText } from '@/utils/avatarUtils';
import { pxToRem } from '@/utils/getFontValue';
import { Box, Chip, Typography } from '@mui/material';

export const DashboardListFieldDropdown = (props: any) => {
  const apiQueryDashboardList =
    useLazyGetDashboardNameListDropdownListForDashboardQuery?.();
  const { disabled } = props;
  return (
    <RHFAutocompleteAsync
      disabled={disabled}
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
      apiQuery={apiQueryDashboardList}
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
