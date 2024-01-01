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
        <Grid lg={8} p={1.5}>
          <RHFRadioGroup
            label={<Typography variant="h5">Module</Typography>}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
            name="moduleType"
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
              name="trigger"
              size="small"
              label="Trigger"
              required
              options={triggerOptions}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <RHFAutocomplete
              name="andRun"
              size="small"
              label="And Run"
              required
              options={andRunOptions}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
