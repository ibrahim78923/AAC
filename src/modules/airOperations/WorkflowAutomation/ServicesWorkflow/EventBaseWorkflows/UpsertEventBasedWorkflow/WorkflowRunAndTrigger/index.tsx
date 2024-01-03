import { Box, Button, Grid, Typography } from '@mui/material';
import { RHFAutocomplete, RHFRadioGroup } from '@/components/ReactHookForm';
import {
  assetsOptions,
  eventOptions,
  moduleOptions,
} from './WorkflowRunAndTrigger.data';
import { AddCircle, Delete } from '@mui/icons-material';
import { useFieldArray } from 'react-hook-form';

export const WorkflowRunAndTrigger = (props: any) => {
  const { register, palette, watch } = props;
  const { append, fields, remove } = useFieldArray({
    control: props?.control,
    name: 'events',
  });
  const moduleType = watch('moduleType');
  const ASSETS_TYPE = 'Assets';
  return (
    <>
      <Grid
        item
        xs={12}
        mt={1}
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
            When to trigger this workflow
          </Typography>
        </Box>
        <Grid lg={8} p={1.5}>
          <RHFRadioGroup
            label={<Typography variant="h5">Module</Typography>}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
            name="moduleType"
            options={moduleOptions}
            inputRef={register}
          />
        </Grid>
        {moduleType === ASSETS_TYPE && (
          <Grid md={6} p={1}>
            <RHFAutocomplete
              name="assetsType"
              size="small"
              label="Assets Type"
              required
              options={assetsOptions}
            />
          </Grid>
        )}
      </Grid>
      <Grid
        item
        xs={12}
        border={`1px solid ${palette?.custom?.off_white_three}`}
        borderRadius={2}
        my={2}
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
            When to Trigger this workflow?
          </Typography>
        </Box>
        <>
          {(fields?.length === 0 ? [{}] : fields)?.map(
            (item: any, index: any) => (
              <Grid container p={1.5} spacing={2} key={item?.id}>
                <Grid item md={6} xs={10}>
                  <RHFAutocomplete
                    name={`events[${index}].eventName`}
                    size="small"
                    label={`Event ${index + 1}`}
                    options={eventOptions}
                  />
                </Grid>
                <Grid item mt={4}>
                  {index > 0 && (
                    <Delete
                      onClick={() => remove(index)}
                      sx={{ color: 'error.main', cursor: 'pointer' }}
                    />
                  )}
                </Grid>
              </Grid>
            ),
          )}
        </>
        <Box ml={1}>
          <Button
            onClick={() => append({ eventName: '' })}
            color="secondary"
            startIcon={<AddCircle color="action" />}
          >
            Add Event
          </Button>
        </Box>
      </Grid>
    </>
  );
};
