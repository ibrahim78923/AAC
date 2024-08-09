import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
  useTheme,
  Theme,
} from '@mui/material';
import React, { useState } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const CustomizeModal = ({ open, handleClose }: any) => {
  const theme = useTheme<Theme>();
  const [columns, setColumns] = useState({
    teamUsername: true,
    goalAttainment: true,
    total: false,
    appointmentScheduled: false,
    qualifiedToBuy: false,
    presentationScheduled: false,
    decisionMakerBoughtIn: false,
    contractSent: false,
    forecastSubmission: false,
  });

  const handleCheckboxChange = (event: any) => {
    setColumns({ ...columns, [event?.target?.name]: event?.target?.checked });
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ '& .MuiDialog-paper': { width: '800px', maxWidth: '800px' } }} // Set the width here
      >
        <DialogTitle id="alert-dialog-title">
          {'Edit forecast category table'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" mt={1}>
            <Typography variant="caption">
              Choose the columns shown in the forecast categories table. To add,
              remove, or rename forecast categories, you need to edit the
              forecast category property
            </Typography>
            <Box display="flex" pt={2}>
              <Box
                flex={1}
                pl={2}
                mr={2}
                sx={{
                  height: '35vh',
                  overflow: 'scroll',
                  boxShadow: `0px 3px 6px 0px ${theme?.palette?.custom?.custom_shadow}`,
                  borderRadius: '12px',
                }}
              >
                <Typography variant="h6">Columns</Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={columns?.teamUsername}
                        onChange={handleCheckboxChange}
                        name="teamUsername"
                      />
                    }
                    label="Team/Username"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={columns?.goalAttainment}
                        onChange={handleCheckboxChange}
                        name="goalAttainment"
                      />
                    }
                    label="Goal Attainment"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={columns?.total}
                        onChange={handleCheckboxChange}
                        name="total"
                      />
                    }
                    label="Total"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={columns?.appointmentScheduled}
                        onChange={handleCheckboxChange}
                        name="appointmentScheduled"
                      />
                    }
                    label="Appointment Scheduled"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={columns?.qualifiedToBuy}
                        onChange={handleCheckboxChange}
                        name="qualifiedToBuy"
                      />
                    }
                    label="Qualified to Buy"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={columns?.presentationScheduled}
                        onChange={handleCheckboxChange}
                        name="presentationScheduled"
                      />
                    }
                    label="Presentation Scheduled"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={columns?.decisionMakerBoughtIn}
                        onChange={handleCheckboxChange}
                        name="decisionMakerBoughtIn"
                      />
                    }
                    label="Decision Maker Bought-In"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={columns?.contractSent}
                        onChange={handleCheckboxChange}
                        name="contractSent"
                      />
                    }
                    label="Contract Sent"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={columns?.forecastSubmission}
                        onChange={handleCheckboxChange}
                        name="forecastSubmission"
                      />
                    }
                    label="Forecast Submission"
                  />
                </FormGroup>
              </Box>
              <Box
                flex={1}
                pl={2}
                sx={{
                  height: '35vh',
                  overflow: 'scroll',
                  boxShadow: `0px 3px 6px 0px ${theme?.palette?.custom?.custom_shadow}`,
                  borderRadius: '12px',
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Columns Order
                </Typography>
                {Object?.keys(columns)?.map((column, index) => (
                  <Box
                    display="flex"
                    alignItems="center"
                    mb={1}
                    p={0.5}
                    key={column}
                    sx={{
                      border: `1px solid ${theme?.palette?.grey[700]}`,
                      borderRadius: '8px',
                    }}
                  >
                    {index > 1 && (
                      <IconButton>
                        <DragIndicatorIcon />
                      </IconButton>
                    )}
                    <Typography sx={{ marginLeft: index > 1 ? '0px' : '10px' }}>
                      {column}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ paddingTop: '10px !important' }}>
          <Button
            className="small"
            variant="outlined"
            onClick={handleClose}
            sx={{
              color: theme?.palette?.custom?.main,
              border: `1px solid ${theme?.palette?.custom?.dark}`,
            }}
          >
            Cancel
          </Button>
          <Button
            className="small"
            variant="contained"
            onClick={handleClose}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomizeModal;
