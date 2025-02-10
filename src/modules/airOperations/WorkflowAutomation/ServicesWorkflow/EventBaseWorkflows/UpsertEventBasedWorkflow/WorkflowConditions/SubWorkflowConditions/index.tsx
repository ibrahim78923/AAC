import { Box, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddCircle } from '@mui/icons-material';
import { useSubWorkflowConditions } from './useSubWorkflowConditions';
import { subWorkflowData } from './SubWorkflowConditions.data';
import { LOGICS } from '@/constants/strings';
import { CustomChip } from '@/components/Chip/CustomChip';
import { FormGrid } from '@/components/Grids/FormGrid';

export const SubWorkflowConditions = (props: any) => {
  const { index, conditionType, watch, setValue } = props;
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
                <CustomChip
                  label={
                    conditionType?.value === LOGICS?.AND
                      ? LOGICS?.AND
                      : LOGICS?.OR
                  }
                  color="default"
                  size="medium"
                />
              </Divider>
            )}
            <Box pt={1} display={'flex'} alignItems={'center'} gap={1}>
              <FormGrid
                formFieldsList={subWorkflowData({
                  index,
                  subIndex,
                  watch,
                  setValue,
                  agentApiQuery,
                  departmentApiQuery,
                  requestersApiQuery,
                  apiQueryLocations,
                  apiAssetType,
                  apiUsersListDropdown,
                  productId,
                })}
                spacing={1}
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
