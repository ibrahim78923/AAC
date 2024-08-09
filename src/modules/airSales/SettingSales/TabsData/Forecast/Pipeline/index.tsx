import { HeaderInfoIcon } from '@/assets/icons';
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CustomizeModal from '../CustomizeModal';

const Pipeline = () => {
  const theme = useTheme<Theme>();
  const [age, setAge] = useState('');

  const handleChange = (event: any) => {
    setAge(event.target.value as string);
  };

  const [pipelineStages, setPipelineStages] = useState([]);
  const [bestCaseStages, setBestCaseStages] = useState([]);
  const [commitStages, setCommitStages] = useState([]);
  const [open, setOpen] = useState(false);

  const handleSelectChange = (event: any, setState: any) => {
    const {
      target: { value },
    } = event;
    setState(typeof value === 'string' ? value.split(',') : value);
  };

  const pipelineOptions = [
    'Appointment scheduled',
    'Qualified to Buy',
    'Presentation scheduled',
  ];
  const bestCaseOptions = ['Proposal Sent', 'Negotiation', 'Review'];
  const commitOptions = [
    'Decision Make Bought-In',
    'Contract In',
    'PO Received',
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <Grid item xs={12} md={6} my={1}>
            <InputLabel id="demo-simple-select-label">
              Select Pipeline
            </InputLabel>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Sales Pipeline</MenuItem>
                <MenuItem value={20}>marketing Pipeline</MenuItem>
                <MenuItem value={30}>services Pipeline</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Typography
        variant="body1"
        color={theme?.palette?.primary?.main}
        fontWeight={'500'}
        mt={2}
        sx={{
          textDecoration: 'underline',
          cursor: 'pointer',
          width: 'fit-content',
        }}
        onClick={handleClickOpen}
      >
        Customize the deal stage Table
      </Typography>
      <Typography variant="body1" color={theme?.palette?.grey[600]}>
        Choose the deal stages and columns that will be displayed in the
        forecast tool.
      </Typography>

      <Typography
        variant="h4"
        color={theme?.palette?.slateBlue?.main}
        mt={2.5}
        mb={1}
      >
        Map forecast categories to deal stages
      </Typography>

      <Box display={'flex'}>
        <Checkbox />
        <Box>
          <Typography variant="body1" color={theme?.palette?.slateBlue?.main}>
            Forecast submission status indicator
          </Typography>

          <Typography variant="body3" color={theme?.palette?.custom?.main}>
            Indicate which forecast submissions have not been updated after a
            set amount of time.
          </Typography>
        </Box>
      </Box>

      <Typography variant="body1" color={theme?.palette?.grey[600]} mt={2}>
        Group your deals into forecast categories based on their deal stage.
        Users can override this mapping by assigning forecast categories
        manually
      </Typography>

      <Box sx={{ width: '100%', p: 2, mt: 2 }}>
        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}></Box> */}
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
            <Typography variant="body1" display={'flex'} alignItems={'center'}>
              Not forecasted
              <Tooltip
                title={
                  <Typography variant="body4">
                    {'Deals that should be omitted from the forecast.'}
                  </Typography>
                }
                placement="top"
                arrow
                sx={{ cursor: 'pointer', ml: 1 }}
              >
                <Box>
                  {' '}
                  <HeaderInfoIcon />{' '}
                </Box>
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} my={2}>
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
        </Grid>

        {[
          {
            category: 'Pipeline',
            stages: pipelineStages,
            Tooltip:
              'Deals in this forecast category are less likely to close.',
            color: 'default',
            isDropdown: true,
            setState: setPipelineStages,
            options: pipelineOptions,
          },
          {
            category: 'Best Case',
            stages: bestCaseStages,
            Tooltip: 'Deals that have a moderate chance of closing.',
            color: 'default',
            isDropdown: true,
            setState: setBestCaseStages,
            options: bestCaseOptions,
          },
          {
            category: 'Commit',
            stages: commitStages,
            Tooltip: 'Deals that are very likely to close.',
            color: 'default',
            isDropdown: true,
            setState: setCommitStages,
            options: commitOptions,
          },
        ].map((item) => (
          <Box
            key={uuidv4()}
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', my: 2 }}>
              <Typography variant="body1" sx={{ mr: 1 }}>
                {item?.category}
              </Typography>

              <Tooltip
                title={<Typography variant="body4">{item?.Tooltip}</Typography>}
                placement="top"
                arrow
                sx={{ cursor: 'pointer' }}
              >
                <Box>
                  {' '}
                  <HeaderInfoIcon />{' '}
                </Box>
              </Tooltip>
            </Box>
            <Box sx={{ flex: 3, my: 2 }}>
              {item?.isDropdown && (
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>Select deals stages</InputLabel>
                  <Select
                    multiple
                    value={item?.stages}
                    onChange={(event) =>
                      handleSelectChange(event, item?.setState)
                    }
                    input={<OutlinedInput label="Select deals stages" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected?.map((value) => (
                          <Chip key={uuidv4()} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {item?.options?.map((stage) => (
                      <MenuItem key={uuidv4()} value={stage}>
                        <Checkbox checked={item?.stages?.indexOf(stage) > -1} />
                        <ListItemText primary={stage} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Box>
          </Box>
        ))}

        <Grid container spacing={2}>
          <Grid item xs={12} md={3} my={2}>
            <Typography variant="body1" display={'flex'} alignItems={'center'}>
              Closed won
              <Tooltip
                title={
                  <Typography variant="body4">
                    {
                      'Deals that have closed within the forecasted time period.'
                    }
                  </Typography>
                }
                placement="top"
                arrow
                sx={{ cursor: 'pointer', ml: 1 }}
              >
                <Box>
                  {' '}
                  <HeaderInfoIcon />{' '}
                </Box>
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} my={2}>
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
        </Grid>
      </Box>

      {open && <CustomizeModal open={open} handleClose={handleClose} />}
    </>
  );
};

export default Pipeline;
