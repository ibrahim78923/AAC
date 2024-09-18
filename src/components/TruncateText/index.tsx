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
  } = props;
  return (
    <CustomTooltip title={text} {...customTooltipProps}>
      <Box {...boxProps}>
        {retainTextLeft}
        {truncateText(text, size)}
        {retainTextRight}
      </Box>
    </CustomTooltip>
  );
};
