import { Box, Typography, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CardLayout } from '../CardLayout';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import { useWelcomeCard } from '../WelcomeCard/useWelcomeCard';
import dayjs from 'dayjs';
import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { useRouter } from 'next/router';

export const Announcements = () => {
  const { palette }: any = useTheme();
  const { data, isLoading, isFetching, isError } = useWelcomeCard();
  const router = useRouter();

  return (
    <CardLayout
      title={'Announcements'}
      btnPosition="center"
      btnClick={() => {
        router?.push({
          pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE,
        });
      }}
    >
      {isLoading || isFetching ? (
        <SkeletonForm />
      ) : isError ? (
        <ApiErrorState height={'100%'} />
      ) : (
        <Box my="0.75rem">
          {!!data?.announcements?.length ? (
            data?.announcements?.map((announcement: any, index: number) => (
              <Box
                key={announcement?._id}
                sx={{ p: 2 }}
                borderBottom={
                  index !== data?.announcements?.length - 1 ? '1px solid' : ''
                }
                borderColor={'custom.off_white'}
              >
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexWrap={'wrap'}
                  gap={1}
                >
                  <Typography fontWeight={600} color={palette?.blue?.main}>
                    {announcement?.title > 20
                      ? `${announcement?.title?.slice(0, 10)} ...`
                      : announcement?.title}
                  </Typography>
                  <Box
                    display={'flex'}
                    flexWrap={'wrap'}
                    alignItems={'center'}
                    gap={1}
                  >
                    <Avatar
                      src={announcement?.user?.profileImage}
                      alt=""
                      sx={{
                        width: 28,
                        height: 28,
                        backgroundColor: 'primary.main',
                      }}
                    >
                      <Typography variant="body2" textTransform={'uppercase'}>
                        {fullNameInitial(
                          announcement?.user?.firstName,
                          announcement?.user?.lastName,
                        )}
                      </Typography>
                    </Avatar>
                    <Typography
                      variant="body3"
                      color={palette?.blue?.main}
                      fontWeight={500}
                    >
                      {fullName(
                        announcement?.user?.firstName,
                        announcement?.user?.lastName,
                      )}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  color={palette?.grey?.[900]}
                  fontSize={'0.75rem'}
                  mt={1}
                >
                  {`${dayjs()?.diff(
                    dayjs(announcement?.createdAt),
                    'hour',
                  )} hours ago`}
                </Typography>
              </Box>
            ))
          ) : (
            <NoData height={'100%'} />
          )}
        </Box>
      )}
    </CardLayout>
  );
};
