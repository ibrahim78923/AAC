import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { fieldManager } from './FieldManager.data';

export default function FieldManager() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <>
      <Typography variant="h3">Field Manager</Typography>
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
