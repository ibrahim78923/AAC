import { Box, Button, Chip, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddCircle } from '@mui/icons-material';
import { useFieldArray } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { conditionTypeOptions } from '../CreateRuleConditions.data';
import { defaultValues } from '../../CreateRules.data';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import WorkflowConditionsFields from './WorkflowConditions';

export const SubWorkflowConditions = (props: any) => {
  const {
    control,
    index,
    removeParent,
    conditionType,
    parentField,
    watch,
    register,
    setValue,
  } = props;
  const { fields, remove, append } = useFieldArray({
    control,
    name: `workflowConditions.${index}.conditions`,
  });
  return (
    <>
      {fields.map((item, subIndex) => {
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
                    conditionType === conditionTypeOptions[0] ? 'AND' : 'OR'
                  }
                />
              </Divider>
            )}
            <Box pt={1} display={'flex'} alignItems={'center'} gap={1}>
              <WorkflowConditionsFields
                index={index}
                subIndex={subIndex}
                register={register}
                watch={watch}
                setValue={setValue}
              />
              <DeleteIcon
                sx={{ color: 'error.main', cursor: 'pointer' }}
                onClick={() => {
                  if (parentField?.length === 1 && fields?.length === 1) {
                    enqueueSnackbar('Cannot Delete', {
                      variant: NOTISTACK_VARIANTS?.ERROR,
                    });
                    return;
                  }
                  if (fields?.length > 1) {
                    remove(subIndex);
                  }
                  if (parentField?.length >= 1 && fields?.length === 1) {
                    removeParent(index);
                  }
                }}
              />
            </Box>
          </Box>
        );
      })}
      <Button
        onClick={() => append(defaultValues?.workflowConditions[0]?.conditions)}
        color="secondary"
        startIcon={<AddCircle color="action" />}
      >
        Add Condition
      </Button>
    </>
  );
};
