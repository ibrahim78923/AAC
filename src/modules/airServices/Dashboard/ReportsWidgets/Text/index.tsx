import { truncateText } from '@/utils/avatarUtils';
import { Box, Typography } from '@mui/material';

export const Text = (props: any) => {
  const { title, description } = props;
  return (
    <>
      <Typography variant="h3" fontWeight={600} color="slateBlue.main" my={2}>
        {truncateText(title, 40)}
      </Typography>
      <Box
        sx={{ wordBreak: 'break-all' }}
        dangerouslySetInnerHTML={{ __html: description }}
      ></Box>
    </>
  );
};
