// EditableText.tsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { Text, Transformer } from 'react-konva';
import { Text as KonvaText } from 'konva/lib/shapes/Text';
import TextEditor from './TextEditor';
import Konva from 'konva';

interface EditableTextProps {
  x: number;
  y: number;
  text: string;
  isSelected: boolean;
  onSelect: () => void;
  onTextChange: (newText: string) => void;
  onPositionChange: (x: number, y: number) => void;
  onDelete: () => void;
  pageWidth: number;
  pageHeight: number;
  readonly: boolean;
}

const EditableText = ({
  x,
  y,
  text,
  isSelected,
  onSelect,
  onTextChange,
  onPositionChange,
  onDelete,
  pageWidth,
  pageHeight,
  readonly = false,
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textWidth, setTextWidth] = useState(200);
  const textRef = useRef<KonvaText>(null);
  const trRef = useRef<Konva.Transformer>(null);

  // Update transformer when selection changes
  useEffect(() => {
    if (isSelected && trRef.current && textRef.current && !isEditing) {
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, isEditing]);

  const handleEditStart = useCallback(() => {
    setIsEditing(true);
    onSelect();
  }, [onSelect]);

  const handleEditEnd = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleTextDblClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      e.cancelBubble = true;
      setTimeout(() => {
        handleEditStart();
      }, 10);
    },
    [handleEditStart],
  );

  const handleTextDblTap = useCallback(
    (e: Konva.KonvaEventObject<TouchEvent>) => {
      e.cancelBubble = true;
      setTimeout(() => {
        handleEditStart();
      }, 10);
    },
    [handleEditStart],
  );

  const handleTransform = useCallback(() => {
    const node = textRef.current;
    if (!node) return;

    const scaleX = node.scaleX();
    const newWidth = Math.max(30, node.width() * scaleX);
    setTextWidth(newWidth);
    node.scaleX(1);
    node.width(newWidth);
  }, []);

  const handleDragBound = useCallback(
    (pos: { x: number; y: number }) => {
      const node = textRef.current;
      if (!node) return pos;

      // Get the current width and height of the text
      const width = node.width() * node.scaleX();
      const height = node.height() * node.scaleY();

      // Calculate boundaries
      const minX = 0;
      const minY = 0;
      const maxX = pageWidth - width;
      const maxY = pageHeight - height;

      // Constrain position within boundaries
      return {
        x: Math.max(minX, Math.min(pos.x, maxX)),
        y: Math.max(minY, Math.min(pos.y, maxY)),
      };
    },
    [pageWidth, pageHeight],
  );

  // Handle delete key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSelected && e.key === 'Delete' && !isEditing) {
        onDelete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSelected, onDelete, isEditing]);

  return (
    <>
      <Text
        ref={textRef}
        text={text}
        x={x}
        y={y}
        fontSize={20}
        fill={'#2e74b5'}
        draggable={!readonly}
        width={textWidth}
        dragBoundFunc={!readonly ? handleDragBound : undefined}
        onDblClick={!readonly ? handleTextDblClick : undefined}
        onDblTap={!readonly ? handleTextDblTap : undefined}
        onClick={(e) => {
          if (readonly) return;
          e.cancelBubble = true;
          if (!isEditing) onSelect();
        }}
        onTap={(e) => {
          if (readonly) return;
          e.cancelBubble = true;
          if (!isEditing) onSelect();
        }}
        onTransform={!readonly ? handleTransform : undefined}
        onDragEnd={(e) => {
          if (!isEditing && !readonly)
            onPositionChange(e.target.x(), e.target.y());
        }}
      />

      {isEditing && !readonly && (
        <TextEditor
          textNode={textRef.current!}
          onChange={(newText) => {
            onTextChange(newText);
            handleEditEnd();
          }}
          onClose={handleEditEnd}
          onDelete={onDelete}
        />
      )}

      {isSelected && !isEditing && !readonly && (
        <Transformer
          ref={trRef}
          enabledAnchors={['middle-left', 'middle-right']}
          boundBoxFunc={(oldBox, newBox) => ({
            ...newBox,
            width: Math.max(30, newBox.width),
          })}
          onDblClick={handleTextDblClick}
          onDblTap={handleTextDblTap}
        />
      )}
    </>
  );
};

export default EditableText;
