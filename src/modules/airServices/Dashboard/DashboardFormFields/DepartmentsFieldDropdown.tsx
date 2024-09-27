import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useLazyGetServicesDashboardDepartmentsDropdownListQuery } from '@/services/airServices/dashboard';
import { pxToRem } from '@/utils/getFontValue';

export const DepartmentFieldDropdown = (props: any) => {
  const { disabled = false } = props;
  const apiQueryDepartment =
    useLazyGetServicesDashboardDepartmentsDropdownListQuery();
  return (
    <RHFAutocompleteAsync
      disabled={disabled}
      name="departmentId"
      size="small"
      sx={{
        minWidth: pxToRem(200),
        '.MuiInputBase-input': {
          padding: `${pxToRem(2)} !important`,
        },
        '.MuiFormHelperText-root': {
          display: 'none',
        },
        '& .MuiOutlinedInput-root ': {
          height: pxToRem(36),
        },
      }}
      placeholder="All Departments"
      apiQuery={apiQueryDepartment}
    />
  );
};
