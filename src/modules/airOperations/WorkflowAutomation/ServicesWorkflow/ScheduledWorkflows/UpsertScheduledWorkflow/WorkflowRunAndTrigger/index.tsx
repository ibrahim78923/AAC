import { Box, Grid, Palette, Typography } from '@mui/material';
import { RHFAutocomplete, RHFRadioGroup } from '@/components/ReactHookForm';
import { andRunOptions, moduleOptions } from '../UpsertScheduledWorkflow.data';

export const WorkflowRunAndTrigger = ({ palette }: { palette: Palette }) => {
  return (
    <>
      <Grid
        item
        xs={12}
        mt={1}
        border={`1px solid ${palette?.custom?.off_white_three}`}
        borderRadius={2}
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
            Module
          </Typography>
        </Box>
        <Box>
          <Grid item lg={8} p={1.5}>
            <RHFRadioGroup
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
              name="module"
              options={moduleOptions}
            />
          </Grid>
        </Box>
      </Grid>
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
