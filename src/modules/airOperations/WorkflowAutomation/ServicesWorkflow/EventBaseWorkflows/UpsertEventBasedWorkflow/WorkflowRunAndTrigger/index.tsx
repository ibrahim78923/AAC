import { Box, Palette, Typography } from '@mui/material';
import { RHFAutocomplete, RHFRadioGroup } from '@/components/ReactHookForm';
import {
  andRunOptions,
  eventOptions,
  moduleOptions,
} from '../UpsertEventBasedWorkflow.data';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

export const WorkflowRunAndTrigger = ({ palette }: { palette: Palette }) => {
  return (
    <>
      <CustomGrid
        customStyles={{
          mt: 1,
          border: `1px solid ${palette?.custom?.off_white_three}`,
          borderRadius: 2,
        }}
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
          <CustomGrid lg={8} customStyles={{ p: 1.5 }}>
            <RHFRadioGroup
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
              name="module"
              options={moduleOptions}
            />
          </CustomGrid>
        </Box>
      </CustomGrid>
      <CustomGrid
        customStyles={{
          border: `1px solid ${palette?.custom?.off_white_three}`,
          borderRadius: 2,
          my: 2,
        }}
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
        <ContainerGrid
          customStyles={{
            p: 1.5,
          }}
        >
          <CustomGrid md={6} xs={10}>
            <RHFAutocomplete
              name="events"
              size="small"
              placeholder="Select"
              required
              label="Event"
              options={eventOptions}
              getOptionLabel={({ label }: { label: string }) => label}
            />
          </CustomGrid>
          <CustomGrid md={6} customStyles={{ p: 1.5 }}>
            <RHFAutocomplete
              name="runType"
              size="small"
              placeholder="Select"
              label="And Run"
              required
              options={andRunOptions}
              getOptionLabel={({ label }: { label: string }) => label}
            />
          </CustomGrid>
        </ContainerGrid>
      </CustomGrid>
    </>
  );
};
