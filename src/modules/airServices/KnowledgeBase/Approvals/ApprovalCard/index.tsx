import { Box, Chip, Typography, useTheme } from '@mui/material';

const ApprovalCard = (props: any) => {
  const { title, folder, author, sendApproval, disabled } = props;
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        textTransform: 'capitalize',
        flexWrap: 'wrap',
        p: 1.6,
        boxShadow: `0rem 0.125rem 0.25rem -0.125rem ${theme?.palette?.custom?.transparent_dark_blue}, 0rem 0.25rem 0.5rem -0.125rem ${theme?.palette?.custom?.transparent_dark_blue}`,
        borderRadius: 4,
        gap: 1,
      }}
    >
      <Box>
        <Typography color={'primary.main'} fontWeight={500} variant="h5">
          {title?.length > 20 ? `${title?.slice?.(0, 20)} ...` : title}
        </Typography>
        <Typography
          variant="body3"
          color="slateBlue.main"
          fontWeight={600}
          component={'span'}
        >
          folder:
        </Typography>
        <Typography
          variant="body3"
          fontWeight={600}
          color="slateBlue.main"
          component={'span'}
        >
          {folder?.length > 20 ? `${folder?.slice?.(0, 20)} ...` : folder}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="body3"
          color="slateBlue.main"
          fontWeight={600}
          component={'p'}
        >
          author
        </Typography>
        <Typography variant="body3" fontWeight={500} color="slateBlue.main">
          {author}
        </Typography>
      </Box>
      <Chip
        label={'Approve'}
        variant="filled"
        sx={{
          backgroundColor: 'blue.main',
          color: 'common.white',
          '&:hover': {
            backgroundColor: 'blue.main',
          },
        }}
        disabled={disabled}
        onClick={() => sendApproval?.()}
      />
    </Box>
  );
};

export default ApprovalCard;
