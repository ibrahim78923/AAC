import { Box, Button, Chip, Divider, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddCircle } from '@mui/icons-material';
import { workflowConditionsDataArray } from '../WorkflowConditions.data';
import { useSubWorkflowConditions } from './useSubWorkflowConditions';
import { WORKFLOW_CONDITION_TYPE } from '@/constants/strings';

export const SubWorkflowConditions = (props: any) => {
  const { index, conditionType, watch } = props;
  const {
    handleAppend,
    fields,
    handleDeleteClick,
    dealDropdown,
    contactDropdown,
    stagesDropdown,
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
                    conditionType?.value === WORKFLOW_CONDITION_TYPE?.AND
                      ? WORKFLOW_CONDITION_TYPE?.AND
                      : WORKFLOW_CONDITION_TYPE?.OR
                  }
                />
              </Divider>
            )}
            <Box pt={1} display={'flex'} alignItems={'center'} gap={1}>
              <Grid container spacing={2}>
                {workflowConditionsDataArray(
                  index,
                  subIndex,
                  watch,
                  dealDropdown,
                  contactDropdown,
                  stagesDropdown,
                )?.map((item) => (
                  <Grid item xs={12} lg={item?.gridLength} key={item?._id}>
                    <item.component {...item?.componentProps} />
                  </Grid>
                ))}
              </Grid>
              <Box>
                <DeleteIcon
                  sx={{ color: 'error.main', cursor: 'pointer' }}
                  onClick={() => handleDeleteClick?.(subIndex)}
                />
              </Box>
            </Box>
          </Box>
        );
      })}
      <Button
        onClick={handleAppend}
        color="secondary"
        startIcon={<AddCircle color="action" />}
      >
        Add Condition
      </Button>
    </>
  );
};
