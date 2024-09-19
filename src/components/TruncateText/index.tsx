import { Box } from '@mui/material';
import { CustomTooltip } from '../CustomTooltip';
import { truncateText } from '@/utils/avatarUtils';

export const TruncateText = (props: any) => {
  const {
    retainTextLeft,
    retainTextRight,
    text = '---',
    customTooltipProps,
    boxProps,
    size = 20,
    isCapital = true,
  } = props;

  return (
    <CustomTooltip
      title={text?.length > size ? text : ''}
      isCapital={isCapital}
      {...customTooltipProps}
    >
      <Box {...boxProps} textTransform={isCapital ? 'capitalize' : 'none'}>
        {retainTextLeft}
        {truncateText(text, size)}
        {retainTextRight}
      </Box>
    </CustomTooltip>
  );
};
