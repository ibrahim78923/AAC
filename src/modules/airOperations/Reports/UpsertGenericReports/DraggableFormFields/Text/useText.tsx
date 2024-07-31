import { EditorState, RichUtils } from 'draft-js';
import { useMemo, useState } from 'react';

export const useText = (props: any) => {
  const { setEditorState, fontSize, color, watch } = props;
  const [edit, setEdit] = useState(true);
  const [editValue, setEditValue] = useState();
  const textTitle = watch('textTitle');
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
    setEditValue,
    editValue,
    setEdit,
    edit,
    textTitle,
  };
};
