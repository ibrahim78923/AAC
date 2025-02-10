import { Box, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddCircle } from '@mui/icons-material';
import { workflowConditionsDataArray } from '../WorkflowConditions.data';
import { useSubWorkflowConditions } from './useSubWorkflowConditions';
import { WORKFLOW_CONDITION_TYPE } from '@/constants/strings';
import { SubWorkflowConditionsI } from './SubWorkflowConditions.interface';
import { CustomChip } from '@/components/Chip/CustomChip';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const SubWorkflowConditions = (props: SubWorkflowConditionsI) => {
  const { index, conditionType, watch } = props;
  const {
    handleAppend,
    fields,
    handleDeleteClick,
    dealDropdown,
    adminUserDropdown,
    setFieldNameOnChange,
    setConditionFieldOnChange,
    watchFieldName,
  } = useSubWorkflowConditions(props);
  return (
    <>
      {fields?.map((item, subIndex) => {
        const fieldLength = workflowConditionsDataArray(
          index,
          subIndex,
          watch,
          dealDropdown,
          adminUserDropdown,
          setFieldNameOnChange,
          setConditionFieldOnChange,
          watchFieldName,
        )?.find((item) => item?.component === Box);
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
                  label={conditionType?.value ?? WORKFLOW_CONDITION_TYPE?.OR}
                  color="default"
                  size="medium"
                />
              </Divider>
            )}
            <Box pt={1} display={'flex'} alignItems={'center'} gap={1}>
              <ContainerGrid>
                {workflowConditionsDataArray(
                  index,
                  subIndex,
                  watch,
                  dealDropdown,
                  adminUserDropdown,
                  setFieldNameOnChange,
                  setConditionFieldOnChange,
                  watchFieldName,
                )?.map((item) => (
                  <CustomGrid
                    lg={fieldLength ? 6 : item?.gridLength}
                    key={item?._id}
                    customStyles={{
                      display: item?.component === Box ? 'none' : 'block',
                    }}
                  >
                    <item.component {...item?.componentProps} />
                  </CustomGrid>
                ))}
              </ContainerGrid>
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
        className="small"
        startIcon={<AddCircle color="action" />}
      >
        Add Condition
      </Button>
    </>
  );
};
