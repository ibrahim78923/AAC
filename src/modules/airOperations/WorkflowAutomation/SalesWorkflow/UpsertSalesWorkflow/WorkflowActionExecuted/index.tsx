import { Box, Button, Chip, Divider, Grid, Typography } from '@mui/material';
import { AddCircle, Delete } from '@mui/icons-material';
import { actionsExecutedFields } from './WorkflowActionExecuted.data';
import { salesValues } from '../UpsertSalesWorkflow.data';
import { useWorkflowActionExecuted } from './useWorkflowActionExecuted';

export const WorkflowActionExecuted = () => {
  const { append, fields, palette, handleDeleteClick } =
    useWorkflowActionExecuted();
  return (
    <Box
      border={`1px solid ${palette?.custom?.off_white_three}`}
      borderRadius={2}
      mt={2}
    >
      <Typography
        variant="h4"
        p={1.5}
        borderBottom={`1px solid ${palette?.custom?.off_white_three}`}
      >
        When action Should be executed
      </Typography>
      {fields?.map((item, index) => {
        return (
          <Box key={item?.id} px={1.5}>
            {index !== 0 && (
              <Divider
                sx={{
                  '&::before, &::after': {
                    borderColor: palette?.grey?.[700],
                  },
                }}
              >
                <Chip label={'AND'} />
              </Divider>
            )}
            <Box display={'flex'} alignItems={'center'} gap={1} pt={1.5}>
              <Grid container spacing={2}>
                {actionsExecutedFields?.map((item) => (
                  <Grid item xs={12} lg={item?.gridLength} key={item?._id}>
                    <item.component {...item?.componentProps} size="small" />
                  </Grid>
                ))}
              </Grid>
              <Delete
                sx={{ color: palette?.error?.main, cursor: 'pointer' }}
                onClick={() => handleDeleteClick?.(index)}
              />
            </Box>
          </Box>
        );
      })}
      <Box p={1.5}>
        <Button
          onClick={() => append(salesValues?.actionsExecuted)}
          color="secondary"
          startIcon={<AddCircle color="action" />}
        >
          Add Condition
        </Button>
      </Box>
    </Box>
  );
};
