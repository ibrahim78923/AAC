import { Grid, Box, Typography, Stack } from '@mui/material';

import { FormProvider, RHFSelect } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';

import { eventDataArray } from './CreateEvent.data';
import { v4 as uuidv4 } from 'uuid';
import useCreateEvent from './useCreateEvent';
import { Info } from '@mui/icons-material';

const CreateEvent = (props: any) => {
  const { isDrawerOpen, onClose } = props;

  const {
    handleSubmit,
    onSubmit,
    checkboxVal,
    methods,
    theme,
    marketingRadio,
  } = useCreateEvent();

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={onClose}
      title={'Create Event'}
      okText={'Create Event'}
      isOk={true}
      submitHandler={handleSubmit(onSubmit)}
      footer
    >
      <Box>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {eventDataArray?.map((item: any) => {
              return (
                item?.lifeCycleStage?.includes(checkboxVal) && (
                  <Grid item xs={12} md={item?.md} key={uuidv4()}>
                    {item?.componentProps?.heading && (
                      <Stack direction="row" gap={1}>
                        <Typography variant={item?.componentProps?.varient}>
                          {item?.componentProps?.heading}
                        </Typography>
                        {(item?.componentProps?.heading === 'Event Trigger' ||
                          item?.componentProps?.heading ===
                            'Custom contact property') && (
                          <Typography component={'span'}>
                            <Info
                              sx={{
                                color: theme?.palette?.custom?.grayish_blue,
                              }}
                            />
                          </Typography>
                        )}
                      </Stack>
                    )}
                    <item.component {...item.componentProps} size={'small'}>
                      {item?.componentProps?.select &&
                        item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                    </item.component>
                    {item?.componentProps?.name === 'triggerRadio' &&
                      marketingRadio === 'marketingQualifiedLead' && (
                        <RHFSelect
                          label="Linkedin conversion type"
                          name="linkedin"
                          size="small"
                          select={true}
                          md={12}
                          option={[
                            { value: 'google', label: 'Google Ads' },
                            { value: 'linkedin', label: 'LinkedIn' },
                          ]}
                        >
                          <option>Lead</option>
                        </RHFSelect>
                      )}
                  </Grid>
                )
              );
            })}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default CreateEvent;
