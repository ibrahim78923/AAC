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
import { teamGoalTableColumns } from './Performance.data';
import { useAppSelector } from '@/redux/store';
import { isNullOrEmpty } from '@/utils';
import { useGetDealPipeLineQuery } from '@/services/airSales/deals/index';

const Performance = ({ tableRowValues, setTableRowValues }: any) => {
  const theme = useTheme();
  const [isAddTargetModal, setIsAddTargetModal] = useState(false);

  const { data: dealPipelineData } = useGetDealPipeLineQuery({ meta: false });
  const [selectedValues, setSelectedValues] = useState({});

  const processData = (data: any) => {
    return data?.map((item: any) => ({
      id: item?._id,
      name: item?.name,
    }));
  };

  // Assuming 'apiResponse' is the data you get from the API
  const processedData = processData(dealPipelineData?.data);

  const handleChange = (rowId: any) => (event: any) => {
    const {
      target: { value },
    } = event;

    const selectedStagesArray =
      typeof value === 'string' ? value.split(',') : value;

    const stagesForRow = processedData.filter(
      (stage: any) => selectedStagesArray?.includes(stage?.id),
    );

    setSelectedValues({
      ...selectedValues,
      [rowId]: stagesForRow,
    });
  };

  const teamDurationForm: any = useAppSelector(
    (state) => state?.forecastForm?.teamDurationForm,
  );

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
          <Grid item xs={12} sm={7}>
            <Typography variant="h6"> Team Goal </Typography>
            <Typography variant="body2">
              Set Goals and pipelines for each team selected, use the dropdown
              menu below to to switch teams
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
              <ArrowCircleLeftIcon /> &nbsp; 2023 &nbsp;{' '}
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
          )}
          data={teamDurationForm?.collaborators}
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
