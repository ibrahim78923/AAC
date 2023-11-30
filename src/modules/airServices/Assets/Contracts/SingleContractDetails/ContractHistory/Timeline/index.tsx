import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material';

export const Timeline = ({ data }: any) => {
  const theme = useTheme();
  return (
    <>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        gap={1.25}
        marginBottom={1.5}
      >
        <Typography variant="body3" sx={{ flex: 0.15 }}>
          {' '}
          {data?.date}
        </Typography>
        <IconButton
          disabled
          color="primary"
          sx={{ border: `1px solid ${theme?.palette?.primary?.main}` }}
        >
          <BorderColorIcon color="primary" />
        </IconButton>
        <Box sx={{ flex: 0.8 }}>
          {' '}
          <Typography
            variant="body2"
            fontWeight={600}
            color="primary"
            marginRight={0.3}
          >
            {data?.status}
          </Typography>
          <Typography variant="body2" fontWeight={600}>
            {data?.description}
          </Typography>
          <Box
            display={'flex'}
            marginY={'.4rem'}
            alignItems={'center'}
            gap={1.5}
          >
            <Button
              size="small"
              sx={{
                color: theme?.palette?.grey?.[600],
                background: theme?.palette?.primary?.light,
                fontSize: '0.8rem',
                fontWeight: 400,
                ':hover': {
                  background: theme?.palette?.primary?.light,
                },
              }}
            >
              Cost: {data?.cost}
            </Button>
            <Button
              size="small"
              sx={{
                color: theme?.palette?.grey?.[600],
                background: theme?.palette?.primary?.light,
                fontSize: '0.8rem',
                fontWeight: 400,
                ':hover': {
                  background: theme?.palette?.primary?.light,
                },
              }}
            >
              createdBy : {data?.createdBy}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        gap={1.3}
        marginBottom={1.5}
      >
        <Box flex={0.15}></Box>
        <Box></Box>
        <Divider
          orientation="vertical"
          sx={{
            borderRadius: '20px',
            background: theme?.palette?.primary?.light,
            width: '4px',
            height: '49px',
          }}
        />
        <Box flex={0.8}></Box>
      </Box>
    </>
  );
};
