import { Box, Chip, Theme, Typography, useTheme } from '@mui/material';
import { ApprovalCardI } from './ApprovalCard.interface';
import { TruncateText } from '@/components/TruncateText';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';

const ApprovalCard = (props: ApprovalCardI) => {
  const {
    title = '---',
    folder = '---',
    author,
    sendApproval,
    disabled,
    isLoading,
  } = props;

  const theme: Theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        p: 1.5,
        boxShadow: `0rem 0.125rem 0.25rem -0.125rem ${theme?.palette?.custom?.transparent_dark_blue}, 0rem 0.25rem 0.5rem -0.125rem ${theme?.palette?.custom?.transparent_dark_blue}`,
        borderRadius: 4,
        gap: 2,
        mb: 1.5,
      }}
    >
      <Box flex={1}>
        <Typography
          color={'primary.main'}
          fontWeight={'fontWeightSmall'}
          variant="body2"
          sx={{ wordBreak: 'break-all' }}
          component={'div'}
        >
          <TruncateText text={title?.toLowerCase()} />
        </Typography>
        <Box display={'flex'} gap={0.2} flexWrap={'wrap'}>
          <Typography
            variant="body3"
            color="slateBlue.main"
            fontWeight={'fontWeightMedium'}
            component={'div'}
          >
            Folder:
          </Typography>
          <Typography
            variant="body3"
            fontWeight={'fontWeightMedium'}
            color="slateBlue.main"
            component={'div'}
          >
            <TruncateText text={folder?.toLowerCase()} />
          </Typography>
        </Box>
      </Box>
      <Box flex={0.5}>
        <Typography
          variant="body3"
          color="slateBlue.main"
          fontWeight={'fontWeightMedium'}
          component={'p'}
        >
          Author
        </Typography>
        <Typography
          variant="body3"
          fontWeight={'fontWeightSmall'}
          color="slateBlue.main"
          textTransform={'capitalize'}
        >
          {author}
        </Typography>
      </Box>
      <Box flex={0.3} textAlign={'end'}>
        <Chip
          label={isLoading ? <CustomLinearProgress /> : 'Approve'}
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
    </Box>
  );
};

export default ApprovalCard;
