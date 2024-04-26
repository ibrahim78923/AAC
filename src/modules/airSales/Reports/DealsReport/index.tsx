import React, { useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Popover,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';

// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DownloadLargeIcon } from '@/assets/icons';

import CardAndGraphs from './CardAndGraph';
import DealsOverview from './DealsOverview';

// import { styles } from './DealsReport.style';
// import { names } from '@/mock/modules/airSales/Reports/DealsReport';
import { v4 as uuidv4 } from 'uuid';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import ArrowDown from '@/assets/icons/modules/airSales/deals/arrow-down';
// import Search from '@/components/Search';
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const customizeData = [
  {
    label: 'Select All',
    value: 'selectall',
  },
  {
    label: 'Scheduled',
    value: 'scheduled',
  },
  {
    label: 'Drafts',
    value: 'drafts',
  },
  {
    label: 'Pending Approval',
    value: 'PendingApproval',
  },
  {
    label: 'Rejected',
    value: 'rejected',
  },
  {
    label: 'Failed',
    value: 'failed',
  },
];
const pipeLineData = [
  {
    label: ' All',
    value: 'all',
  },
  {
    label: 'Sales',
    value: 'sales',
  },
  {
    label: 'Pipeline',
    value: 'pipeline',
  },
  {
    label: 'Recruitment',
    value: 'recruitment',
  },
];

const DealsReport = (props: any) => {
  const { toggle } = props;
  const theme = useTheme<Theme>();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorElNew, setAnchorElnew] = useState<HTMLButtonElement | null>(
    null,
  );
  // const [personName, setPersonName] = useState<string[]>([]);

  // const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(typeof value === 'string' ? value.split(',') : value);
  // };
  const open = Boolean(anchorEl);
  const openPipeline = Boolean(anchorElNew);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickPipeline = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClosePipleine = () => {
    setAnchorElnew(null);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ArrowBackIcon
            sx={{
              cursor: 'pointer',
              color: `${theme?.palette?.custom.light}`,
            }}
            onClick={() => toggle(true)}
          />
          <Typography
            variant="h3"
            sx={{ color: `${theme?.palette?.grey[800]}` }}
          >
            Deals Report
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <SwitchableDatepicker
            renderInput="button"
            variant="contained"
            placement="left"
          />
          <Button
            sx={{ gap: 1, height: '30px' }}
            variant="outlined"
            onClick={handleClick}
            size="small"
            className="small"
            endIcon={<ArrowDown />}
            color="inherit"
          >
            Owner
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Typography variant="h5" sx={{ p: 1, fontSize: '16px' }}>
              Owner
            </Typography>
            {customizeData?.map((data) => (
              <Box sx={{ ml: 1 }} key={uuidv4()}>
                <FormControlLabel control={<Checkbox />} label={data?.label} />
              </Box>
            ))}
          </Popover>
          <Button
            sx={{ gap: 1, height: '30px' }}
            variant="outlined"
            onClick={handleClickPipeline}
            size="small"
            className="small"
            color="inherit"
            endIcon={<ArrowDown />}
          >
            Pipeline
          </Button>
          <Popover
            open={openPipeline}
            anchorEl={anchorElNew}
            onClose={handleClosePipleine}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {pipeLineData?.map((item) => (
              <Box sx={{ ml: 1 }} key={uuidv4()}>
                <FormControlLabel control={<Checkbox />} label={item?.label} />
              </Box>
            ))}
          </Popover>
          <Button
            sx={{ gap: 1, height: '30px' }}
            variant="outlined"
            onClick={handleClickPipeline}
            className="small"
            color="inherit"
          >
            <DownloadLargeIcon />
          </Button>
        </Box>
      </Box>

      {/* <Grid container spacing={2}>
        <Grid item lg={8} md={7} sm={6} xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ArrowBackIcon
              sx={{
                cursor: 'pointer',
                color: `${theme?.palette?.custom.light}`,
              }}
              onClick={() => toggle(true)}
            />
            <Typography
              variant="h3"
              sx={{ color: `${theme?.palette?.grey[800]}` }}
            >
              Deals Report
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={4} md={5} sm={6} xs={12}>
          <Grid container spacing={2}>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <DatePicker
                label={'Date'}
                openTo="month"
                views={['year', 'month', 'day']}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel
                  id="demo-multiple-checkbox-label"
                  sx={{
                    color: `${theme?.palette?.custom.main}`,
                    fontWeight: 500,
                    fontSize: '16px',
                  }}
                >
                  Owner
                </InputLabel>
                <Select
                  sx={{ width: '100%' }}
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                  size="medium"
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel
                  id="demo-multiple-checkbox-label"
                  sx={{
                    color: `${theme?.palette?.custom.main}`,
                    fontWeight: 500,
                    fontSize: '16px',
                  }}
                >
                  Pipelines
                </InputLabel>
                <Select
                  sx={{ width: '100%' }}
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                  size="medium"
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
              <Box sx={styles?.downloadIcon(theme)}>
                <DownloadLargeIcon />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
      <Box sx={{ marginTop: '1rem' }}>
        <CardAndGraphs />
      </Box>
      <Box sx={{ marginTop: '1rem' }}>
        <DealsOverview />
      </Box>
    </>
  );
};

export default DealsReport;
