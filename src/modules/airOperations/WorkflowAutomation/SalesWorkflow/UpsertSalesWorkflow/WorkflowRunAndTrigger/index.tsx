import { Typography } from '@mui/material';
import { RHFAutocomplete, RHFRadioGroup } from '@/components/ReactHookForm';
import {
  andRunOptions,
  moduleOptions,
  triggerOptions,
  workflowType,
} from './WorkflowRunAndTrigger.data';
import {
  WorkflowDropdownI,
  WorkflowRunAndTriggerI,
} from './WorkflowRunAndTrigger.interface';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

export const WorkflowRunAndTrigger = (props: WorkflowRunAndTriggerI) => {
  const { palette, watch } = props;
  const watchType = watch('type');
  return (
    <>
      <CustomGrid
        customStyles={{
          mt: 1,
          border: `1px solid ${palette?.custom?.off_white_three}`,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          p={1.5}
          borderBottom={`1px solid ${palette?.custom?.off_white_three}`}
        >
          Run this workflow for
        </Typography>
        <CustomGrid lg={8} customStyles={{ p: 1.5 }}>
          <RHFRadioGroup
            label={<Typography variant="formTopHeading">Module</Typography>}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
            name="module"
            options={moduleOptions}
          />
        </CustomGrid>
      </CustomGrid>
      <CustomGrid
        customStyles={{
          border: `1px solid ${palette?.custom?.off_white_three}`,
          borderRadius: 2,
          my: 2,
        }}
      >
        <Typography
          variant="h4"
          p={1.5}
          borderBottom={`1px solid ${palette?.custom?.off_white_three}`}
        >
          When to Trigger this workflow?
        </Typography>
        <ContainerGrid customStyles={{ p: 1.5 }}>
          {watchType === workflowType?.EVENT_BASE && (
            <CustomGrid md={6}>
              <RHFAutocomplete
                name="events"
                size="small"
                label="Trigger"
                required
                options={triggerOptions}
                placeholder="Select Trigger"
                getOptionLabel={(option: WorkflowDropdownI) => option?.label}
              />
            </CustomGrid>
          )}
          <CustomGrid md={6}>
            <RHFAutocomplete
              name="runType"
              size="small"
              label="And Run"
              placeholder="Select Run Type"
              required
              options={andRunOptions}
              getOptionLabel={(option: WorkflowDropdownI) => option?.label}
            />
          </CustomGrid>
        </ContainerGrid>
      </CustomGrid>
    </>
  );
};
