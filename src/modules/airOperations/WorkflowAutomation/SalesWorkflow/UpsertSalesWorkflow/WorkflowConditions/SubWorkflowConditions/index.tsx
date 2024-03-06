import { Box, Button, Chip, Divider, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddCircle } from '@mui/icons-material';
import {
  conditionTypeOptions,
  workflowConditionsDataArray,
} from '../WorkflowConditions.data';
import { useSubWorkflowConditions } from './useSubWorkflowConditions';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS } from '@/constants/permission-keys';

export const SubWorkflowConditions = (props: any) => {
  const { moduleType, index, conditionType } = props;
  const { handleAppend, fields, handleDeleteClick } =
    useSubWorkflowConditions(props);
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
              <Grid container spacing={2}>
                {workflowConditionsDataArray(moduleType, index, subIndex)?.map(
                  (item) => (
                    <Grid item xs={12} lg={item?.gridLength} key={item?._id}>
                      <item.component {...item?.componentProps} />
                    </Grid>
                  ),
                )}
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
      <PermissionsGuard
        permissions={[
          AIR_OPERATIONS_WORKFLOWS_SALES_WORKFLOW_PERMISSIONS?.ADD_CONDITION,
        ]}
      >
        <Button
          onClick={handleAppend}
          color="secondary"
          startIcon={<AddCircle color="action" />}
        >
          Add Condition
        </Button>
      </PermissionsGuard>
    </>
  );
};
