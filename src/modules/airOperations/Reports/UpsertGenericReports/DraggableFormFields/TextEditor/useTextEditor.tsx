import { successSnackbar } from '@/utils/api';
import { EditorState, RichUtils, Modifier, convertToRaw } from 'draft-js';
import { useEffect, useState } from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { REPORT_TYPE, TEXT_FORMATE } from '@/constants/strings';
import { generateUniqueId } from '@/utils/dynamic-forms';
import { TextEditorI } from './TextEditor.interface';

export const useTextEditor = (props: TextEditorI) => {
  const {
    setFieldData,
    setModal,
    setFontSize,
    setColor,
    editorState,
    setEditorState,
    form,
    setForm,
    setValue,
    setDraggedItemData,
    watch,
  } = props;
  const [saveDisable, setSaveDisable] = useState(true);
  const textTitle = watch('textTitle');
  useEffect(() => {
    const rawContentState = convertToRaw(editorState?.getCurrentContent());
    const blocks = rawContentState?.blocks;
    if (blocks[0]?.text) {
      setSaveDisable(false);
    } else {
      setSaveDisable(true);
    }
  }, [editorState]);

  const applyStyle = (style: string) => {
    setEditorState(RichUtils?.toggleInlineStyle(editorState, style));
  };

  const applyTextStyle = (formate: any) => {
    if (formate === TEXT_FORMATE?.BOLD) {
      applyStyle(TEXT_FORMATE?.BOLD);
    } else if (formate === TEXT_FORMATE?.ITALIC) {
      applyStyle(TEXT_FORMATE?.ITALIC);
    } else if (formate === TEXT_FORMATE?.UNDERLINE) {
      applyStyle(TEXT_FORMATE?.UNDERLINE);
    } else if (formate === TEXT_FORMATE?.UPPER_CASE) {
      applyTransform((text: any) => text?.toUpperCase());
    } else if (formate === TEXT_FORMATE?.LOWER_CASE) {
      applyTransform((text: any) => text?.toLowerCase());
    } else if (formate === TEXT_FORMATE?.CAPITAL_CASE) {
      applyTransform(
        (text: any) => text?.replace(/\b\w/g, (l: any) => l?.toUpperCase()),
      );
    } else if (formate === TEXT_FORMATE?.UNORDERED_LIST) {
      setEditorState(
        RichUtils?.toggleBlockType(
          editorState,
          TEXT_FORMATE?.UNORDERED_LIST_ITEM,
        ),
      );
    } else if (formate === TEXT_FORMATE?.ORDERED_LIST) {
      setEditorState(
        RichUtils?.toggleBlockType(
          editorState,
          TEXT_FORMATE?.ORDERED_LIST_ITEM,
        ),
      );
    }
  };

  const applyTransform = (transform: (text: string) => string) => {
    const selection = editorState?.getSelection();
    const content = editorState?.getCurrentContent();
    const text = content
      ?.getBlockForKey(selection?.getStartKey())
      ?.getText()
      ?.slice(selection?.getStartOffset(), selection?.getEndOffset());
    const transformedText = transform(text);
    const newContent = Modifier?.replaceText(
      content,
      selection,
      transformedText,
    );
    setEditorState(
      EditorState?.push(
        editorState,
        newContent,
        TEXT_FORMATE?.CHANGE_INLINE_STYLE,
      ),
    );
  };

  const removeInlineStyles = (editorState: EditorState, styles: string[]) => {
    const selection = editorState?.getSelection();
    const contentState = editorState?.getCurrentContent();
    let newContentState = contentState;
    styles?.forEach((style: any) => {
      newContentState = Modifier?.removeInlineStyle(
        newContentState,
        selection,
        style,
      );
    });
    return EditorState?.push(
      editorState,
      newContentState,
      TEXT_FORMATE?.CHANGE_INLINE_STYLE,
    );
  };

  const applyInlineStyle = (editorState: EditorState, style: string) => {
    const selection = editorState?.getSelection();
    const nextContentState = Modifier?.applyInlineStyle(
      editorState?.getCurrentContent(),
      selection,
      style,
    );
    return EditorState?.push(
      editorState,
      nextContentState,
      TEXT_FORMATE?.CHANGE_INLINE_STYLE,
    );
  };

  const onFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFontSize = event?.target?.value;
    setFontSize(newFontSize);
    let newEditorState = editorState;
    const currentStyles = editorState?.getCurrentInlineStyle();
    currentStyles?.forEach((style: any) => {
      if (style?.startsWith('FONT_SIZE_')) {
        newEditorState = removeInlineStyles(newEditorState, [style]);
      }
    });
    newEditorState = applyInlineStyle(
      newEditorState,
      `FONT_SIZE_${newFontSize}`,
    );
    setEditorState(newEditorState);
  };

  const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event?.target?.value;
    setColor(newColor);
    let newEditorState = editorState;
    const currentStyles = editorState?.getCurrentInlineStyle();
    currentStyles?.forEach((style: any) => {
      if (style?.startsWith('COLOR_')) {
        newEditorState = removeInlineStyles(newEditorState, [style]);
      }
    });
    newEditorState = applyInlineStyle(newEditorState, `COLOR_${newColor}`);
    setEditorState(newEditorState);
  };

  const getTextFromEditorHTML = () => {
    const contentState = editorState?.getCurrentContent();
    const contentRaw = convertToRaw(contentState);
    const allColors = new Set();
    contentRaw?.blocks?.forEach((block: any) => {
      block?.inlineStyleRanges?.forEach((range: any) => {
        if (range?.style?.startsWith('COLOR_')) {
          allColors?.add(range?.style);
        }
      });
    });
    const options = {
      inlineStyles: {
        BOLD: { element: 'strong' },
        ITALIC: { element: 'em' },
        UNDERLINE: { element: 'u' },
        ...Array?.from({ length: 15 }, (_: any, i: any) => 10 + i * 2)?.reduce(
          (
            acc: { [key: string]: { style: { fontSize: string } } },
            size: any,
          ) => {
            acc[`FONT_SIZE_${size as any}px`] = {
              style: { fontSize: `${size}px` },
            };
            return acc;
          },
          {},
        ),
        ...Array?.from(allColors)?.reduce(
          (acc: { [key: string]: { style: { color: any } } }, color: any) => {
            const colorValue = (color as any)?.split('_')[1] as any;
            acc[color as any] = { style: { color: colorValue } } as any;
            return acc;
          },
          {},
        ),
      },
    };
    const htmlContent = stateToHTML(contentState, options);
    const uniqueId = generateUniqueId();
    setForm([
      ...form,
      {
        id: uniqueId,
        component: htmlContent,
        title: textTitle,
        type: REPORT_TYPE?.TEXT,
      },
    ]);
  };

  const handleSave = () => {
    getTextFromEditorHTML();
    setFieldData(false);
    setModal({
      chart: false,
      text: false,
      table: false,
      counter: false,
    });
    setValue('textTitle', 'Report Text');
    setEditorState(EditorState.createEmpty());
    setDraggedItemData(null);
    successSnackbar('Text Added');
  };

  return {
    handleSave,
    applyTextStyle,
    onColorChange,
    onFontSizeChange,
    saveDisable,
    textTitle,
  };
};
