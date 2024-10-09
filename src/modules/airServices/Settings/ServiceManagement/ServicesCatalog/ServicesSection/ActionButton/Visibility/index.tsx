import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Box, Checkbox, CircularProgress, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useVisibility from './useVisibility';
import { fullName } from '@/utils/avatarUtils';

export default function Visibility(props: any) {
  const { openVisibilityE1, handleCloseVisibility, anchorEl } = props;

  const {
    selectedAgentCheckboxes,
    setSelectedAgentCheckboxes,
    selectedRequestorCheckboxes,
    setSelectedRequestorCheckboxes,
    handleSubmit,
    apiQueryAgent,
    apiQueryRequester,
    patchServiceCatalogTriggerStatus,
    expandedAccordion,
    handleAccordionChange,
  } = useVisibility(props);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={openVisibilityE1}
      onClose={handleCloseVisibility}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{
        '& .MuiPaper-root': {
          borderRadius: 3,
          maxWidth: 380,
          width: '100%',
        },
      }}
    >
      {apiQueryAgent?.isLoading || apiQueryAgent?.isFetching ? (
        <Box width={'100%'} textAlign={'center'} p={2}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Accordion
            expanded={expandedAccordion === 'agent-accordion'}
            onChange={handleAccordionChange('agent-accordion')}
          >
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
                maxHeight: '150px',
              }}
            >
              <Typography variant={'body2'}>
                <Checkbox
                  sx={{ ml: '1rem' }}
                  checked={
                    apiQueryAgent?.data?.length ===
                    selectedAgentCheckboxes?.length
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
                  <Typography variant={'body2'} textTransform={'capitalize'}>
                    {fullName(agent?.firstName, agent?.lastName)}
                  </Typography>
                </MenuItem>
              ))}
            </AccordionDetails>
            <Box textAlign={'end'} mr={4}>
              <LoadingButton
                variant={'contained'}
                className={'small'}
                onClick={handleSubmit}
                loading={patchServiceCatalogTriggerStatus?.isLoading}
              >
                Save
              </LoadingButton>
            </Box>
          </Accordion>

          <Accordion
            expanded={expandedAccordion === 'requestor-accordion'}
            onChange={handleAccordionChange('requestor-accordion')}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="requestor-panel-content"
              id="requestor-panel-header"
            >
              <Typography>Requestor Visibility</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                mr: '4rem',
                overflow: 'auto !important',
                maxHeight: '150px',
              }}
            >
              <Typography variant={'body2'}>
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
                  <Typography variant={'body2'} textTransform={'capitalize'}>
                    {fullName(requestor?.firstName, requestor?.lastName)}
                  </Typography>
                </MenuItem>
              ))}
            </AccordionDetails>
            <Box textAlign={'end'} mr={4}>
              <LoadingButton
                variant={'contained'}
                className={'small'}
                onClick={handleSubmit}
              >
                Save
              </LoadingButton>
            </Box>
          </Accordion>
        </>
      )}
    </Menu>
  );
}
