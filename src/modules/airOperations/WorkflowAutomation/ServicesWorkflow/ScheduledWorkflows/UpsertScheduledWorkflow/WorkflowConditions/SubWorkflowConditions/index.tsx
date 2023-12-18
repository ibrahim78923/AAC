import { Box, Button, Chip, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddCircle } from '@mui/icons-material';
import { conditionTypeOptions } from '../WorkflowConditions.data';
import { scheduledWorkflowValues } from '../../UpsertScheduledWorkflow.data';
import { useSubWorkflowConditions } from './useSubWorkflowConditions';
import WorkflowConditionsFields from './WorkflowConditions';

export const SubWorkflowConditions = (props: any) => {
  const { index, conditionType, setValue, watch, register } = props;
  const { append, fields, handleDeleteClick } = useSubWorkflowConditions(props);
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
              <WorkflowConditionsFields
                index={index}
                subIndex={subIndex}
                register={register}
                watch={watch}
                setValue={setValue}
              />
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
          append(scheduledWorkflowValues?.workflowConditions?.[0]?.conditions)
        }
        color="secondary"
        startIcon={<AddCircle color="action" />}
      >
        Add Condition
      </Button>
    </>
  );
};
