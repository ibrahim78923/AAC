import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RolesAccordionsTicketsData } from '../Roles.data';
import { RHFCheckbox, RHFRadioGroup } from '@/components/ReactHookForm';
import {
  ticketOptionViewAnnouncements,
  ticketOptionViewsEditEntries,
  ticketOptionViewsEditNotes,
  contractOptions,
  inventoryOptions,
  purchaseOptions,
  solutionsOptions,
} from '../Roles.data';
import { SETTINGS_ADD_ROLE } from '@/constants/strings';

const renderCheckboxes = (options, rolesMethods) => {
  return options?.map((option) => (
    <Box key={option?.name} marginLeft={2}>
      <RHFCheckbox
        name={option?.name}
        label={option?.label}
        rolesMethods={rolesMethods}
      />
    </Box>
  ));
};

const RolesAccordions = () => {
  const { rolesMethods, theme } = useRoles();

  return (
    <Grid item xs={12} md={10}>
      {Object?.entries(RolesAccordionsTicketsData)?.map(([title, data]) => (
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
                          rolesMethods.watch(SETTINGS_ADD_ROLE.EDIT_NOTES) && (
                            <Box marginLeft={2}>
                              <RHFRadioGroup
                                options={ticketOptionViewsEditNotes}
                                name={SETTINGS_ADD_ROLE.EDIT_NOTES}
                                label=""
                                row={false}
                              />
                            </Box>
                          )}
                        {item.componentProps?.name ===
                          SETTINGS_ADD_ROLE?.INVENTORY_ASSET &&
                          rolesMethods.watch(
                            SETTINGS_ADD_ROLE.INVENTORY_ASSET,
                          ) &&
                          renderCheckboxes(inventoryOptions, rolesMethods)}
                        {item.componentProps?.name ===
                          SETTINGS_ADD_ROLE?.CONTRACT_ASSET &&
                          rolesMethods.watch(
                            SETTINGS_ADD_ROLE.CONTRACT_ASSET,
                          ) &&
                          renderCheckboxes(contractOptions, rolesMethods)}
                        {item.componentProps?.name ===
                          SETTINGS_ADD_ROLE?.PURCHASE_ASSET &&
                          rolesMethods.watch(
                            SETTINGS_ADD_ROLE.PURCHASE_ASSET,
                          ) &&
                          renderCheckboxes(purchaseOptions, rolesMethods)}

                        {item.componentProps?.name ===
                          SETTINGS_ADD_ROLE?.TICKET_SOLUTIONS &&
                          rolesMethods.watch(
                            SETTINGS_ADD_ROLE.TICKET_SOLUTIONS,
                          ) &&
                          renderCheckboxes(solutionsOptions, rolesMethods)}

                        {item.componentProps?.name ===
                          SETTINGS_ADD_ROLE?.EDIT_TASKS &&
                          rolesMethods.watch(SETTINGS_ADD_ROLE.EDIT_TASKS) && (
                            <Box marginLeft={2}>
                              <RHFRadioGroup
                                options={ticketOptionViewsEditEntries}
                                name={SETTINGS_ADD_ROLE.EDIT_TASKS}
                                label=""
                                row={false}
                              />
                            </Box>
                          )}
                        {item.componentProps?.name ===
                          SETTINGS_ADD_ROLE?.ANNOUNCEMENTS &&
                          rolesMethods.watch(
                            SETTINGS_ADD_ROLE.ANNOUNCEMENTS,
                          ) && (
                            <Box marginLeft={2}>
                              <RHFRadioGroup
                                options={ticketOptionViewAnnouncements}
                                name={SETTINGS_ADD_ROLE.ANNOUNCEMENTS}
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
      ))}
    </Grid>
  );
};

export default RolesAccordions;
