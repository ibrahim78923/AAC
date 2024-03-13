import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { AddCircle, Delete } from '@mui/icons-material';
import { actionsData } from './WorkflowActionExecuted.data';
import { useFieldArray } from 'react-hook-form';

export const WorkflowActionExecuted = () => {
  const { fields, append, remove } = useFieldArray({
    name: 'actions',
  });
  const theme = useTheme();
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
      {fields?.length === 0 ? (
        <Box
          p={2}
          display={'flex'}
          alignItems={'center'}
          gap={1}
          borderBottom={`1px solid ${theme?.palette?.custom?.off_white_three}`}
        >
          <Grid container spacing={2}>
            {actionsData?.map((item: any) => (
              <Grid item xs={12} lg={item?.gridLength} key={item?._id}>
                <item.component
                  {...item?.componentProps}
                  name={`actions[0].${item?.componentProps?.name}`}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        fields?.map((field, index) => (
          <Box
            key={field?.id}
            pt={1}
            display={'flex'}
            alignItems={'center'}
            borderBottom={`1px solid ${theme?.palette?.custom?.off_white_three}`}
            gap={1}
          >
            <Grid container spacing={2}>
              {actionsData?.map((item: any) => (
                <Grid item xs={12} lg={item?.gridLength} key={item?._id}>
                  <item.component
                    {...item?.componentProps}
                    {...field}
                    name={`actions[${index}].${item?.componentProps?.name}`}
                  />
                </Grid>
              ))}
            </Grid>
            <Delete
              onClick={() => remove(index)}
              sx={{ color: 'error.main', cursor: 'pointer' }}
            />
          </Box>
        ))
      )}
      <Button
        color="secondary"
        onClick={() => append({})}
        startIcon={<AddCircle color="action" />}
      >
        Add Condition
      </Button>
    </Box>
  );
};
