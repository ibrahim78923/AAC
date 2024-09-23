import { pxToRem } from '@/utils/getFontValue';
import {
  Box,
  Chip,
  LinearProgress,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { ApprovalCardI } from './ApprovalCard.interface';
import { TruncateText } from '@/components/TruncateText';

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
        textTransform: 'capitalize',
        flexWrap: 'wrap',
        p: 1.6,
        boxShadow: `0rem 0.125rem 0.25rem -0.125rem ${theme?.palette?.custom?.transparent_dark_blue}, 0rem 0.25rem 0.5rem -0.125rem ${theme?.palette?.custom?.transparent_dark_blue}`,
        borderRadius: 4,
        gap: 1,
      }}
    >
      <Box>
        <Typography
          color={'primary.main'}
          fontWeight={'fontWeightSmall'}
          variant="h5"
        >
          <TruncateText
            text={title?.toLowerCase()}
            boxProps={{
              component: 'span',
            }}
          />
        </Typography>
        <Typography
          variant="body3"
          color="slateBlue.main"
          fontWeight={'fontWeightMedium'}
          component={'span'}
        >
          folder:
        </Typography>
        <Typography
          variant="body3"
          fontWeight={'fontWeightMedium'}
          color="slateBlue.main"
          component={'span'}
        >
          <TruncateText
            text={folder?.toLowerCase()}
            boxProps={{
              component: 'span',
            }}
          />
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="body3"
          color="slateBlue.main"
          fontWeight={'fontWeightMedium'}
          component={'p'}
        >
          author
        </Typography>
        <Typography
          variant="body3"
          fontWeight={'fontWeightSmall'}
          color="slateBlue.main"
        >
          {author}
        </Typography>
      </Box>
      <Chip
        label={
          isLoading ? <LinearProgress sx={{ width: pxToRem(70) }} /> : 'Approve'
        }
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
