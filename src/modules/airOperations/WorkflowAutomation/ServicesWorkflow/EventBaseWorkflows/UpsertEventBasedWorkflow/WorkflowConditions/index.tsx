import { workflowConditionsGroupDataArray } from './WorkflowConditions.data';
import { Box, Button, Grid, ToggleButton, Typography } from '@mui/material';
import { SubWorkflowConditions } from './SubWorkflowConditions';
import { AddCircle } from '@mui/icons-material';
import { RHFButtonGroup } from '@/components/ReactHookForm';
import { styles } from './WorkflowConditions.style';
import { useWorkflowConditions } from './useWorkflowConditions';

export const WorkflowConditions = (props: any) => {
  const { moduleType, control, watch, register, setValue } = props;
  const { fields, remove, palette, handleAddGroup } =
    useWorkflowConditions(props);
  return (
    <Box
      border={`1px solid ${palette?.custom?.off_white_three}`}
      borderRadius={2}
    >
      <Box
        sx={{
          backgroundColor: palette?.primary?.light,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          p={1.5}
          borderBottom={`1px solid ${palette?.custom?.off_white_three}`}
        >
          What Conditions should be met?
        </Typography>
      </Box>
      {fields?.map((item, index) => {
        const conditionType = watch(`groups.${index}.conditionType`);
        return (
          <Box key={item?.id} p={1.5}>
            {index !== 0 && (
              <Box sx={styles?.logicBtnContainer(palette)}>
                <RHFButtonGroup
                  name={`groups.${index}.logicGate`}
                  sx={{ gap: 0 }}
                >
                  <ToggleButton
                    value={'and'}
                    sx={styles?.logicAndButtons(palette)}
                  >
                    AND
                  </ToggleButton>
                  <ToggleButton
                    value={'or'}
                    sx={styles?.logicOrButtons(palette)}
                  >
                    OR
                  </ToggleButton>
                </RHFButtonGroup>
              </Box>
            )}
            <Box display={'flex'} alignItems={'center'} gap={1} mt={2}>
              <Box sx={styles?.groupNumber(palette)}>{index + 1}</Box>
              <Grid container spacing={{ md: 2, xs: 0 }}>
                {workflowConditionsGroupDataArray(index)?.map((item) => (
                  <Grid item xs={12} md={item?.gridLength} key={item?._id}>
                    <item.component {...item?.componentProps} />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <SubWorkflowConditions
              moduleType={moduleType}
              control={control}
              index={index}
              removeParent={remove}
              conditionType={conditionType}
              parentField={fields}
              watch={watch}
              register={register}
              setValue={setValue}
            />
          </Box>
        );
      })}
      <Box display={'flex'} justifyContent={'end'} p={1.5}>
        <Button
          variant="contained"
          startIcon={<AddCircle />}
          onClick={handleAddGroup}
        >
          Add Group
        </Button>
      </Box>
    </Box>
  );
};
