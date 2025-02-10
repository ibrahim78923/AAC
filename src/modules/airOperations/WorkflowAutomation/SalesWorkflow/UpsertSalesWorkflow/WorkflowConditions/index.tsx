import { workflowConditionsGroupDataArray } from './WorkflowConditions.data';
import { Box, Button, ToggleButton, Typography } from '@mui/material';
import { SubWorkflowConditions } from './SubWorkflowConditions';
import { AddCircle } from '@mui/icons-material';
import { RHFButtonGroup } from '@/components/ReactHookForm';
import { styles } from './WorkflowConditions.style';
import { useWorkflowConditions } from './useWorkflowConditions';
import { WorkflowConditionsI } from './WorkflowConditions.interface';
import { FormGrid } from '@/components/Grids/FormGrid';

export const WorkflowConditions = (props: WorkflowConditionsI) => {
  const { setValue, control, watch } = props;
  const { fields, remove, palette, handleAddGroup } =
    useWorkflowConditions(props);
  return (
    <Box
      border={`1px solid ${palette?.custom?.off_white_three}`}
      borderRadius={2}
    >
      <Typography
        variant="h4"
        p={1.5}
        borderBottom={`1px solid ${palette?.custom?.off_white_three}`}
      >
        What Conditions should be met?
      </Typography>
      {fields?.map((item, index) => {
        const conditionType = watch(`groups.${index}.conditionType`);
        return (
          <Box key={item?.id} p={1.5}>
            {index !== 0 && (
              <Box sx={styles?.logicBtnContainer(palette)}>
                <RHFButtonGroup name="groupCondition" sx={{ gap: 0 }}>
                  <ToggleButton
                    value={'AND'}
                    sx={styles?.logicAndButtons(palette)}
                  >
                    AND
                  </ToggleButton>
                  <ToggleButton
                    value={'OR'}
                    sx={styles?.logicOrButtons(palette)}
                  >
                    OR
                  </ToggleButton>
                </RHFButtonGroup>
              </Box>
            )}
            <Box display={{ sm: 'flex' }} alignItems={'center'} gap={1} mt={2}>
              <Box sx={styles?.groupNumber(palette)}>0{index + 1}</Box>
              <FormGrid
                formFieldsList={workflowConditionsGroupDataArray(index)}
                spacing={{ md: 2, xs: 0 }}
              />
            </Box>
            <SubWorkflowConditions
              setValue={setValue}
              control={control}
              index={index}
              removeParent={remove}
              conditionType={conditionType}
              parentField={fields}
              watch={watch}
            />
          </Box>
        );
      })}
      <Box display={'flex'} justifyContent={'end'} p={1.5}>
        <Button
          variant="contained"
          className="small"
          startIcon={<AddCircle />}
          onClick={handleAddGroup}
        >
          Add Group
        </Button>
      </Box>
    </Box>
  );
};
