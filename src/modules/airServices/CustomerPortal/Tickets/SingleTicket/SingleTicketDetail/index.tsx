import { Box, Typography, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export const SingleTicketDetail = ({ singleTicketDetailData }: any) => {
  const theme = useTheme();
  return (
    <Box display={'flex'}>
      <Box width={'70%'} height={'20rem'} overflow={'scroll'}>
        <Typography variant="h4">{singleTicketDetailData.heading}</Typography>
        <Box display={'flex'} alignItems={'center'} mt={1}>
          <Typography variant="body3">
            Created on {singleTicketDetailData.createdOn} -
          </Typography>
          <Typography variant="body3" color="primary">
            Via Portal
          </Typography>
        </Box>
        <Typography variant="body2" mt={1}>
          Description:
          <br />
          {singleTicketDetailData.description}
        </Typography>
        <Typography variant="body2" mt={1}>
          Features :<br />
          {singleTicketDetailData?.features?.map((option: any) => (
            <option key={uuidv4()}>{option?.feature}</option>
          ))}
        </Typography>
        <Typography variant="body2" mt={1}>
          System Requirements
          <br />
          Windows :<br />
          <ul style={{ listStyleType: 'disc' }}>
            {singleTicketDetailData?.windows?.map((option: any) => (
              <li key={uuidv4()}>{option?.window}</li>
            ))}
          </ul>
        </Typography>

        <Typography variant="body2" mt={1}>
          Mac OS :<br />
          <ul style={{ listStyleType: 'disc' }}>
            {singleTicketDetailData?.macOS?.map((option: any) => (
              <li key={uuidv4()}>{option?.mac}</li>
            ))}
          </ul>
        </Typography>
      </Box>
      <Box
        gap={1}
        display={'flex'}
        flexDirection={'column'}
        width={'30%'}
        padding={2}
      >
        <Typography variant="h4">AGENT WORKING ON</Typography>
        <Typography variant="h6" color={theme?.palette?.error?.main}>
          No Agent
        </Typography>

        <Typography variant="h4" mt={3}>
          Status
        </Typography>
        <Typography
          variant="body1"
          borderRadius={3}
          bgcolor={theme?.palette?.primary?.main}
          width={'5rem'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          Closed
        </Typography>
      </Box>
    </Box>
  );
};
