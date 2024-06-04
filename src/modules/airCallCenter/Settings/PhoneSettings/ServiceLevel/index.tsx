import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useServiceLevel } from './useServiceLevel';
import { serviceLevelColumns, serviceLevelData } from './ServiceLevel.data';
import { EditYellowBGPenIcon } from '@/assets/icons';
import AddServiceLevel from './AddServiceLevel';

export const ServiceLevel = () => {
  const { search, setSearch, isDrawerOpen, setIsDrawerOpen } =
    useServiceLevel();
  return (
    <>
      <Box
        sx={{
          borderRadius: 2,
          border: `.1rem solid`,
          borderColor: 'grey.700',
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
          m={2}
          mb={3}
        >
          <Typography variant="h3" color="slateBlue.main">
            Service Levels
          </Typography>
        </Box>
        <Box
          sx={{
            borderRadius: 2,
            border: `.1rem solid`,
            borderColor: 'grey.700',
          }}
          m={2}
        >
          <Grid container spacing={2}>
            <Grid item xs={4} display="flex" alignItems="center">
              <Box p={3}>
                <Box display="flex" gap={2} alignItems="center">
                  <Typography variant="h5" color="slateBlue.main">
                    Global Service Level
                  </Typography>
                  <EditYellowBGPenIcon />
                </Box>
                <Typography variant="body4" color="custom.main">
                  Applies to queues that do not have a customservice level
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                px={3}
                py={2}
                my={1}
                borderLeft="0.1rem solid"
                borderRight="0.1rem solid"
                borderColor="grey.700"
              >
                <Box
                  display="flex"
                  gap={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h5" color="slateBlue.main">
                      Target
                    </Typography>
                    <Typography variant="body4" color="custom.main">
                      Service level target
                    </Typography>
                  </Box>
                  <Box>
                    <Box position="relative" display="inline-flex">
                      <CircularProgress
                        variant="determinate"
                        value={100}
                        size={100}
                        thickness={3}
                        sx={{ color: 'primary.light', position: 'absolute' }}
                      />
                      <CircularProgress
                        variant="determinate"
                        value={65}
                        size={100}
                        thickness={3}
                        sx={{
                          '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                          },
                        }}
                      />
                      <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          variant="body2"
                          fontWeight={500}
                          sx={{
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            width: 40,
                            height: 40,
                          }}
                          component="div"
                          color="common.white"
                        >
                          {`${Math.round(65)}%`}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box p={3}>
                <Box
                  display="flex"
                  gap={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h5" color="slateBlue.main">
                      Threshold
                    </Typography>
                    <Typography variant="body4" color="custom.main">
                      Time to answer threshold
                    </Typography>
                  </Box>
                  <Box>
                    <Box position="relative" display="inline-flex">
                      <CircularProgress
                        variant="determinate"
                        value={100}
                        size={100}
                        thickness={3}
                        sx={{ color: 'primary.light', position: 'absolute' }}
                      />
                      <CircularProgress
                        variant="determinate"
                        value={65}
                        size={100}
                        thickness={3}
                        sx={{
                          '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                          },
                        }}
                      />
                      <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Typography
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          variant="body2"
                          fontWeight={500}
                          sx={{
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            width: 40,
                            height: 40,
                          }}
                          component="div"
                          color="common.white"
                        >
                          {`${Math.round(15)}s`}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box
            mx={2}
            my={1}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
            gap={1}
          >
            <Search
              label="Search Here"
              width={'16.25rem'}
              setSearchBy={setSearch}
              searchBy={search}
            />
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => setIsDrawerOpen(true)}
              sx={{ width: { sm: 'auto', xs: '100%' } }}
            >
              New Service Level
            </Button>
          </Box>
          <TanstackTable
            data={serviceLevelData}
            columns={serviceLevelColumns}
            isPagination
          />
        </Box>
      </Box>
      <AddServiceLevel
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
};
