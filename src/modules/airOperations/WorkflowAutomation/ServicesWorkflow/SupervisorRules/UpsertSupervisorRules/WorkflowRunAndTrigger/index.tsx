import { Box, Grid, Typography } from '@mui/material';
import { RHFAutocomplete } from '@/components/ReactHookForm';
import { andRunOptions, eventOptions } from '../UpsertRulesWorkflow.data';

export const WorkflowRunAndTrigger = (props: any) => {
  const { palette } = props;
  return (
    <>
      <Grid
        item
        xs={12}
        border={`1px solid ${palette?.custom?.off_white_three}`}
        borderRadius={2}
        my={2}
      >
        <Box
          sx={{
            backgroundColor: palette?.primary?.light,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        >
          <Typography
            variant="h4"
            p={1.5}
            borderBottom={`1px solid ${palette?.custom?.off_white_three}`}
          >
            When to Trigger this workflow?
          </Typography>
        </Box>
        <Grid container p={1.5} spacing={2}>
          <Grid item md={6} xs={10}>
            <RHFAutocomplete
              name="events"
              size="small"
              placeholder="Select"
              required
              // multiple
              label="Event"
              options={eventOptions}
              getOptionLabel={({ label }: { label: string }) => label}
            />
          </Grid>
          <Grid item md={6} xs={12} p={1.5}>
            <RHFAutocomplete
              name="runType"
              size="small"
              placeholder="Select"
              label="And Run"
              required
              options={andRunOptions}
              getOptionLabel={({ label }: { label: string }) => label}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
