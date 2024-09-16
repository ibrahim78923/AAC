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
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import {
  AddCircleBlackIcon,
  DeleteCrossDisableIcon,
  DeleteCrossIcon,
  DragIcon,
} from '@/assets/icons';
import { FormProvider, RHFSelect } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SetupDefaultValues, SetupValidationSchema } from './Setup.data';

const Setup = () => {
  const theme = useTheme<Theme>();

  const methods: any = useForm({
    resolver: yupResolver(SetupValidationSchema),
    defaultValues: SetupDefaultValues,
  });

  const initialRows: any = [];

  const [rows, setRows] = useState(initialRows);

  const handleAddRow = () => {
    setRows((prevRows: any) => [
      ...prevRows,
      {
        category: '',
        stages: [],
        isDropdown: true,
        options: ['Option 1', 'Option 2', 'Option 3'],
        isEditing: true,
      },
    ]);
  };

  const handleDeleteRow = (index: any) => {
    setRows((prevRows: any) =>
      prevRows.filter((_: any, i: any) => i !== index),
    );
  };

  const handleSelectChange = (event: any, index: any) => {
    const updatedRows = [...rows];
    updatedRows[index].stages = event?.target?.value;
    setRows(updatedRows);
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

  return (
    <>
      <Typography variant="h6" color={theme?.palette?.grey[800]}>
        Forecast Deal Amount
      </Typography>
      <Typography variant="body1" color={theme?.palette?.grey[800]}>
        Choose how deal amounts are displayed on the forecast view and related
        reports.
      </Typography>

      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} my={1}>
            <RHFSelect name="dealAmount" label="" select={true} size="small">
              <option value="default">Total Amount</option>
              <option value="default">Weighted Amount </option>
            </RHFSelect>
          </Grid>
        </Grid>

        <Typography variant="h6" color={theme?.palette?.grey[800]} mt={1}>
          Forecast period
        </Typography>
        <Typography variant="body1" color={theme?.palette?.grey[800]}>
          Choose the time period you'll use for revenue goals and forecast
          submissions.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} mt={1}>
            <RHFSelect name="Period" label="" select={true} size="small">
              <option value="default">Monthly</option>
              <option value="default">Quartly </option>
            </RHFSelect>
          </Grid>
        </Grid>
      </FormProvider>
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
          <Grid item xs={12} md={6} my={1}>
            <FormProvider methods={methods}>
              <RHFSelect
                name="SelectPipeline"
                label="Select Pipeline"
                select={true}
                size="small"
              >
                <option value="default">sales pipeline</option>
                <option value="default">marketing pipeline </option>
              </RHFSelect>
            </FormProvider>
          </Grid>
        </Grid>

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
          {rows?.map((item: any, index: any) => (
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
                    onBlur={() => toggleEditMode(index)} // Toggle edit mode when focus is lost
                    autoFocus // Keep focus when adding a new row
                    sx={{ mr: 1 }}
                  />
                ) : (
                  <Typography
                    variant="body1"
                    sx={{ mr: 1, cursor: 'pointer' }}
                    onClick={() => toggleEditMode(index)} // Enable editing on click
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
                          {selected?.map((value: any) => (
                            <Chip key={uuidv4()} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {item?.options?.map((stage: any) => (
                        <MenuItem key={uuidv4()} value={stage}>
                          <Checkbox
                            checked={item?.stages?.indexOf(stage) > -1}
                          />
                          <ListItemText primary={stage} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Box>
              <IconButton onClick={() => handleDeleteRow(index)}>
                <DeleteCrossIcon />
              </IconButton>
            </Box>
          ))}

          <Grid container spacing={2}>
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
        </Box>
      </Box>

      <Button onClick={handleAddRow} sx={{ mt: 2, color: 'black' }}>
        <AddCircleBlackIcon /> &nbsp; Add Category
      </Button>
    </>
  );
};

export default Setup;
