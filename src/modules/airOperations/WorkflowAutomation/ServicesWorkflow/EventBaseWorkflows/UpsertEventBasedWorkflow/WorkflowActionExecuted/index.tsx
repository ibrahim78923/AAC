import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { AddCircle, Delete as DeleteIcon } from '@mui/icons-material';
import { actionsData } from './WorkflowActionExecuted.data';
import { useFieldArray } from 'react-hook-form';
import { errorSnackbar } from '@/utils/api';
import { useLazyGetAgentsQuery } from '@/services/dropdowns';
import {
  useLazyGetCategoriesDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
} from '@/services/airServices/tickets';

export const WorkflowActionExecuted = ({ watch, setValue }: any) => {
  const { fields, append, remove } = useFieldArray({
    name: 'actions',
  });
  const theme = useTheme();

  const handleDelete = (index: number) => {
    if (fields?.length === 1) {
      errorSnackbar('Cannot Delete');
    } else {
      remove(index);
    }
  };
  const agentApiQuery = useLazyGetAgentsQuery();
  const departmentApiQuery = useLazyGetDepartmentDropdownQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownQuery();
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
        <Box key={item?._id} display={'flex'} p={2}>
          <Grid container spacing={1}>
            {actionsData({
              index,
              watch,
              setValue,
              agentApiQuery,
              departmentApiQuery,
              apiQueryCategories,
            })?.map((actionItem: any) => (
              <Grid
                item
                xs={12}
                md={actionItem?.gridLength}
                key={actionItem?._id}
              >
                <actionItem.component {...actionItem?.componentProps} />
              </Grid>
            ))}
          </Grid>
          <DeleteIcon
            sx={{ color: 'error.main', cursor: 'pointer' }}
            onClick={() => handleDelete(index)}
          />
        </Box>
      ))}
      <Box px={1}>
        <Button
          color="secondary"
          onClick={() => append({ key: '', value: null })}
          startIcon={<AddCircle color="action" />}
        >
          Add Condition
        </Button>
      </Box>
    </Box>
  );
};
