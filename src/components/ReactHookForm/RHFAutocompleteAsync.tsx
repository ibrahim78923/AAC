import { useState, Fragment } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { debounce } from 'lodash';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Checkbox, Chip, Paper, Typography, useTheme } from '@mui/material';
import { Search } from '@mui/icons-material';
import CustomLabel from '../CustomLabel';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function RHFAutocompleteAsync({
  name,
  apiQuery,
  queryKey = 'search',
  debounceTime = 500,
  getOptionLabel = (option: any) => option?.name,
  multiple = false,
  variant = 'outlined',
  EndIcon,
  endIconClick,
  placeholder,
  noOptionsCase = 'Nothing in the List',
  externalParams = {},
  isOptionEqualToValue = (option: any, newValue: any) =>
    option?._id === newValue?._id,
  renderOption,
  required,
  ...other
}: any): JSX.Element {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  const [trigger, { data, isLoading, isFetching }]: any = apiQuery;

  const triggerDebounce = debounce((newInputValue) => {
    trigger({ params: { [queryKey]: newInputValue, ...externalParams } });
  }, debounceTime);

  const onChanged = (e: any, newValue: any, onChange: any) => {
    onChange(newValue);
  };

  const theme: any = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      render={(form) => {
        return (
          <Autocomplete
            {...form?.field}
            multiple={multiple}
            limitTags={2}
            id={name}
            open={open}
            autoComplete
            includeInputInList
            noOptionsText={noOptionsCase}
            options={data ?? []}
            disableCloseOnSelect
            {...other}
            onOpen={() => {
              setOpen(true);
              trigger({ params: {} });
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={isOptionEqualToValue}
            getOptionLabel={getOptionLabel}
            loading={isLoading || isFetching}
            onChange={(e: React.SyntheticEvent, newValue: any) => {
              onChanged(e, newValue, form?.field?.onChange);
              setOpen(false);
            }}
            PaperComponent={(props) => (
              <Paper
                {...props}
                sx={{
                  backgroundColor: theme?.palette?.common?.white,
                  border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                  borderRadius: 1,
                  boxShadow: 1,
                  color: 'grey.600',
                }}
              >
                {props?.children}
              </Paper>
            )}
            onInputChange={(event, newInputValue) => {
              triggerDebounce?.cancel();
              if (newInputValue?.trim()) triggerDebounce(newInputValue);
            }}
            filterOptions={(x) => x}
            renderOption={(props, option: any, { selected }) => {
              return (
                <li {...props} key={option?.id}>
                  {multiple && (
                    <Checkbox
                      key={option?.id}
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                  )}
                  {renderOption && renderOption(option)}
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
              <Fragment>
                {other?.label && (
                  <CustomLabel label={other?.label} required={required} />
                )}
                <TextField
                  {...params}
                  label={''}
                  placeholder={placeholder}
                  error={Boolean(form?.fieldState?.error)}
                  helperText={
                    <Typography
                      component={'span'}
                      sx={{ display: 'block', mt: -1, ml: -1 }}
                    >
                      {form?.fieldState?.error?.message}
                    </Typography>
                  }
                  variant={variant}
                  InputProps={{
                    ...params?.InputProps,
                    endAdornment: (
                      <Fragment>
                        {isLoading || isFetching ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : (
                          <Search sx={{ color: 'inherit' }} />
                        )}
                        {EndIcon && (
                          <EndIcon
                            onClick={() => endIconClick?.()}
                            sx={{ cursor: 'pointer' }}
                          />
                        )}
                        {params?.InputProps?.endAdornment}
                      </Fragment>
                    ),
                  }}
                />
              </Fragment>
            )}
          />
        );
      }}
    />
  );
}
