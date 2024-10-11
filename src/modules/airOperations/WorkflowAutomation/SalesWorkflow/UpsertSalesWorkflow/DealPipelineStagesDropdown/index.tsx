import { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Paper,
  Typography,
  TextField,
  Autocomplete,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import CustomLabel from '@/components/CustomLabel';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { v4 as uuidv4 } from 'uuid';
import { useDealPipelineStagesDropdown } from './useDealPipelineStagesDropdown';

export const DealPipelineStagesDropdown = ({
  name,
  placeholder = 'Select Deal Stage',
  required,
  ...other
}: any): JSX.Element => {
  const {
    control,
    setValue,
    open,
    setOpen,
    data,
    isLoading,
    isFetching,
    onChanged,
    theme,
    triggerDebounce,
    trigger,
  } = useDealPipelineStagesDropdown();
  return (
    <Controller
      name={name}
      control={control}
      render={(form) => {
        return (
          <Autocomplete
            {...form?.field}
            limitTags={2}
            id={name}
            open={open}
            autoComplete
            includeInputInList
            noOptionsText="Nothing in the List"
            options={isLoading || isFetching ? [] : data ?? []}
            disableCloseOnSelect
            value={form?.field?.value || null}
            onOpen={() => {
              setOpen(true);
              trigger({ params: { meta: false } });
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={(option: any, newValue: any) =>
              option?.stages?.find((stage: any) => stage?._id === newValue?._id)
            }
            getOptionLabel={(option: any) => option?.name}
            loading={isLoading || isFetching}
            onChange={(e: React.SyntheticEvent, newValue: any) => {
              onChanged(e, newValue, form?.field?.onChange);
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
            onInputChange={(_, newInputValue) => {
              triggerDebounce?.cancel();
              triggerDebounce(newInputValue);
            }}
            renderOption={(_: any, option: any) => {
              return (
                <Accordion
                  disableGutters
                  key={uuidv4()}
                  sx={{
                    px: 1,
                    width: '100%',
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ArrowDropDownIcon
                        sx={{
                          fontSize: '30px',
                          color: theme?.palette?.custom?.steel_blue_alpha,
                        }}
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      padding: '0px',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ color: theme?.palette?.slateBlue?.main }}
                    >
                      {option?.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Divider sx={{ mb: 1 }} />
                    {option?.stages?.map((stage: any) => (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: '#F7F9FB',
                          padding: '10px',
                          borderRadius: '5px',
                          marginTop: '15px',
                          flexWrap: 'wrap',
                          cursor: 'pointer',
                        }}
                        key={uuidv4()}
                        onClick={() => {
                          setValue(name, stage);
                          setOpen(false);
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: '600' }}>
                          {stage?.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme?.palette?.grey[900] }}
                        >
                          Probability {stage?.probability}%
                        </Typography>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              );
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
                  size="small"
                  helperText={
                    <Typography
                      component={'span'}
                      sx={{ display: 'block', mt: -1, ml: -1 }}
                    >
                      {form?.fieldState?.error?.message}
                    </Typography>
                  }
                  variant="outlined"
                  InputProps={{
                    ...params?.InputProps,
                    endAdornment: (
                      <Fragment>
                        {isLoading || isFetching ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : (
                          <Search sx={{ color: 'inherit' }} />
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
};
