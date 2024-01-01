import {
  Box,
  Typography,
  Grid,
  Button,
  ButtonGroup,
  Divider,
} from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import useDetails from './useDetails';

import { detailsDataArray } from './Details.data';

import { styles } from '../ViewDetails.style';

import { v4 as uuidv4 } from 'uuid';

const Details = ({ data }: any) => {
  const {
    theme,
    methodsDetails,
    onSubmit,
    handleSubmit,
    lifeCycleStagesData,
    UserListData,
  } = useDetails(data);
  return (
    <Box sx={styles?.horizontalTabsBox}>
      <Typography variant="h4">Details</Typography>
      <Box sx={styles?.horizontalTabsInnnerBox}>
        <FormProvider
          methods={methodsDetails}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={4}>
            {detailsDataArray({ lifeCycleStagesData, UserListData })?.map(
              (item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={uuidv4()}
                  sx={{ paddingTop: '20px !important' }}
                >
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </item.component>
                </Grid>
              ),
            )}
            <Grid item xs={12}>
              <Divider sx={{ borderColor: theme?.palette?.grey[700] }} />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  gap: 1.5,
                }}
              >
                <ButtonGroup>
                  <Button sx={{ height: '35px' }}>Cancel</Button>
                </ButtonGroup>
                <ButtonGroup variant="contained" color="primary">
                  <Button sx={{ height: '35px' }} type="submit">
                    Update
                  </Button>
                </ButtonGroup>
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default Details;
