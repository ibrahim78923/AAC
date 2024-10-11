import { Box, Button, Chip, Divider, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddCircle } from '@mui/icons-material';
import { useSubWorkflowConditions } from './useSubWorkflowConditions';
import { subWorkflowData } from './SubWorkflowConditions.data';
import { LOGICS } from '@/constants/strings';

export const SubWorkflowConditions = (props: any) => {
  const { index, conditionType, watch } = props;
  const {
    append,
    fields,
    handleDeleteClick,
    agentApiQuery,
    departmentApiQuery,
    requestersApiQuery,
    apiQueryLocations,
    apiAssetType,
    apiUsersListDropdown,
    productId,
  } = useSubWorkflowConditions(props);
  return (
    <>
      {fields?.map((item: any, subIndex: any) => {
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
                    conditionType?.value === LOGICS?.AND
                      ? LOGICS?.AND
                      : LOGICS?.OR
                  }
                />
              </Divider>
            )}
            <Box pt={1} display={'flex'} alignItems={'center'} gap={1}>
              <>
                <Grid container spacing={1}>
                  {subWorkflowData({
                    index,
                    subIndex,
                    watch,
                    agentApiQuery,
                    departmentApiQuery,
                    requestersApiQuery,
                    apiQueryLocations,
                    apiAssetType,
                    apiUsersListDropdown,
                    productId,
                  })?.map((item: any) => (
                    <Grid item xs={12} md={item?.gridLength} key={item?._id}>
                      <item.component {...item?.componentProps} />
                    </Grid>
                  ))}
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
          append({
            options: '',
            fieldName: null,
            condition: '',
            fieldValue: null,
          })
        }
        color="secondary"
        startIcon={<AddCircle color="action" />}
      >
        Add Condition
      </Button>
    </>
  );
};
