import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import {
  AddCircleBlackIcon,
  DeleteCrossDisableIcon,
  DeleteCrossIcon,
  DragIcon,
  EditPenIcon,
  TickCircleIcon,
} from '@/assets/icons';
import { FormProvider, RHFSelect } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SetupDefaultValues, SetupValidationSchema } from './Setup.data';
import {
  useDeleteForecastMutation,
  useGetDealsPipelineForecastQuery,
  useGetForecastQuery,
  usePatchForecastMutation,
  usePostForecastMutation,
} from '@/services/airSales/forecast';
import { enqueueSnackbar } from 'notistack';
import { isNullOrEmpty } from '@/utils';
import { ARRAY_INDEX } from '@/constants/strings';
import { successSnackbar } from '@/utils/api';

const Setup = () => {
  const theme = useTheme<Theme>();

  const { data: DealsPipelineForecastData } = useGetDealsPipelineForecastQuery({
    meta: false,
  });

  const productsOptions = DealsPipelineForecastData?.data?.map(
    (product: any) => ({
      value: product?._id,
      label: product?.name,
    }),
  );

  const methods: any = useForm({
    resolver: yupResolver(SetupValidationSchema),
    defaultValues: SetupDefaultValues,
  });

  const { watch: watchRadioValue } = methods;
  const PipelineValue = watchRadioValue('Pipeline');

  const { data: getForecastData, isLoading: getForecastIsLoading } =
    useGetForecastQuery(
      { id: PipelineValue },
      { skip: isNullOrEmpty(PipelineValue) },
    );

  const selectedPipeline = DealsPipelineForecastData?.data?.find(
    (pipeline: any) => pipeline?._id === PipelineValue,
  );
  let stages: any = [];
  if (selectedPipeline) {
    stages = selectedPipeline?.stages;
  }

  const initialRows: any = [];

  const [rows, setRows] = useState(initialRows);

  useEffect(() => {
    if (getForecastData?.data) {
      const mappedRows = getForecastData?.data.map((item: any) => ({
        ...item,
        category: item.name,
        stages: item.stages.map((stage: any) => stage._id),
        isEditing: false,
        isDropdown: true,
        options: stages.map((stage: any) => ({
          value: stage._id,
          label: stage.name,
        })),
      }));
      setRows(mappedRows);
    } else {
      setRows(initialRows);
    }
  }, [getForecastData]);

  const lifeCycleStagesOptions =
    stages?.map((stage: any) => ({
      value: stage?._id,
      label: stage?.name,
    })) || [];

  const handleAddRow = () => {
    setRows((prevRows: any) => [
      ...prevRows,
      {
        category: '',
        stages: [],
        isDropdown: true,
        options: lifeCycleStagesOptions,
        isEditing: true,
      },
    ]);
  };
  const [deleteForecast, { isLoading: isLoadingDelete }] =
    useDeleteForecastMutation();

  const handleDeleteRow = async (index: any, id: any) => {
    if (isNullOrEmpty(id)) {
      setRows((prevRows: any) =>
        prevRows.filter((_: any, i: any) => i !== index),
      );
    } else {
      try {
        await deleteForecast({ ids: id }).unwrap();
        successSnackbar('Record Deleted Successfully');
      } catch (error: any) {
        enqueueSnackbar('Something went wrong!', { variant: 'error' });
      }
    }
  };

  const [postForecast, { isLoading }] = usePostForecastMutation();

  const handleSelectChange = (event: any, index: any) => {
    const selectedIds = event?.target?.value;
    const updatedRows = [...rows];
    updatedRows[index].stages = selectedIds;
    setRows(updatedRows);
  };

  const handlePostForecast = async (index: any) => {
    const payload = {
      name: rows[index]?.category,
      pipeline: PipelineValue,
      stages: rows[index]?.stages,
    };

    try {
      await postForecast({ body: payload })?.unwrap();
      enqueueSnackbar('Forecast added successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message[ARRAY_INDEX?.ZERO], {
        variant: 'error',
      });
    }
  };

  const handleCategoryChange = (event: any, index: any) => {
    const updatedRows = [...rows];
    updatedRows[index].category = event?.target?.value;
    setRows(updatedRows);
  };

  const toggleEditMode = (index: any) => {
    const updatedRows = [...rows];
    updatedRows[index].isEditing = !updatedRows[index]?.isEditing;
    setRows(updatedRows);
  };

  const [patchForecast, { isLoading: isPatchLoading }] =
    usePatchForecastMutation();

  const handlePatchForecast = async (index: any) => {
    const payload = {
      name: rows[index]?.category,
      stages: rows[index]?.stages,
    };

    try {
      await patchForecast({ id: rows[index]?._id, body: payload }).unwrap();
      enqueueSnackbar('Forecast updated successfully', { variant: 'success' });
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message[ARRAY_INDEX?.ZERO], {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <Typography variant="body1" color={theme?.palette?.grey[800]}>
        Deal pipeline settings for the forecast tool. These settings apply to
        the selected pipeline.
      </Typography>
      <Box
        mt={2}
        p={1}
        sx={{
          border: `1px solid ${theme?.palette?.custom?.hawkes_blue}`,
          borderRadius: '8px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} mt={1}>
            <FormProvider methods={methods}>
              <RHFSelect
                name="Pipeline"
                label="Select Pipeline"
                select={true}
                size="small"
                required={true}
              >
                {productsOptions?.map((option: any) => (
                  <option key={uuidv4()} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </RHFSelect>
            </FormProvider>
          </Grid>
        </Grid>
        {isNullOrEmpty(PipelineValue) && (
          <Typography variant="body1" color={theme?.palette?.error?.main}>
            Please select pipeline to see the forecast Category.
          </Typography>
        )}
        <Typography variant="body1" color={theme?.palette?.grey[600]} mt={2}>
          Group your deals into forecast categories based on their deal stage.
          Users can override this mapping by assigning forecast categories
          manually
        </Typography>

        <Box sx={{ width: '100%', p: 2, mt: 2 }}>
          <Grid
            container
            spacing={2}
            bgcolor={theme?.palette?.custom?.light_white_bg}
            sx={{
              borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
            }}
          >
            <Grid
              item
              xs={12}
              md={3}
              my={1.5}
              sx={{ paddingTop: '0 !important' }}
            >
              <Typography variant="h6">Forecast Category</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              my={1.5}
              sx={{ paddingTop: '0 !important' }}
            >
              <Typography variant="h6">Deals Stages</Typography>
            </Grid>
          </Grid>

          {!isNullOrEmpty(PipelineValue) && (
            <>
              <Grid
                container
                spacing={2}
                sx={{
                  borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                }}
              >
                <Grid item xs={12} md={3} my={2}>
                  <Typography
                    variant="body1"
                    display={'flex'}
                    alignItems={'center'}
                  >
                    Not forecasted
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8} my={2}>
                  <Typography
                    variant="body3"
                    mt={3}
                    sx={{
                      backgroundColor: theme?.palette?.custom?.blush_pink,
                      width: 'fit-content',
                      borderRadius: '15px',
                      padding: '3px 5px',
                      border: `1px solid ${theme?.palette?.error?.main}`,
                      color: theme?.palette?.error?.main,
                    }}
                  >
                    Closed Lost
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={1}
                  my={2}
                  sx={{ textAlign: 'right', paddingRight: '8px' }}
                >
                  <DeleteCrossDisableIcon />
                </Grid>
              </Grid>

              <Grid
                container
                spacing={2}
                sx={{
                  borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                }}
              >
                <Grid item xs={12} md={3} my={2}>
                  <Typography
                    variant="body1"
                    display={'flex'}
                    alignItems={'center'}
                  >
                    Closed won
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8} my={2}>
                  <Typography
                    variant="body3"
                    sx={{
                      backgroundColor: theme?.palette?.custom?.pale_mint,
                      width: 'fit-content',
                      borderRadius: '15px',
                      padding: '3px 5px',
                      border: `1px solid ${theme?.palette?.success?.main}`,
                      color: theme?.palette?.success?.main,
                    }}
                  >
                    Closed won
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={1}
                  my={2}
                  sx={{ textAlign: 'right', paddingRight: '8px' }}
                >
                  <DeleteCrossDisableIcon />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} md={3} my={2}>
                  <Typography
                    variant="body1"
                    display={'flex'}
                    alignItems={'center'}
                  >
                    Closed New
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8} my={2}>
                  <Typography
                    variant="body3"
                    sx={{
                      backgroundColor: theme?.palette?.custom?.light_yellow_bg,
                      width: 'fit-content',
                      borderRadius: '15px',
                      padding: '3px 5px',
                      border: `1px solid ${theme?.palette?.warning?.main}`,
                      color: theme?.palette?.warning?.main,
                    }}
                  >
                    Closed New
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={1}
                  my={2}
                  sx={{ textAlign: 'right', paddingRight: '8px' }}
                >
                  <DeleteCrossDisableIcon />
                </Grid>
              </Grid>
            </>
          )}

          {isLoading ||
          getForecastIsLoading ||
          isPatchLoading ||
          isLoadingDelete ? (
            <>
              {rows?.length
                ? rows?.map(() => (
                    <Skeleton
                      key={uuidv4()}
                      variant="rounded"
                      width={'100%'}
                      height={60}
                      sx={{ my: '20px' }}
                    />
                  ))
                : [...Array(3)]?.map(() => (
                    <Skeleton
                      key={uuidv4()}
                      variant="rounded"
                      width={'100%'}
                      height={60}
                      sx={{ my: '20px' }}
                    />
                  ))}
            </>
          ) : (
            rows?.map((item: any, index: any) => (
              <Box
                key={uuidv4()}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: `1px solid #e0e0e0`,
                  flexWrap: 'wrap',
                }}
              >
                <Box>
                  <DragIcon />
                </Box>
                <Box
                  sx={{ flex: 1, display: 'flex', alignItems: 'center', my: 2 }}
                >
                  {item?.isEditing ? (
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="Enter Category"
                      value={item?.category}
                      onChange={(event) => handleCategoryChange(event, index)}
                      onBlur={() => toggleEditMode(index)}
                      autoFocus
                      sx={{ mr: 1 }}
                    />
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{ mr: 1, cursor: 'pointer' }}
                      onClick={() => toggleEditMode(index)}
                    >
                      {item?.category || 'New Category'}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ flex: 3, my: 2 }}>
                  {item?.isDropdown && (
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel>Select deals stages</InputLabel>
                      <Select
                        multiple
                        value={item?.stages}
                        onChange={(event) => handleSelectChange(event, index)}
                        input={<OutlinedInput label="Select deals stages" />}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                          >
                            {selected?.map((id: any) => {
                              const selectedStage = item?.options?.find(
                                (stage: any) => stage.value === id,
                              );
                              return (
                                <Chip key={id} label={selectedStage?.label} />
                              );
                            })}
                          </Box>
                        )}
                      >
                        {item?.options?.map((stage: any) => (
                          <MenuItem key={stage.value} value={stage.value}>
                            <Checkbox
                              checked={item?.stages?.indexOf(stage.value) > -1}
                            />
                            <ListItemText primary={stage.label} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Box>
                <IconButton onClick={() => handleDeleteRow(index, item?._id)}>
                  <DeleteCrossIcon />
                </IconButton>
                {item?._id ? (
                  <IconButton onClick={() => handlePatchForecast(index)}>
                    <EditPenIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handlePostForecast(index)}>
                    <TickCircleIcon />
                  </IconButton>
                )}
              </Box>
            ))
          )}
        </Box>
      </Box>

      <Button
        onClick={handleAddRow}
        disabled={isNullOrEmpty(PipelineValue)}
        sx={{ mt: 2, color: 'black' }}
      >
        <AddCircleBlackIcon /> &nbsp; Add Category
      </Button>
    </>
  );
};

export default Setup;
