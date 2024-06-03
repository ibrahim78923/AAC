import { TextareaAutosize } from '@mui/material';
import { useText } from './useText';

export const Text = (props: any) => {
  const {
    setText,
    bold,
    italic,
    underline,
    color,
    fontSize,
    textAlign,
    formattedText,
  } = props;
  const { paddingTop, paddingBottom } = useText(props);

  return (
    <>
      <TextareaAutosize
        minRows={20}
        style={{
          fontWeight: bold ? 'bold' : 'normal',
          fontStyle: italic ? 'italic' : 'normal',
          textDecoration: underline ? 'underline' : 'none',
          color: color,
          fontSize: fontSize,
          textAlign: textAlign as any,
          paddingTop: paddingTop,
          paddingBottom: paddingBottom,
        }}
        value={formattedText}
        onChange={(e: any) => setText(e.target.value)}
      />
    </>
  );
};
