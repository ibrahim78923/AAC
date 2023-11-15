// react
import { useState, useEffect, Fragment } from 'react';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { debounce } from 'lodash';

// mui icons
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Checkbox, Chip, FormLabel, Stack } from '@mui/material';

// ----------------------------------------------------------------------
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// ----------------------------------------------------------------------

export default function RHFAutocompleteAsync({
  name,
  apiQuery,
  queryKey = 'search',
  debounceTime = 500,
  getOptionLabel = (option: any) => option?.name,
  multiple = false,
  variant = 'outlined',
  outerLabel,
  EndIcon,
  placeholder,
  StartIcon,
  externalParams = {},
  isOptionEqualToValue = (option: any, newValue: any) =>
    option?._id === newValue?._id,
  ...other
}: any): JSX.Element {
  // states
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  // api
  const [trigger, { data, isLoading, isFetching }]: any = apiQuery;

  // constants
  const label = other?.label;

  // debounce
  const triggerDebounce = debounce((newInputValue) => {
    trigger({ params: { [queryKey]: newInputValue, ...externalParams } });
  }, debounceTime);

  // on changes
  const onChanged = (e: any, newValue: any, onChange: any) => {
    onChange(newValue);
  };

  useEffect(() => {
    trigger({ params: {} });
  }, [trigger]);

  return (
    <Controller
      name={name}
      control={control}
      render={(form) => {
        return (
          <Stack gap="0.6rem">
            {outerLabel && <FormLabel>{outerLabel}</FormLabel>}
            <Autocomplete
              {...form?.field}
              multiple={multiple}
              id={name}
              open={open}
              autoComplete
              includeInputInList
              filterSelectedOptions
              noOptionsText="No option"
              options={data ?? []}
              disableCloseOnSelect
              {...other}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              isOptionEqualToValue={isOptionEqualToValue}
              getOptionLabel={getOptionLabel}
              loading={isLoading || isFetching}
              onChange={(e: React.SyntheticEvent, newValue: any) => {
                onChanged(e, newValue, form?.field?.onChange);
              }}
              onInputChange={(event, newInputValue) => {
                triggerDebounce?.cancel();
                if (newInputValue?.trim()) triggerDebounce(newInputValue);
              }}
              filterOptions={(x) => x}
              renderOption={(props, option: any, { selected }) => {
                return (
                  <li {...props} key={option?.id}>
                    <Checkbox
                      key={option?.id}
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {getOptionLabel(option)}
                  </li>
                );
              }}
              renderTags={(tagValue, getTagProps) => {
                return tagValue?.map((option: any, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option?.id}
                    label={getOptionLabel(option)}
                  />
                ));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  placeholder={placeholder}
                  error={Boolean(form?.fieldState?.error)}
                  helperText={form?.fieldState?.error?.message}
                  variant={variant}
                  InputProps={{
                    ...params?.InputProps,
                    endAdornment: (
                      <Fragment>
                        {isLoading || isFetching ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {EndIcon ?? params?.InputProps?.endAdornment}
                      </Fragment>
                    ),
                    ...(StartIcon && { startAdornment: StartIcon }),
                  }}
                />
              )}
            />
          </Stack>
        );
      }}
    />
  );
}
