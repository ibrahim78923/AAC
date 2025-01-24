import { Avatar, Box, IconButton, Typography, useTheme } from '@mui/material';
import { DATE_TIME_FORMAT } from '@/constants';
import { fullName, generateImage, truncateText } from '@/utils/avatarUtils';
import { EditRequestorsIcon } from '@/assets/icons';
import { AGENT_LEVELS_IMAGES } from '@/constants/images';
import { otherDateFormat } from '@/lib/date-time';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

export const AgentBioData = (props: any) => {
  const theme = useTheme();
  const {
    data,
    departmentDetails,
    handleEditButtonClick,
    agentLevelDetail,
  }: any = props;

  return (
    <Box
      border="2px solid"
      borderRadius={2}
      paddingY={2}
      borderColor="custom.off_white_three"
    >
      <ContainerGrid>
        <CustomGrid item xs={12} md={4}>
          <Box
            sx={{
              height: '100%',
              px: 1.5,
              borderRight: {
                md: `1px solid ${theme?.palette?.custom?.off_white_three}`,
              },
              borderBottom: {
                xs: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                md: 'none',
              },
            }}
          >
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              alignItems={'center'}
              gap={3}
            >
              <Avatar
                sx={{
                  bgcolor: 'blue.main',
                  width: 150,
                  height: 150,
                }}
                src={generateImage(data?.data?.avatar?.url)}
              />
              <Box
                flex={1}
                flexDirection={'column'}
                display={'flex'}
                flexWrap={'wrap'}
              >
                <Box my={2}>
                  <Typography
                    variant="h5"
                    color="slateBlue.main"
                    fontWeight={600}
                  >
                    {fullName(data?.data?.firstName, data?.data?.lastName)}
                  </Typography>
                  <Typography variant="body3" fontWeight={500}>
                    {' '}
                    Joined on{' '}
                    {otherDateFormat(
                      data?.data?.createdAt,
                      DATE_TIME_FORMAT?.DMYHMSA,
                    )}
                  </Typography>
                </Box>
                <Box
                  display={'flex'}
                  flexWrap={'wrap'}
                  justifyContent={'space-between'}
                  marginBottom={1}
                >
                  <Typography variant="body2" fontWeight={600}>
                    Email:
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                    {data?.data?.email ?? '---'}
                  </Typography>
                </Box>
                <Box
                  display={'flex'}
                  flexWrap={'wrap'}
                  justifyContent={'space-between'}
                  marginBottom={1}
                >
                  <Typography variant="body2" fontWeight={600}>
                    Phone Number
                  </Typography>
                  <Typography variant="body2">
                    {data?.data?.phoneNumber ?? '---'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </CustomGrid>
        <CustomGrid item xs={12} md={3.5} padding={1.5}>
          <Box sx={{ padding: 1.5 }}>
            <Box display={'flex'} flexWrap={'wrap'} gap={1} my={2}>
              <Typography variant="body2" fontWeight={600}>
                Department
              </Typography>
              <Typography variant="body2" sx={{ flex: '1' }} />
              {truncateText(departmentDetails?.data?.data?.name)}
            </Box>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              justifyContent={'space-between'}
              my={2}
            >
              <Typography variant="body2" fontWeight={600}>
                Email:
              </Typography>
              <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                {data?.data?.email ?? '---'}
              </Typography>
            </Box>
          </Box>
        </CustomGrid>
        <CustomGrid item xs={12} md={1} textAlign={'center'}>
          <IconButton onClick={() => handleEditButtonClick?.()}>
            <EditRequestorsIcon />
          </IconButton>
        </CustomGrid>
        <CustomGrid item xs={12} md={3} padding={1.5} textAlign={'end'}>
          {!!agentLevelDetail?.data ? (
            <Box
              display={'flex'}
              alignItems={'center'}
              flexWrap={'wrap'}
              gap={1}
              border={'1px solid'}
              borderColor={'custom.off_white'}
              p={1.5}
            >
              <Avatar
                src={AGENT_LEVELS_IMAGES?.[agentLevelDetail?.data?.badges]?.src}
                sx={{ width: 30, height: 30 }}
                alt={agentLevelDetail?.data?.badges}
              />
              <Typography
                variant="body2"
                textTransform={'capitalize'}
                color="slateBlue.main"
              >
                {agentLevelDetail?.data?.badges ?? '---'}
              </Typography>
            </Box>
          ) : (
            <></>
          )}
        </CustomGrid>
      </ContainerGrid>
    </Box>
  );
};
