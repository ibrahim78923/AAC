import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid, IconButton, Skeleton, Typography } from '@mui/material';
import ClickPerformance from './ClickPerformance';
import Emailhealth from './Emailhealth';
import { useGetEmailMarketingByIdQuery } from '@/services/airMarketer/emailMarketing';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import CommonModal from '@/components/CommonModal';
import { PencilEditIcon } from '@/assets/icons';
import CreateNewEmail from '../CreateNewEmail';
import { DATE_TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import EmailReadability from './EmailReadability';

const ViewDetailsAndPerformance = ({
  openViewDetails,
  handleCloseViewDetails,
  selectedRecords,
  setSelectedRecords,
}: any) => {
  const { data, isLoading } = useGetEmailMarketingByIdQuery(
    {
      params: {
        id: selectedRecords?._id,
      },
    },
    { skip: selectedRecords?._id ? false : true },
  );

  const [isEditEmailOpen, setIsEditEmailOpen] = useState(false);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={openViewDetails}
        onClose={handleCloseViewDetails}
        title={'View Details & Performance'}
        okText={'Apply'}
        isOk
        cancelText={'Cancel'}
        footer={false}
        submitHandler={handleCloseViewDetails}
      >
        {isLoading ? (
          <Box>
            <center>
              <Skeleton variant="rounded" width={240} height={150} />
            </center>
            <Box sx={{ mt: 5 }}>
              {[1, 2, 3].map(() => (
                <Box sx={{ mt: 2 }} key={uuidv4()}>
                  <Skeleton
                    variant="rounded"
                    sx={{ mb: 1, width: '40%', height: '20px' }}
                  />
                  <Skeleton
                    variant="rounded"
                    sx={{ width: '70%', height: '30px' }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Box mt={1}>
            <Grid container>
              <Grid item sm={12}>
                <Typography variant="body2" sx={{ fontWeight: '700' }} mt={2.4}>
                  Sent To
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: '500' }}
                  mt={0.8}
                  mb={2.4}
                >
                  {data?.data?.to?.map((item: any) => item).join(', ')}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: '700' }}>
                  Subject{' '}
                  <IconButton onClick={() => setIsEditEmailOpen(true)}>
                    <PencilEditIcon />
                  </IconButton>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: '500' }}
                  mt={0.8}
                  mb={2.4}
                >
                  {data?.data?.subject}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: '700' }}>
                  Message
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: '500' }}
                  mt={0.8}
                  mb={2.4}
                  dangerouslySetInnerHTML={{ __html: data?.data?.message }}
                ></Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant="body2" sx={{ fontWeight: '700' }} mt={2.4}>
                  Published Date
                </Typography>
                <Typography variant="body2" mt={2.4}>
                  {dayjs(data?.data?.createdAt)?.format(
                    DATE_TIME_FORMAT?.DMDHMA,
                  )}
                </Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant="body2" sx={{ fontWeight: '700' }} mt={2.4}>
                  Scheduled At
                </Typography>
                <Typography variant="body2" mt={2.4}>
                  {data?.data?.sentOn
                    ? dayjs(data?.data?.sentOn)?.format(
                        DATE_TIME_FORMAT?.DMDHMA,
                      )
                    : '--'}
                </Typography>
              </Grid>
              <Grid item sm={12} sx={{ mt: 2 }}>
                <ClickPerformance data={data?.data} />
              </Grid>
              <Grid item sm={12}>
                <Emailhealth data={data?.data} />
              </Grid>
              <Grid item sm={12}>
                <EmailReadability data={data?.data} />
              </Grid>
            </Grid>
          </Box>
        )}
      </CommonDrawer>

      {isEditEmailOpen && (
        <CommonModal
          open={isEditEmailOpen}
          handleClose={() => setIsEditEmailOpen(false)}
          handleCancel={() => setIsEditEmailOpen(false)}
          title=""
          okText="Verify"
          cancelText="Cancel"
          footer={false}
          width={1000}
          cancelIcon={false}
        >
          <CreateNewEmail
            edit
            data={data}
            setIsEditEmailOpen={setIsEditEmailOpen}
            setSelectedRecords={setSelectedRecords}
          />
        </CommonModal>
      )}
    </>
  );
};
export default ViewDetailsAndPerformance;
