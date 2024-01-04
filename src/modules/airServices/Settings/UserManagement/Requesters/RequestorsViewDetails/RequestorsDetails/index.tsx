import { EditRequestorsIcon } from '@/assets/icons';
import { AIR_SERVICES } from '@/constants';
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UpsertRequesters from '../../UpsertRequesters';
import {
  requestorAssignedData,
  requestorsAssigned,
} from '../../RequestorsAssignedDetails/RequestorsAssignedDetails.data';
import { useRequesters } from '../../useRequesters';
import { profileInformation, profileRole } from './RequestorsDetails.data';
import { ProfileImage } from '@/assets/images';

export const RequestorsDetails = () => {
  const {
    theme,
    router,
    isDrawerOpen,
    setIsDrawerOpen,
    profileData,
    handleSubmit,
    submit,
    methods,
  } = useRequesters();
  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={2} mb={3}>
        <Box sx={{ cursor: 'pointer' }}>
          <ArrowBackIcon
            onClick={() =>
              router?.push({ pathname: AIR_SERVICES?.REQUESTERS_SETTINGS })
            }
          />
        </Box>
        <Box mb={1}>
          <Typography variant="h3">Profile</Typography>
        </Box>
      </Box>
      <Grid
        container
        borderRadius={'0.5rem'}
        border={`0.125rem solid ${theme?.palette?.custom?.off_white_three}`}
        padding={'1.5rem'}
        spacing={{ md: 0, xs: 2 }}
      >
        <Grid
          item
          xl={1.7}
          lg={2.3}
          xs={12}
          display={'flex'}
          justifyContent={{ lg: 'start', xs: 'center' }}
          mb={{ lg: 0, md: 3 }}
        >
          {profileData && profileData.length > 0 ? (
            <Avatar
              sx={{ height: '9.125rem', width: '9.125rem' }}
              src={profileData[0]?.avatar || ProfileImage?.src}
            />
          ) : (
            <Avatar
              sx={{ height: '9.125rem', width: '9.125rem' }}
              src={ProfileImage?.src}
            />
          )}
          <Box
            display={{ lg: 'none', md: 'flex' }}
            justifyContent={'flex-end'}
            alignItems={'start'}
          >
            <IconButton onClick={() => setIsDrawerOpen(true)}>
              <EditRequestorsIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid
          item
          xl={3.5}
          lg={4}
          md={6}
          xs={12}
          display={'flex'}
          flexDirection={'column'}
          gap={4}
          borderRight={{
            lg: `0.063rem solid ${theme?.palette?.custom?.off_white_three}`,
            xs: 'none',
          }}
        >
          {profileInformation(profileData[0])?.map((item) => (
            <Grid container spacing={{ sm: 4, xs: 1 }} key={item?.id}>
              <Grid item md={5} xs={12}>
                <Typography variant="body4" noWrap>
                  {item?.title}
                </Typography>
                <br />
                {item?.description && (
                  <Typography variant="body3" noWrap>
                    {item?.description}
                  </Typography>
                )}
              </Grid>
              <Grid item md={5} xs={12}>
                <Typography variant="body4">{item?.detail}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          xl={3.5}
          lg={4}
          md={6}
          xs={12}
          display={'flex'}
          flexDirection={'column'}
          gap={3}
          ml={{ lg: 4, xs: 0 }}
        >
          {profileRole(profileData[0])?.map((item) => (
            <Grid container spacing={{ sm: 4, xs: 1 }} key={item?.id}>
              <Grid item md={5} xs={12}>
                <Typography variant="body3" noWrap>
                  {item?.title}
                </Typography>
              </Grid>
              <Grid item md={5} xs={12}>
                <Typography
                  variant="body4"
                  color={item?.detail?.includes('IT') ? 'primary' : ''}
                >
                  {item?.detail}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xl={2.7} lg={1.1} display={{ lg: 'block', xs: 'none' }}>
          <Box
            display={'flex'}
            justifyContent={'flex-end'}
            alignItems={'start'}
          >
            <IconButton onClick={() => setIsDrawerOpen(true)}>
              <EditRequestorsIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Box py={'18px'}>
        <Typography variant="h3">Associations</Typography>
      </Box>
      <Box>
        <Button variant="outlined" color="primary">
          Tickets
        </Button>
      </Box>
      <Box py={'1.125rem'}>
        <Typography variant="h6">Assigned</Typography>
        <br />
        <TanstackTable
          data={requestorAssignedData}
          columns={requestorsAssigned()}
          isPagination={true}
        />
      </Box>
      <Box py={'1.125rem'}>
        <Typography variant="h6">Requested</Typography>
        <br />
        <TanstackTable
          data={requestorAssignedData}
          columns={requestorsAssigned()}
          isPagination={true}
        />
      </Box>
      <UpsertRequesters
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        title={'Edit Requestor'}
        okText={'Update'}
        submitHandler={handleSubmit(submit)}
        methods={methods}
      />
    </>
  );
};
