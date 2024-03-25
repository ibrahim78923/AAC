import { Grid, Typography } from '@mui/material';
import { RHFAutocomplete, RHFRadioGroup } from '@/components/ReactHookForm';
import {
  andRunOptions,
  moduleOptions,
  triggerOptions,
} from './WorkflowRunAndTrigger.data';

export const WorkflowRunAndTrigger = (props: any) => {
  const { register, palette } = props;
  return (
    <>
      <Grid
        item
        xs={12}
        mt={1}
        border={`1px solid ${palette?.custom?.off_white_three}`}
        borderRadius={2}
      >
        <Typography
          variant="h4"
          p={1.5}
          borderBottom={`1px solid ${palette?.custom?.off_white_three}`}
        >
          Run this workflow for
        </Typography>
        <Grid item lg={8} p={1.5}>
          <RHFRadioGroup
            label={<Typography variant="h5">Module</Typography>}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
            name="module"
            options={moduleOptions}
            inputRef={register}
          />
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        border={`1px solid ${palette?.custom?.off_white_three}`}
        borderRadius={2}
        my={2}
      >
        <Typography
          variant="h4"
          p={1.5}
          borderBottom={`1px solid ${palette?.custom?.off_white_three}`}
        >
          When to Trigger this workflow?
        </Typography>
        <Grid container p={1.5} spacing={2}>
          <Grid item md={6} xs={12}>
            <RHFAutocomplete
              name="events"
              size="small"
              label="Trigger"
              required
              options={triggerOptions}
              placeholder="Select"
              getOptionLabel={(option: any) => option?.label}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <RHFAutocomplete
              name="runType"
              size="small"
              label="And Run"
              placeholder="Select"
              required
              options={andRunOptions}
              getOptionLabel={(option: any) => option?.label}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
