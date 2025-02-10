import { Box, Button, Typography } from '@mui/material';
import { AddCircle, Delete as DeleteIcon } from '@mui/icons-material';
import { actionsData } from './WorkflowActionExecuted.data';
import { useWorkflowActionExecuted } from './useWorkflowActionExecuted';
import { FormGrid } from '@/components/Grids/FormGrid';

export const WorkflowActionExecuted = (props: any) => {
  const { watch, setValue } = props;
  const {
    fields,
    append,
    theme,
    handleDelete,
    agentApiQuery,
    departmentApiQuery,
    apiQueryCategories,
    apiQueryLocations,
    apiUsersListDropdown,
    productId,
    apiAssetType,
  } = useWorkflowActionExecuted(props);

  return (
    <Box
      border={`1px solid ${theme?.palette?.custom?.off_white_three}`}
      borderRadius={2}
    >
      <Box
        sx={{
          backgroundColor: theme?.palette?.primary?.light,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          p={1.5}
          borderBottom={`1px solid ${theme?.palette?.custom?.off_white_three}`}
        >
          Actions
        </Typography>
      </Box>
      {fields?.map((item: any, index: number) => (
        <Box key={item?.id} display={'flex'} p={2}>
          <FormGrid
            formFieldsList={actionsData({
              index,
              watch,
              setValue,
              agentApiQuery,
              departmentApiQuery,
              apiQueryCategories,
              apiQueryLocations,
              apiUsersListDropdown,
              productId,
              apiAssetType,
            })}
            spacing={1}
          />
          <DeleteIcon
            sx={{ color: 'error.main', cursor: 'pointer' }}
            onClick={() => handleDelete(index)}
          />
        </Box>
      ))}
      <Box px={1}>
        <Button
          color="secondary"
          onClick={() => append({ fieldName: null, fieldValue: null })}
          startIcon={<AddCircle color="action" />}
        >
          Add Condition
        </Button>
      </Box>
    </Box>
  );
};
