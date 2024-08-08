import { EditorState, RichUtils } from 'draft-js';
import { useMemo } from 'react';
import { TextI } from './Text.interface';

export const useText = (props: TextI) => {
  const { setEditorState, fontSize, color } = props;
  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils?.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
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
  };
};
