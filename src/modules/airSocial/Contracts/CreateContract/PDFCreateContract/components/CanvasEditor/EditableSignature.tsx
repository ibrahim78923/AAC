import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Group, Rect, Text, Transformer } from 'react-konva';
import Konva from 'konva';
import { ISignee } from '@/redux/slices/airSocial/contracts/pdf-contract/types';

interface EditableSignatureProps {
  id: string;
  x: number;
  y: number;
  signee: ISignee;
  isSelected: boolean;
  onSelect: () => void;
  onPositionChange: (x: number, y: number) => void;
  onDelete: () => void;
  pageWidth: number;
  pageHeight: number;
}

const EditableSignature: React.FC<EditableSignatureProps> = ({
  x,
  y,
  signee,
  isSelected,
  onSelect,
  onPositionChange,
  onDelete,
  pageWidth,
  pageHeight,
}) => {
  const signatureRef = useRef<Konva.Group>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const [dimensions, setDimensions] = useState({ width: 150, height: 60 });
  const [labelHeight] = useState(16);

  // Update transformer when selection changes
  useEffect(() => {
    if (isSelected && trRef.current && signatureRef.current) {
      trRef.current.nodes([signatureRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleTransform = useCallback(() => {
    const node = signatureRef.current;
    if (!node) return;

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    setDimensions({
      width: Math.max(30, dimensions.width * scaleX),
      height: Math.max(30, dimensions.height * scaleY),
    });

    // Reset scale after transform
    node.scaleX(1);
    node.scaleY(1);
  }, [dimensions]);

  const handleDragBound = useCallback(
    (pos: { x: number; y: number }) => {
      return {
        x: Math.max(0, Math.min(pos.x, pageWidth - dimensions.width)),
        y: Math.max(
          labelHeight,
          Math.min(pos.y, pageHeight - dimensions.height),
        ),
      };
    },
    [pageWidth, pageHeight, dimensions, labelHeight],
  );

  // Handle delete key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSelected && e.key === 'Delete') {
        onDelete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSelected, onDelete]);

  return (
    <>
      <Group
        ref={signatureRef}
        x={x}
        y={y}
        draggable
        dragBoundFunc={handleDragBound}
        onClick={(e) => {
          e.cancelBubble = true;
          onSelect();
        }}
        onTap={(e) => {
          e.cancelBubble = true;
          onSelect();
        }}
        onDragEnd={(e) => {
          onPositionChange(e.target.x(), e.target.y());
        }}
        onTransform={handleTransform}
      >
        <Text
          text={signee.name}
          x={0}
          y={-labelHeight}
          fontSize={12}
          fill="#333"
          width={dimensions.width}
          fontStyle="bold"
        />
        <Rect
          width={dimensions.width}
          height={dimensions.height}
          fill="#f0f0f0"
          stroke="#333"
          strokeWidth={1}
          cornerRadius={4}
        />
      </Group>

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => ({
            ...newBox,
            width: Math.max(30, newBox.width),
            height: Math.max(30, newBox.height),
          })}
        />
      )}
    </>
  );
};

export default EditableSignature;
