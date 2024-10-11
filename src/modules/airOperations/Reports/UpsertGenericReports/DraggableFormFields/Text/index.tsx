import { Box } from '@mui/material';
import { useText } from './useText';
import { Editor } from 'draft-js';
import { setEditorState } from '@/redux/slices/genericReport/genericReportSlice';
import { TruncateText } from '@/components/TruncateText';

export const Text = (props: any) => {
  const { handleKeyCommand, styleMap, editorState, dispatch, textTitle } =
    useText(props);

  return (
    <>
      <TruncateText text={textTitle} />
      <Box height={'65vh'} overflow={'scroll'} pb={1}>
        <Box
          border={1}
          borderColor={'grey.900'}
          p={'0.5rem 1.4rem'}
          borderRadius={1}
        >
          <Editor
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={(newEditorState) =>
              dispatch(setEditorState(newEditorState))
            }
            customStyleMap={styleMap}
          />
        </Box>
      </Box>
    </>
  );
};
