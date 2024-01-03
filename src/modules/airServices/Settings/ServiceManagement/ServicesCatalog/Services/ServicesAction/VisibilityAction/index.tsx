import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Box, Checkbox, Stack, Typography } from '@mui/material';
// import { apiQueryAgent, [] } from './VisibilityAction.data';
import useVisibilityAction from './useVisibilityAction';
import { LoadingButton } from '@mui/lab';

export const VisibilityAction = (props: any) => {
  const { openVisibilityE1, handleCloseVisibility, anchorEl } = props;

  const {
    selectedAgentCheckboxes,
    setSelectedAgentCheckboxes,
    selectedRequestorCheckboxes,
    setSelectedRequestorCheckboxes,
    handleSubmit,
    apiQueryAgent,
    apiQueryRequester,
  } = useVisibilityAction(props);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={openVisibilityE1}
      onClose={handleCloseVisibility}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      sx={{
        position: 'fixed',
        left: -160,
        top: 70,
      }}
    >
      <Accordion key="agent-accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="agent-panel-content"
          id="agent-panel-header"
        >
          <Typography>Agent Visibility</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            mr: '4rem',
            overflow: 'auto !important',
            minHeight: '150px',
            maxHeight: '150px',
          }}
        >
          <Typography>
            <Checkbox
              sx={{ ml: '1rem' }}
              checked={
                apiQueryAgent?.data?.length === selectedAgentCheckboxes?.length
              }
              onChange={(e: any) => {
                e?.target?.checked
                  ? setSelectedAgentCheckboxes(
                      apiQueryAgent?.data?.map((agent: any) => agent?._id),
                    )
                  : setSelectedAgentCheckboxes([]);
              }}
              color="primary"
              name="_id"
            />
            Select All
          </Typography>
          {apiQueryAgent?.data?.map((agent: any) => (
            <MenuItem key={agent?._id}>
              <Checkbox
                checked={
                  !!selectedAgentCheckboxes?.find(
                    (item: any) => item === agent?._id,
                  )
                }
                onChange={(e: any) => {
                  e?.target?.checked
                    ? setSelectedAgentCheckboxes([
                        ...selectedAgentCheckboxes,
                        agent?._id,
                      ])
                    : setSelectedAgentCheckboxes(
                        selectedAgentCheckboxes?.filter(
                          (item: any) => item !== agent?._id,
                        ),
                      );
                }}
              />
              <Typography>
                {agent?.firstName}
                {agent?.lastName}
              </Typography>
            </MenuItem>
          ))}
        </AccordionDetails>
        <Stack direction="row" justifyContent="flex-end" sx={{ px: 4 }}>
          <Box>
            <LoadingButton
              variant="contained"
              size="small"
              onClick={handleSubmit}
            >
              save
            </LoadingButton>
          </Box>
        </Stack>
      </Accordion>
      <Accordion key="requestor-accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="agent-panel-content"
          id="agent-panel-header"
        >
          <Typography>Requestor Visibility</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            mr: '4rem',
            overflow: 'auto !important',
            minHeight: '150px',
            maxHeight: '150px',
          }}
        >
          <Typography>
            <Checkbox
              sx={{ ml: '1rem' }}
              checked={
                apiQueryRequester?.data?.length ===
                selectedRequestorCheckboxes?.length
              }
              onChange={(e: any) => {
                e?.target?.checked
                  ? setSelectedRequestorCheckboxes(
                      apiQueryRequester?.data?.map(
                        (requestor: any) => requestor?._id,
                      ),
                    )
                  : setSelectedRequestorCheckboxes([]);
              }}
              color="primary"
              name="_id"
            />
            Select All
          </Typography>
          {apiQueryRequester?.data?.map((requestor: any) => (
            <MenuItem key={requestor?._id}>
              <Checkbox
                checked={
                  !!selectedRequestorCheckboxes?.find(
                    (item: any) => item === requestor?._id,
                  )
                }
                onChange={(e: any) => {
                  e?.target?.checked
                    ? setSelectedRequestorCheckboxes([
                        ...selectedRequestorCheckboxes,
                        requestor?._id,
                      ])
                    : setSelectedRequestorCheckboxes(
                        selectedRequestorCheckboxes?.filter(
                          (item: any) => item !== requestor?._id,
                        ),
                      );
                }}
              />
              <Typography>
                {requestor?.firstName}
                {requestor?.lastName}
              </Typography>
            </MenuItem>
          ))}
        </AccordionDetails>
        <Stack direction="row" justifyContent="flex-end" sx={{ px: 4, py: 2 }}>
          <Box>
            <LoadingButton
              variant="contained"
              size="small"
              type="button"
              onClick={handleSubmit}
            >
              save
            </LoadingButton>
          </Box>
        </Stack>
      </Accordion>
    </Menu>
  );
};
