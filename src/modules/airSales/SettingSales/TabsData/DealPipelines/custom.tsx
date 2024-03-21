import React, { useEffect } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
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

interface Props {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  isEditMode: boolean;
  onSubmit: (data: any) => void;
  id: string[];
}

export function CustomField({
  isEditMode,
  loading,
  onClose,
  open,
  onSubmit,
  id,
}: Props) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: {
      errors: { dealStages, pipelineName },
    },
  } = useForm({
    resolver: yupResolver(dealPipelinesvalidationSchema),
    defaultValues: dealPipelinesDefaultValues,
  });

  const [getDealsPipelineByIdQuery, { isLoading }] =
    useLazyGetDealsPipelineByIdQuery();
  const { disabled, skeletonLines, theme } = useDealPipelines();
  useEffect(() => {
    if (id.length > 0) {
      getDealsPipelineByIdQuery(id)
        .unwrap()
        .then((res) => {
          if (res) {
            const filedsData = res?.data[0];
            reset({
              dealStages: filedsData?.stages?.map(
                ({
                  name,
                  probability,
                }: {
                  name: string;
                  probability: number | string;
                }) => ({ name, probability }),
              ),
              defaultPipeline: filedsData?.isDefault,
              pipelineName: filedsData?.name,
            });
          }
        });
    }
  }, [id, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dealStages',
  });

  return (
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
        skeletonLines
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
                  helperText={pipelineName?.message}
                  {...field}
                />
              )}
              name="pipelineName"
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
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
                      <Typography variant="body2">Stage Probability</Typography>
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
                  size="small"
                  placeholder="Stage"
                  fullWidth
                  helperText={dealStages?.[index]?.name?.message}
                  error={Boolean(dealStages?.[index]?.name?.message)}
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
                          dealStages?.[index]?.probability?.message,
                        )}
                        helperText={dealStages?.[index]?.probability?.message}
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
              marginTop: '15px',
            })}
            startIcon={<AddCircleIcon />}
          >
            Add Deal stage
          </Button>
        </form>
      )}
    </CommonDrawer>
  );
}
