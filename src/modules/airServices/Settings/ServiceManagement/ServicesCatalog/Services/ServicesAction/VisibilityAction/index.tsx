import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Checkbox, Typography } from '@mui/material';
import { agentVisibility, requestorVisibility } from './VisibilityAction.data';
import useVisibilityAction from './useVisibilityAction';

export const VisibilityAction = (props: any) => {
  const { openVisibilityE1, handleCloseVisibility, anchorEl } = props;

  const {
    selectedAgentCheckboxes,
    setSelectedAgentCheckboxes,
    selectedRequestorCheckboxes,
    setSelectedRequestorCheckboxes,
  } = useVisibilityAction();

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
        top: 90,
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
        <AccordionDetails>
          <Typography>
            <Checkbox
              sx={{ ml: '1rem' }}
              checked={
                agentVisibility?.length === selectedAgentCheckboxes?.length
              }
              onChange={(e: any) => {
                e?.target?.checked
                  ? setSelectedAgentCheckboxes(
                      agentVisibility?.map((agent: any) => agent?.id),
                    )
                  : setSelectedAgentCheckboxes([]);
              }}
              color="primary"
              name="_id"
            />
            Select All
          </Typography>
          {agentVisibility?.map((agent) => (
            <MenuItem key={agent?.id}>
              <Checkbox
                checked={
                  !!selectedAgentCheckboxes?.find(
                    (item: any) => item === agent?.id,
                  )
                }
                onChange={(e: any) => {
                  e?.target?.checked
                    ? setSelectedAgentCheckboxes([
                        ...selectedAgentCheckboxes,
                        agent?.id,
                      ])
                    : setSelectedAgentCheckboxes(
                        selectedAgentCheckboxes?.filter(
                          (item: any) => item !== agent?.id,
                        ),
                      );
                }}
              />
              <Typography>{agent?.name}</Typography>
            </MenuItem>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion key="requestor-accordion">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="agent-panel-content"
          id="agent-panel-header"
        >
          <Typography>Requestor Visibility</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Checkbox
              sx={{ ml: '1rem' }}
              checked={
                requestorVisibility?.length ===
                selectedRequestorCheckboxes?.length
              }
              onChange={(e: any) => {
                e?.target?.checked
                  ? setSelectedRequestorCheckboxes(
                      requestorVisibility?.map(
                        (requestor: any) => requestor?.id,
                      ),
                    )
                  : setSelectedRequestorCheckboxes([]);
              }}
              color="primary"
              name="_id"
            />
            Select All
          </Typography>
          {requestorVisibility?.map((requestor) => (
            <MenuItem key={requestor?.id}>
              <Checkbox
                checked={
                  !!selectedRequestorCheckboxes?.find(
                    (item: any) => item === requestor?.id,
                  )
                }
                onChange={(e: any) => {
                  e?.target?.checked
                    ? setSelectedRequestorCheckboxes([
                        ...selectedRequestorCheckboxes,
                        requestor?.id,
                      ])
                    : setSelectedRequestorCheckboxes(
                        selectedRequestorCheckboxes?.filter(
                          (item: any) => item !== requestor?.id,
                        ),
                      );
                }}
              />
              <Typography>{requestor?.name}</Typography>
            </MenuItem>
          ))}
        </AccordionDetails>
      </Accordion>
    </Menu>
  );
};
