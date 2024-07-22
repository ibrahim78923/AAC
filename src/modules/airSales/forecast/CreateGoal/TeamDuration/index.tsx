import React from 'react';
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { FormProvider, RHFDatePicker } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { teamDurationArray } from './TeamDuration.data';
import TemplateFrame from '../Describe/TemplateFrame';
import TemplateBasic from '../Describe/TemplateBasic';
import { HeaderInfoIcon } from '@/assets/icons';
import { createGoal, RADIO_VALUE } from '@/constants';

const TeamDuration = (props: any) => {
  const { methods, handleSubmit, userTeamValue, customDateValue } = props;

  return (
    <Grid container xs={12} spacing={2}>
      <Grid item md={6} xs={12}>
        <FormProvider methods={methods} onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            {teamDurationArray(userTeamValue)?.map((item: any) => (
              <Grid
                item
                xs={12}
                md={item?.md}
                key={item?._id}
                sx={{ position: 'relative' }}
              >
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>

                {item?.componentProps?.name === RADIO_VALUE?.FROM &&
                  customDateValue === 'custom' && (
                    <RHFDatePicker name="from" fullWidth label="From" />
                  )}
                {item?.componentProps?.name === RADIO_VALUE?.TO &&
                  customDateValue === 'custom' && (
                    <RHFDatePicker name="to" fullWidth label="To" />
                  )}

                {item?.componentProps?.name === createGoal?.userTeam &&
                  userTeamValue === createGoal?.team && (
                    <Box
                      sx={{ position: 'absolute', top: '22px', left: '182px' }}
                    >
                      <Tooltip
                        title={
                          <Typography variant="body4">
                            No teams set up; assign users for <br /> tracking,
                            go to settings to assign <br /> users to a team.
                          </Typography>
                        }
                        placement="top-start"
                        arrow
                        sx={{ width: 'fit-content', cursor: 'pointer' }}
                      >
                        <Box>
                          {' '}
                          <HeaderInfoIcon />{' '}
                        </Box>
                      </Tooltip>
                    </Box>
                  )}
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Grid>

      <Grid item md={6} xs={12}>
        <TemplateFrame>
          <TemplateBasic />
        </TemplateFrame>
      </Grid>
    </Grid>
  );
};

export default TeamDuration;
