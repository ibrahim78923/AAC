import { useState } from 'react';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DownloadLargeIcon } from '@/assets/icons';
import CardAndGraphs from './CategoryGraph';
import PipelineOverview from './CategoryTable';
import { v4 as uuidv4 } from 'uuid';
import SwitchableDatepicker from '@/components/SwitchableDatepicker';
import ArrowDown from '@/assets/icons/modules/airSales/deals/arrow-down';
import { AIR_SALES } from '@/routesConstants/paths';
import PipeLineCards from './CategoryCards';
import useCateogoryForcastReports from './useCategoryForcastReports';

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

const CategoryForecastReports = () => {
  const theme = useTheme<Theme>();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorElNew, setAnchorElnew] = useState<HTMLButtonElement | null>(
    null,
  );
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
  const { router, activeCard, setActiveCard } = useCateogoryForcastReports();

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
            onClick={() => router.push(AIR_SALES?.REPORTS)}
          />
          <Typography
            variant="h3"
            sx={{ color: `${theme?.palette?.grey[800]}` }}
          >
            Forecast Category Report
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
      <Box mt={4}>
        <PipeLineCards activeCard={activeCard} setActiveCard={setActiveCard} />
      </Box>
      <Box sx={{ marginTop: '1rem' }}>
        <CardAndGraphs activeCard={activeCard} />
      </Box>
      <Box sx={{ marginTop: '1rem' }}>
        <PipelineOverview activeCard={activeCard} />
      </Box>
    </>
  );
};

export default CategoryForecastReports;
