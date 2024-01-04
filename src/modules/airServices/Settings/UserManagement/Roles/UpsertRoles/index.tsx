import React from 'react';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useRoles } from '../useRoles';
import {
  FormProvider,
  RHFCheckbox,
  RHFRadioGroup,
} from '@/components/ReactHookForm';
import {
  contractOptions,
  inventoryOptions,
  purchaseOptions,
  solutionsOptions,
  ticketOptionViewAnnouncements,
  upsertRolesData,
} from '../Roles.data';
import { v4 as uuidv4 } from 'uuid';
import {
  RolesAccordionsTicketsData,
  ticketOptionViewsEditEntries,
  ticketOptionViewsEditNotes,
} from '../Roles.data';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SETTINGS_ADD_ROLE } from '@/constants/strings';

const renderCheckboxes = (options: any) => {
  return options?.map((option: any) => (
    <Box key={option?.name} marginLeft={2}>
      <RHFCheckbox name={option?.name} label={option?.label} />
    </Box>
  ));
};

const UpsertRoles = () => {
  const { backToRoles, rolesMethods, onSubmit, handleSubmit, theme } =
    useRoles();

  const checkboxState = {
    [SETTINGS_ADD_ROLE.EDIT_NOTES]: rolesMethods.watch(
      SETTINGS_ADD_ROLE.EDIT_NOTES,
    ),
    [SETTINGS_ADD_ROLE.INVENTORY_ASSET]: rolesMethods.watch(
      SETTINGS_ADD_ROLE.INVENTORY_ASSET,
    ),
    [SETTINGS_ADD_ROLE.CONTRACT_ASSET]: rolesMethods.watch(
      SETTINGS_ADD_ROLE.CONTRACT_ASSET,
    ),
    [SETTINGS_ADD_ROLE.PURCHASE_ASSET]: rolesMethods.watch(
      SETTINGS_ADD_ROLE.PURCHASE_ASSET,
    ),
    [SETTINGS_ADD_ROLE.TICKET_SOLUTIONS]: rolesMethods.watch(
      SETTINGS_ADD_ROLE.TICKET_SOLUTIONS,
    ),
    [SETTINGS_ADD_ROLE.EDIT_TASKS]: rolesMethods.watch(
      SETTINGS_ADD_ROLE.EDIT_TASKS,
    ),
    [SETTINGS_ADD_ROLE.ANNOUNCEMENTS]: rolesMethods.watch(
      SETTINGS_ADD_ROLE.ANNOUNCEMENTS,
    ),
  };

  return (
    <>
      <Grid container>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <ArrowBack onClick={backToRoles} sx={{ cursor: 'pointer' }} />
          <Typography variant="h5">Add New Role</Typography>
        </Box>
        <Grid lg={6} xs={12}></Grid>
        <FormProvider methods={rolesMethods}>
          <Box sx={{ my: 2 }}>
            <Grid container spacing={2}>
              {upsertRolesData?.map((item) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <Typography variant="body2" fontWeight={500}>
                    {item?.title}
                  </Typography>
                  <item.component
                    {...item?.componentProps}
                    size={'small'}
                  ></item.component>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Grid xs={12}>
            <Typography variant="h5">Permissions</Typography>
          </Grid>
          <Grid item xs={12} md={10}>
            {(Object?.entries(RolesAccordionsTicketsData ?? {}) ?? []).map(
              ([title, data]) => (
                <Accordion
                  key={title}
                  disableGutters
                  sx={{
                    '&.MuiAccordion': {
                      '&.Mui-expanded': {
                        boxShadow: 'theme.customShadows.z8',
                        borderRadius: '8px',
                      },
                      '&.Mui-disabled': {
                        backgroundColor: 'transparent',
                      },
                    },
                    '& .MuiAccordionSummary-root': {
                      backgroundColor: theme?.palette?.blue?.main,
                      color: theme.palette?.common?.white,
                      borderRadius: '8px',
                    },
                    mt: 1,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`${title}-content`}
                    id={`${title}-header`}
                  >
                    <Typography>{title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container>
                      {data?.map((item) => (
                        <React.Fragment key={uuidv4()}>
                          {item?.componentProps?.heading && (
                            <Grid item xs={12}>
                              <Typography variant="h5">
                                {item?.componentProps?.heading}
                              </Typography>
                            </Grid>
                          )}
                          {!item?.componentProps?.heading &&
                            item?.componentProps?.name ===
                              SETTINGS_ADD_ROLE.VIEW_TICKET && (
                              <Grid item xs={12}>
                                <item.component
                                  {...item?.componentProps}
                                  size="small"
                                />
                              </Grid>
                            )}
                          {!item?.componentProps?.heading &&
                            item?.componentProps?.name !==
                              SETTINGS_ADD_ROLE?.VIEW_TICKET && (
                              <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                                key={uuidv4()}
                                sx={{ pl: 2 }}
                              >
                                <item.component
                                  {...item?.componentProps}
                                  size="small"
                                  onChange={(event) => {
                                    item?.componentProps?.onChange &&
                                      item?.componentProps?.onChange(event);
                                    const { name, checked } = event?.target;
                                    rolesMethods.setValue(name, checked);
                                  }}
                                />

                                {item?.componentProps?.name ===
                                  SETTINGS_ADD_ROLE?.EDIT_NOTES &&
                                  checkboxState?.[
                                    SETTINGS_ADD_ROLE?.EDIT_NOTES
                                  ] && (
                                    <Box marginLeft={2}>
                                      <RHFRadioGroup
                                        options={ticketOptionViewsEditNotes}
                                        name={SETTINGS_ADD_ROLE?.EDIT_NOTES}
                                        label=""
                                        row={false}
                                      />
                                    </Box>
                                  )}
                                {item.componentProps?.name ===
                                  SETTINGS_ADD_ROLE?.INVENTORY_ASSET &&
                                  checkboxState?.[
                                    SETTINGS_ADD_ROLE?.INVENTORY_ASSET
                                  ] &&
                                  renderCheckboxes(inventoryOptions)}
                                {item.componentProps?.name ===
                                  SETTINGS_ADD_ROLE?.CONTRACT_ASSET &&
                                  checkboxState?.[
                                    SETTINGS_ADD_ROLE?.CONTRACT_ASSET
                                  ] &&
                                  renderCheckboxes(contractOptions)}
                                {item.componentProps?.name ===
                                  SETTINGS_ADD_ROLE?.PURCHASE_ASSET &&
                                  checkboxState?.[
                                    SETTINGS_ADD_ROLE?.PURCHASE_ASSET
                                  ] &&
                                  renderCheckboxes(purchaseOptions)}

                                {item.componentProps?.name ===
                                  SETTINGS_ADD_ROLE?.TICKET_SOLUTIONS &&
                                  checkboxState?.[
                                    SETTINGS_ADD_ROLE?.TICKET_SOLUTIONS
                                  ] &&
                                  renderCheckboxes(solutionsOptions)}

                                {item.componentProps?.name ===
                                  SETTINGS_ADD_ROLE?.EDIT_TASKS &&
                                  checkboxState?.[
                                    SETTINGS_ADD_ROLE?.EDIT_TASKS
                                  ] && (
                                    <Box marginLeft={2}>
                                      <RHFRadioGroup
                                        options={ticketOptionViewsEditEntries}
                                        name={SETTINGS_ADD_ROLE?.EDIT_TASKS}
                                        label=""
                                        row={false}
                                      />
                                    </Box>
                                  )}
                                {item.componentProps?.name ===
                                  SETTINGS_ADD_ROLE?.ANNOUNCEMENTS &&
                                  checkboxState?.[
                                    SETTINGS_ADD_ROLE?.ANNOUNCEMENTS
                                  ] && (
                                    <Box marginLeft={2}>
                                      <RHFRadioGroup
                                        options={ticketOptionViewAnnouncements}
                                        name={SETTINGS_ADD_ROLE?.ANNOUNCEMENTS}
                                        label=""
                                        row={false}
                                      />
                                    </Box>
                                  )}
                              </Grid>
                            )}
                        </React.Fragment>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ),
            )}
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Box
            sx={{ display: 'flex', gap: '10px', justifyContent: 'end', my: 2 }}
          >
            <Button variant="outlined" onClick={backToRoles}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
            >
              Add
            </Button>
          </Box>
        </FormProvider>
      </Grid>
      <Grid></Grid>
    </>
  );
};

export default UpsertRoles;
