import { Box, Button, Chip, Divider, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddCircle } from '@mui/icons-material';
import { conditionTypeOptions } from '../WorkflowConditions.data';
import { eventBasedWorkflowValues } from '../../UpsertEventBasedWorkflow.data';
import { useSubWorkflowConditions } from './useSubWorkflowConditions';
import { RHFAutocomplete } from '@/components/ReactHookForm';
import {
  conditionOptions,
  fieldOptions,
  statusOptions,
} from './SubWorkflowConditions.data';

export const SubWorkflowConditions = (props: any) => {
  const { index, conditionType, register } = props;
  const { append, fields, handleDeleteClick, schemaKeysData } =
    useSubWorkflowConditions(props);
  return (
    <>
      {fields?.map((item, subIndex) => {
        // const groups = watch(
        //   `groups.${index}.nestedArray.${subIndex}.condition1`,
        // );
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
                    conditionType === conditionTypeOptions?.[0] ? 'AND' : 'OR'
                  }
                />
              </Divider>
            )}
            <Box pt={1} display={'flex'} alignItems={'center'} gap={1}>
              <>
                <Grid container spacing={1}>
                  <Grid item md={3}>
                    <RHFAutocomplete
                      name={`groups.${index}.nestedArray.${subIndex}.condition1`}
                      size="small"
                      placeholder="Select"
                      options={conditionOptions}
                      inputRef={register}
                    />
                  </Grid>
                  {/* {groups === TICKET_FIELDS && ( */}
                  <>
                    <Grid item md={3}>
                      <RHFAutocomplete
                        name={`groups.${index}.conditions.${index}.key`}
                        size="small"
                        placeholder="Select"
                        options={schemaKeysData}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <RHFAutocomplete
                        name={`groups.${index}.conditions.${index}.condition`}
                        size="small"
                        placeholder="Select"
                        options={fieldOptions}
                      />
                    </Grid>
                    <Grid item md={3}>
                      <RHFAutocomplete
                        name={`groups.${index}.conditions.${index}.value`}
                        size="small"
                        placeholder="Select"
                        options={statusOptions}
                      />
                    </Grid>
                  </>
                  {/* )} */}
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
          append(eventBasedWorkflowValues?.groups?.[0]?.conditions)
        }
        color="secondary"
        startIcon={<AddCircle color="action" />}
      >
        Add Condition
      </Button>
    </>
  );
};
