import { Box, Skeleton } from '@mui/material';

export const SkeletonWorkload = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={3}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={4}
      >
        {Array.from({ length: 3 })?.map((item: any, id: any) => (
          <Skeleton
            key={item ?? `skeleton+${id}`}
            animation={'wave'}
            variant={'rounded'}
            width={id === 0 ? '18%' : id === 1 ? '20%' : '35%'}
            height={40}
            sx={{
              bgcolor: 'grey.300',
              border: 1,
              borderColor: 'custom.off_white_three',
            }}
          />
        ))}
      </Box>

      <Box border={1} borderColor={'custom.off_white_three'}>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          {Array.from({ length: 7 })?.map((item: any, id: any) => (
            <Box
              key={item ?? `skeleton+${id}`}
              p={1}
              borderBottom={1}
              borderRight={id === 6 ? 0 : 1}
              borderColor={'custom.off_white_three'}
              width={'100%'}
            >
              <Skeleton
                animation={'wave'}
                variant={'rounded'}
                width={'100%'}
                height={40}
                sx={{
                  bgcolor: 'grey.300',
                  border: 1,
                  borderColor: 'custom.off_white_three',
                }}
              />
            </Box>
          ))}
        </Box>

        {Array.from({ length: 6 })?.map((parent: any, parentId: any) => (
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            key={parent ?? `skeleton+${parentId}`}
          >
            {Array.from({ length: 7 })?.map((item: any, id: any) => (
              <Box
                key={item ?? `skeleton+${id}`}
                p={1}
                py={2}
                borderRight={id === 6 ? 0 : 1}
                borderColor={'custom.off_white_three'}
                width={'100%'}
              >
                <Skeleton
                  animation={'wave'}
                  variant={'rounded'}
                  width={'100%'}
                  height={40}
                  sx={{
                    bgcolor: 'grey.300',
                    border: 1,
                    borderColor: 'custom.off_white_three',
                    borderRadius: '100px',
                  }}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
