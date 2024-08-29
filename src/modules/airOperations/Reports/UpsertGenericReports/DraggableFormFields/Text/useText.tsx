import { EditorState, RichUtils } from 'draft-js';
import { useMemo } from 'react';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setEditorState } from '@/redux/slices/genericReport/genericReportSlice';

export const useText = () => {
  const dispatch = useDispatch();
  const color = useAppSelector((state) => state?.genericReport?.color);
  const fontSize = useAppSelector((state) => state?.genericReport?.fontSize);
  const editorState = useAppSelector(
    (state) => state?.genericReport?.editorState,
  );
  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils?.handleKeyCommand(editorState, command);
    if (newState) {
      dispatch(setEditorState(newState));
      return 'handled';
    }
    return 'not-handled';
  };
  const styleMap = useMemo(
    () => ({
      [`FONT_SIZE_${fontSize}`]: {
        fontSize,
      },
      [`COLOR_${color}`]: {
        color,
      },
    }),
    [fontSize, color],
  );

  return {
    handleKeyCommand,
    styleMap,
    editorState,
    dispatch,
  };
};
