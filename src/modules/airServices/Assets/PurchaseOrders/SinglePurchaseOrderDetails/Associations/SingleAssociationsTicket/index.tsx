import { Box, Button, Typography, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export const SingleAssociationsTicket = ({ associationsTicketData }: any) => {
  const theme: any = useTheme();
  return (
    <>
      {associationsTicketData?.map((item: any) => (
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          boxShadow={2}
          borderLeft={`.5rem solid ${theme?.palette?.primary?.main}`}
          borderRadius={'.6rem'}
          padding={'.7rem'}
          key={uuidv4()}
        >
          <Typography>{item?.title}</Typography>
          <Button
            sx={{
              backgroundColor: theme?.palette?.primary?.light,
              borderRadius: '1rem',
            }}
          >
            {item?.buttonText}
          </Button>
        </Box>
      ))}
    </>
  );
};
