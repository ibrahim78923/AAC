import { Box } from '@mui/material';
import { HtmlRendererPropsI } from '../DataDisplay.interface';

export const HtmlRenderer = (props: HtmlRendererPropsI) => {
  const { description, maxHeight = '10vh' } = props;

  return (
    <Box
      sx={{
        color: 'custom.mulled_wine',
        overflow: 'auto',
        maxHeight,
        my: 1,
        py: 0.5,
        wordBreak: 'break-word',
        '&::-webkit-scrollbar': {
          width: 2,
          height: 2,
        },
      }}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
};
