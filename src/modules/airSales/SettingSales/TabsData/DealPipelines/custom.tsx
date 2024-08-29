import React, { createElement, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import {
  useForm,
  useFieldArray,
  Controller,
  FormProvider,
} from 'react-hook-form';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { yupResolver } from '@hookform/resolvers/yup';
import CommonDrawer from '@/components/CommonDrawer';
import { useLazyGetDealsPipelineByIdQuery } from '@/services/airSales/deals/settings/deals-pipeline';
import useDealPipelines from './useDealPipelines';
import {
  dealPipelinesvalidationSchema,
  dealPipelinesDefaultValues,
} from './DealPipelines.data';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { CustomFieldProps } from '../TabsData.interface';
import { componentMap } from '@/utils/dynamic-forms';

type DealStages = {
  name?: { message?: string };
  probability?: { message?: string };
};

export function CustomField({
  isEditMode,
  loading,
  onClose,
  open,
  onSubmit,
  id,
}: CustomFieldProps) {
  const { form, disabled, theme, getDynamicFieldsStatus } = useDealPipelines();

  const methods = useForm({
    resolver: yupResolver(dealPipelinesvalidationSchema(form)),
    defaultValues: dealPipelinesDefaultValues(undefined, form),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: {
      errors: { dealStages, pipelineName },
    },
  } = methods;

  const dealStagesAarray = dealStages as DealStages[] | undefined;

  const [getDealsPipelineByIdQuery, { isLoading }] =
    useLazyGetDealsPipelineByIdQuery();

  useEffect(() => {
    if (id?.length > 0 && isEditMode) {
      getDealsPipelineByIdQuery(id)
        .unwrap()
        .then((res) => {
          if (res) {
            const filedsData = res?.data[0];
            reset(dealPipelinesDefaultValues(filedsData, form));
          }
        });
    }
  }, [id, reset, form]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dealStages',
  });

  return (
    <FormProvider {...methods}>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={onClose}
        title={isEditMode ? 'Edit Pipeline' : 'Create Pipeline'}
        okText={isEditMode ? 'Edit' : 'Add'}
        footer
        isOk
        submitHandler={handleSubmit(onSubmit)}
        isLoading={loading}
      >
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <form>
            <Grid item xs={12}>
              <FormLabel>
                <Typography variant="body2">Pipeline Name</Typography>
              </FormLabel>
              <Controller
                render={({ field }) => (
                  <TextField
                    size="small"
                    placeholder="Pipeline name"
                    fullWidth
                    error={Boolean(pipelineName?.message)}
                    helperText={
                      typeof pipelineName?.message === 'string'
                        ? pipelineName.message
                        : undefined
                    }
                    {...field}
                  />
                )}
                name="pipelineName"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginY: 1 }}>
              <Controller
                render={({ field }) => (
                  <FormControlLabel
                    label="Mark as Default Pipeline"
                    checked={field.value}
                    control={<Checkbox />}
                    {...field}
                  />
                )}
                name="defaultPipeline"
                control={control}
              />
            </Grid>

            {fields.map((item, index) => (
              <Grid container key={item.id} sx={{ gap: 1, mb: '10px' }}>
                {index === 0 && (
                  <>
                    <Grid item xs={5}>
                      <FormLabel sx={{ display: 'flex' }}>
                        <Typography variant="body2"> Deal Stage</Typography>
                        <Typography sx={{ color: theme?.palette?.error?.main }}>
                          *
                        </Typography>
                      </FormLabel>
                    </Grid>
                    <Grid item xs={5}>
                      <FormLabel sx={{ display: 'flex' }}>
                        <Typography variant="body2">
                          Stage Probability
                        </Typography>
                        <Typography sx={{ color: theme?.palette?.error?.main }}>
                          *
                        </Typography>
                      </FormLabel>
                    </Grid>
                    <Grid item xs={1}>
                      <FormLabel>
                        <Typography variant="body2">Actions</Typography>
                      </FormLabel>
                    </Grid>
                  </>
                )}
                <Grid item xs={5}>
                  <TextField
                    disabled={disabled[index]}
                    size="small"
                    placeholder="Stage"
                    fullWidth
                    helperText={dealStagesAarray?.[index]?.name?.message}
                    error={Boolean(dealStagesAarray?.[index]?.name?.message)}
                    {...register(`dealStages.${index}.name`)}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Controller
                    render={({ field }) => (
                      <>
                        <TextField
                          size="small"
                          type="number"
                          placeholder="Probability"
                          inputProps={{ min: 0, max: 100 }}
                          fullWidth
                          error={Boolean(
                            dealStagesAarray?.[index]?.probability?.message,
                          )}
                          helperText={
                            dealStagesAarray?.[index]?.probability?.message
                          }
                          {...field}
                        />
                      </>
                    )}
                    name={`dealStages.${index}.probability`}
                    control={control}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    onClick={() => remove(index)}
                    disabled={disabled[index]}
                  >
                    <CancelIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}

            <Button
              onClick={() => append({ name: '', probability: '' })}
              sx={(theme: Theme) => ({
                color: theme?.palette?.slateBlue?.main,
                marginY: '15px',
              })}
              startIcon={<AddCircleIcon />}
            >
              Add Deal stage
            </Button>

            {getDynamicFieldsStatus?.isLoading ||
            getDynamicFieldsStatus?.isFetching ? (
              <Box display="flex" justifyContent="center" mt={3} width="100%">
                <CircularProgress />
              </Box>
            ) : (
              form?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  {componentMap[item?.component] &&
                    createElement(componentMap[item?.component], {
                      ...item?.componentProps,
                      name: item?.componentProps?.label,
                      size: 'small',
                    })}
                </Grid>
              ))
            )}
          </form>
        )}
      </CommonDrawer>
    </FormProvider>
  );
}
