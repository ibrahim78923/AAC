import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  QuestionIcon,
} from '@/assets/icons';
import CommonModal from '@/components/CommonModal';
import TanstackTable from '@/components/Table/TanstackTable';
import { teamGoalTableColumns, teamGoalTableData } from './Performance.data';

const Performance = () => {
  const theme = useTheme();
  const [isAddTargetModal, setIsAddTargetModal] = useState(false);
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value?.split(',') : value);
  };
  const names = ['Team Name 1', 'Team Name 2', 'Team Name 3'];

  return (
    <>
      <Typography variant="h3">What are your 2023 targets?</Typography>
      <Box
        sx={{
          border: '1px solid #EAECF0',
          borderRadius: '8px',
          padding: '15px',
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems={'center'}
          justifyContent={'space-between'}
          mb={2}
        >
          <Grid item xs={7}>
            <Typography variant="h6"> Team Goal </Typography>
            <Typography variant="body2">
              Set Goals and pipelines for each team selected, use the dropdown
              menu below to to switch teams
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <FormControl sx={{ mt: 1, width: '100%' }}>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected: any) => selected?.join(', ')}
                placeholder="all"
              >
                {names?.map((name: any) => (
                  <MenuItem key={name} value={name}>
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <Typography
              variant="h6"
              sx={{
                backgroundColor: theme?.palette?.grey[700],
                color: theme?.palette?.custom?.main,
                padding: '10px',
                borderRadius: '6px',
                width: 'fit-content',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              {' '}
              <QuestionIcon /> &nbsp; To bulk apply targets and pipelines,
              choose multiple contributors.{' '}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="small"
              onClick={() => setIsAddTargetModal(true)}
            >
              {' '}
              Apply Target
            </Button>

            <Button
              variant="outlined"
              className="small"
              sx={{
                marginLeft: '10px',
                border: `1px solid ${theme?.palette?.grey[0]}`,
                color: theme?.palette?.custom?.main,
              }}
            >
              <ArrowCircleLeftIcon /> &nbsp; 2023 &nbsp;{' '}
              <ArrowCircleRightIcon />
            </Button>
          </Grid>
        </Grid>

        <TanstackTable
          columns={teamGoalTableColumns(handleChange, personName)}
          data={teamGoalTableData}
          isPagination
        />
      </Box>

      <CommonModal
        open={isAddTargetModal}
        handleClose={() => setIsAddTargetModal(false)}
        handleCancel={() => setIsAddTargetModal(false)}
        handleSubmit={() => setIsAddTargetModal(false)}
        title="Apply this value to all targets in this row."
      >
        <Box>
          <Typography variant="body2" fontWeight={'500'}>
            Enter Amount
          </Typography>
          <TextField
            type="number"
            fullWidth
            placeholder=" £"
            sx={{
              '& input': {
                height: '12px',
              },
            }}
          />
          <Box
            mt={2}
            display={'flex'}
            justifyContent={'end'}
            alignItems={'center'}
          >
            <Button
              variant="outlined"
              onClick={() => setIsAddTargetModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={() => setIsAddTargetModal(false)}
              sx={{ marginLeft: '10px' }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </CommonModal>
    </>
  );
};

export default Performance;
