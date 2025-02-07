import { Box } from '@mui/material';
import { HtmlRendererPropsI } from '../DataDisplay.interface';
import CustomTextEditor from '@/components/CustomTextEditor';
import { pxToRem } from '@/utils/getFontValue';

export const HtmlRenderer = (props: HtmlRendererPropsI) => {
  const { hasEditor = false, description, maxHeight = '10vh' } = props;

  if (hasEditor)
    return (
      <CustomTextEditor
        readOnly
        viewMode
        onChange={() => {}}
        value={description}
      />
    );

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
        '& p.ql-align-center': {
          textAlign: 'center',
        },
        '& p.ql-align-right': {
          textAlign: 'right',
        },
        '& p.ql-align-left': {
          textAlign: 'left',
        },
        '& ol': {
          paddingLeft: pxToRem(20),
        },
        '& ul': {
          paddingLeft: pxToRem(20),
        },
        '& li': {
          marginBottom: pxToRem(8),
        },
      }}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
};
