import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
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
import { getHeaders, teamGoalTableColumns } from './Performance.data';
import { useAppSelector } from '@/redux/store';
import { isNullOrEmpty } from '@/utils';
import dayjs from 'dayjs';
import { ARRAY_INDEX } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';

const Performance = ({
  tableRowValues,
  setTableRowValues,
  inputValues,
  handleInputChange,
  handlePipelineChange,
  processedData,
  selectedValues,
  handleChange,
  setInputValues,
}: any) => {
  const theme = useTheme();
  const [isAddTargetModal, setIsAddTargetModal] = useState(false);
  const [modalInputValue, setModalInputValue] = useState('');

  const teamDurationForm: any = useAppSelector(
    (state) => state?.forecastForm?.teamDurationForm,
  );

  const headers = getHeaders(teamDurationForm);

  const applyModalValueToRow = () => {
    if (tableRowValues && modalInputValue !== '') {
      setInputValues((prev: any) => {
        const updatedValues = { ...prev };
        tableRowValues?.forEach((rowId: string) => {
          headers?.forEach((header: string) => {
            const month = header?.split(' ')[ARRAY_INDEX?.ZERO]?.toLowerCase();
            if (!updatedValues[rowId]) {
              updatedValues[rowId] = {};
            }
            // Convert modalInputValue to a number
            const numericValue = parseFloat(modalInputValue);
            updatedValues[rowId][month] = isNaN(numericValue)
              ? 0
              : numericValue;
          });
        });
        return updatedValues;
      });
      setIsAddTargetModal(false);
      setTableRowValues([]);
      setModalInputValue('');
    } else {
      enqueueSnackbar('Please enter values', { variant: 'error' });
    }
  };

  return (
    <>
      <Typography variant="h3">
        What are your {dayjs().year()} targets?
      </Typography>
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
          <Grid item xs={12} sm={7}>
            <Typography variant="h6"> Goal </Typography>
            <Typography variant="body2">
              Set Goals and pipelines for each user/team selected.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={7}>
            <Box
              sx={{
                backgroundColor: theme?.palette?.grey[700],
                color: theme?.palette?.custom?.main,
                padding: '10px',
                borderRadius: '6px',
                width: 'fit-content',
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              <QuestionIcon /> &nbsp;
              <Typography variant="h6">
                {' '}
                To bulk apply targets and pipelines, choose multiple
                contributors.{' '}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3} textAlign={'end'}>
            <Button
              variant="contained"
              className="small"
              onClick={() => setIsAddTargetModal(true)}
              sx={{ width: { xs: '100%', sm: 'fit-content' } }}
              disabled={isNullOrEmpty(tableRowValues)}
            >
              {' '}
              Apply Target
            </Button>

            <Button
              variant="outlined"
              className="small"
              sx={{
                marginLeft: { sm: '0', md: '10px' },
                border: `1px solid ${theme?.palette?.grey[0]}`,
                color: theme?.palette?.custom?.main,
                marginTop: { xs: '10px', md: '0' },
                width: { xs: '100%', sm: 'fit-content' },
              }}
            >
              <ArrowCircleLeftIcon /> &nbsp; {dayjs().year()} &nbsp;{' '}
              <ArrowCircleRightIcon />
            </Button>
          </Grid>
        </Grid>

        <TanstackTable
          columns={teamGoalTableColumns(
            handleChange,
            teamDurationForm,
            tableRowValues,
            setTableRowValues,
            selectedValues,
            processedData,
            theme,
            inputValues,
            handleInputChange,
            handlePipelineChange,
          )}
          data={teamDurationForm?.collaborators}
          isPagination
        />
      </Box>

      <CommonModal
        open={isAddTargetModal}
        handleClose={() => setIsAddTargetModal(false)}
        handleCancel={() => setIsAddTargetModal(false)}
        handleSubmit={applyModalValueToRow}
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
            value={modalInputValue}
            onChange={(e) => {
              const value = parseFloat(e?.target?.value);
              if (value > 0 || e?.target?.value === '') {
                setModalInputValue(e?.target?.value);
              }
            }}
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
              onClick={applyModalValueToRow}
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
