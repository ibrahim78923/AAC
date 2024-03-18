import { Box, Button, Chip, Divider, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddCircle } from '@mui/icons-material';
import { conditionTypeOptions } from '../WorkflowConditions.data';
import { eventBasedWorkflowValues } from '../../UpsertEventBasedWorkflow.data';
import { useSubWorkflowConditions } from './useSubWorkflowConditions';
import { RHFAutocomplete } from '@/components/ReactHookForm';
import { fieldOptions, statusOptions } from './SubWorkflowConditions.data';

export const SubWorkflowConditions = (props: any) => {
  const { index, conditionType } = props;
  const {
    append,
    fields,
    handleDeleteClick,
    conditionOption,
    ticketsFieldsOptions,
  } = useSubWorkflowConditions(props);
  return (
    <>
      {fields?.map((item, subIndex) => {
        return (
          <Box key={item?.id}>
            {subIndex !== 0 && (
              <Divider
                sx={{
                  '&::before, &::after': {
                    borderColor: 'grey.700',
                  },
                }}
              >
                <Chip
                  label={
                    conditionType === conditionTypeOptions?.[0] ? 'AND' : 'OR'
                  }
                />
              </Divider>
            )}
            <Box pt={1} display={'flex'} alignItems={'center'} gap={1}>
              <>
                <Grid container spacing={1}>
                  <Grid item md={3}>
                    <RHFAutocomplete
                      name="options"
                      size="small"
                      placeholder="Select"
                      options={Object.keys(conditionOption)}
                    />
                  </Grid>
                  <>
                    <Grid item md={3}>
                      <RHFAutocomplete
                        name={`groups.${index}.conditions.${index}.key`}
                        size="small"
                        placeholder="Select"
                        options={ticketsFieldsOptions}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <RHFAutocomplete
                        name={`groups.${index}.conditions.${index}.condition`}
                        size="small"
                        placeholder="Select"
                        options={fieldOptions}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <RHFAutocomplete
                        name={`groups.${index}.conditions.${index}.value`}
                        size="small"
                        placeholder="Select"
                        options={statusOptions}
                      />
                    </Grid>
                  </>
                </Grid>
              </>
              <DeleteIcon
                sx={{ color: 'error.main', cursor: 'pointer' }}
                onClick={() => handleDeleteClick?.(subIndex)}
              />
            </Box>
          </Box>
        );
      })}
      <Button
        onClick={() =>
          append(eventBasedWorkflowValues?.groups?.[0]?.conditions)
        }
        color="secondary"
        startIcon={<AddCircle color="action" />}
      >
        Add Condition
      </Button>
    </>
  );
};
