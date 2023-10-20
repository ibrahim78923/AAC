import React from 'react';

import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DownloadLargeIcon } from '@/assets/icons';
import { names } from '@/mock/modules/airSales/Reports/DealsReport';
import { styles } from './DealsReport.style';
import CardAndGraphs from './CardAndGraph';
import DealsOverview from './DealsOverview';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const DealsReport = (props: any) => {
  const { toggle } = props;
  const theme = useTheme<Theme>();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={8} md={7} sm={6} xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ArrowBackIcon
              sx={{ cursor: 'pointer', color: '#667085' }}
              onClick={() => toggle(true)}
            />
            <Typography variant="h3" sx={{ color: '#1F2937' }}>
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
                  sx={{ color: '#6B7280', fontWeight: 500, fontSize: '16px' }}
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
                  sx={{ color: '#6B7280', fontWeight: 500, fontSize: '16px' }}
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
              <Box sx={styles.downloadIcon(theme)}>
                <DownloadLargeIcon />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
