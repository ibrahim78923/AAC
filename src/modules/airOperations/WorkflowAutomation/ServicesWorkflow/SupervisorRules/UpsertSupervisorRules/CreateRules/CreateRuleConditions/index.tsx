import { Box, Grid, ToggleButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import { RHFButtonGroup } from '@/components/ReactHookForm';
import { useFieldArray } from 'react-hook-form';
import { workflowConditionsGroupDataArray } from './CreateRuleConditions.data';
import { SubWorkflowConditions } from './SubWorkflowConditions';
import { styles } from './CreateRulesConditions.style';

const CreateRuleConditions = (props: any) => {
  const theme = useTheme();
  const { moduleType, control, watch, register, setValue } = props;
  const { fields, remove } = useFieldArray({
    control,
    name: 'workflowConditions',
  });
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
          What Conditions should be met?
        </Typography>
      </Box>
      {fields.map((item, index) => {
        const conditionType = watch(
          `workflowConditions.${index}.conditionType`,
        );
        return (
          <Box key={item?.id} p={1.5}>
            <Box
              alignItems={'center'}
              justifyContent={'center'}
              display={'flex'}
              mb={1}
            >
              {index !== 0 && (
                <RHFButtonGroup
                  name={`workflowConditions.${index}.logicGate`}
                  sx={{ gap: 0 }}
                >
                  <ToggleButton value={'and'} sx={styles?.logicAndButtons}>
                    AND
                  </ToggleButton>
                  <ToggleButton value={'or'} sx={styles?.logicOrButtons}>
                    OR
                  </ToggleButton>
                </RHFButtonGroup>
              )}
            </Box>
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <Grid container spacing={{ md: 2, xs: 0 }}>
                {workflowConditionsGroupDataArray(index)?.map((item: any) => (
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
    </Box>
  );
};

export default CreateRuleConditions;
