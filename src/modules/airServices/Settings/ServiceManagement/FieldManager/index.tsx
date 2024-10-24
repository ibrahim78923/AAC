import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { fieldManager } from './FieldManager.data';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AIR_SERVICES } from '@/constants/routes';

export default function FieldManager() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <ArrowBackIcon
          color={'secondary'}
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            router?.push(AIR_SERVICES?.SERVICE_MANAGEMENT);
          }}
        />
        <Typography variant="h3">Field Manager</Typography>
      </Box>
      <br />
      <Grid container spacing={3}>
        {fieldManager?.map((item: any) => (
          <Grid
            key={item?.id}
            item
            md={6}
            xs={12}
            onClick={() => {
              router?.push({
                pathname: item?.link,
              });
            }}
            sx={{ cursor: 'pointer' }}
          >
            <Box
              border={`1px solid ${theme?.palette?.primary?.main}`}
              borderRadius={2}
              p={3}
              display={'flex'}
              alignItems={'center'}
              gap={2}
            >
              <Avatar
                variant={'circular'}
                sx={{
                  backgroundColor: theme?.palette?.primary?.light,
                  width: 80,
                  height: 80,
                }}
              >
                <item.avatar sx={{ color: theme?.palette?.primary?.main }} />
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  color="slateBlue.main"
                  whiteSpace={'nowrap'}
                  mb={1}
                >
                  {item?.type}
                </Typography>
                <Typography variant="body2" color="slateBlue.main">
                  {item?.purpose}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
