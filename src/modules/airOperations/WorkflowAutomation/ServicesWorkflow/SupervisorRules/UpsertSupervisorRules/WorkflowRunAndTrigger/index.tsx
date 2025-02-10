import { Box, Palette, Typography } from '@mui/material';
import { RHFAutocomplete } from '@/components/ReactHookForm';
import { andRunOptions } from '../UpsertRulesWorkflow.data';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

export const WorkflowRunAndTrigger = ({ palette }: { palette: Palette }) => {
  return (
    <>
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
        <ContainerGrid customStyles={{ p: 1.5 }}>
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
