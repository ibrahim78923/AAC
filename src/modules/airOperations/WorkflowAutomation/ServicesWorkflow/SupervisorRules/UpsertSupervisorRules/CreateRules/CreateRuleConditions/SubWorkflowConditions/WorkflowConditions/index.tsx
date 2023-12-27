import { RHFAutocomplete } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import {
  conditionOptions,
  fieldOptions,
  statusOptions,
  ticketsFieldsOptions,
} from '../../CreateRuleConditions.data';

const WorkflowConditionsFields = ({
  index,
  subIndex,
  register,
  watch,
}: any) => {
  const workflowConditions = watch(
    `workflowConditions.${index}.nestedArray.${subIndex}.condition1`,
  );
  const TICKET_FIELDS = 'Ticket Fields';
  return (
    <>
      <Grid container spacing={1}>
        <Grid item md={3}>
          <RHFAutocomplete
            name={`workflowConditions.${index}.nestedArray.${subIndex}.condition1`}
            size="small"
            placeholder="Select"
            options={conditionOptions}
            inputRef={register}
          />
        </Grid>
        {workflowConditions === TICKET_FIELDS && (
          <>
            <Grid item md={3}>
              <RHFAutocomplete
                name={`workflowConditions.${index}.nestedArray.${subIndex}.condition2`}
                size="small"
                placeholder="Select"
                options={ticketsFieldsOptions}
              />
            </Grid>
            <Grid item md={3}>
              <RHFAutocomplete
                name={`workflowConditions.${index}.nestedArray.${subIndex}.condition3`}
                size="small"
                placeholder="Select"
                options={fieldOptions}
              />
            </Grid>
            <Grid item md={3}>
              <RHFAutocomplete
                name={`workflowConditions.${index}.nestedArray.${subIndex}.condition4`}
                size="small"
                placeholder="Select"
                options={statusOptions}
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default WorkflowConditionsFields;
