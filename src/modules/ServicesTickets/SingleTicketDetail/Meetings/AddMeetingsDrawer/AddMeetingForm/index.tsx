import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { Box, Grid, ToggleButton } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { addMeetingDataArray } from './AddMeetingForm.data';
import { videoConferencingButtons } from './AddMeetingForm.styles';

export const AddMeetingForm = ({
  submitCreateNewTicket,
  methods,
  handleSubmit,
}: any) => {
  return (
    <>
      <Box mt={1}>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(submitCreateNewTicket)}
        >
          <Grid container spacing={4}>
            {addMeetingDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item.componentProps} size={'small'}>
                  {item?.componentProps?.select
                    ? item?.options?.map((option: any) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))
                    : item?.buttonGroup
                    ? item?.options?.map((option: any) => (
                        <ToggleButton
                          sx={videoConferencingButtons}
                          key={option?.value}
                          value={option?.value}
                        >
                          <Image src={option?.img} alt={option?.value} />
                          {option?.label}
                        </ToggleButton>
                      ))
                    : null}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </>
  );
};
