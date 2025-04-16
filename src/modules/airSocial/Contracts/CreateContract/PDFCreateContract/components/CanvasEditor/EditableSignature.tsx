import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Group,
  Rect,
  Text,
  Transformer,
  Circle,
  Path,
  Image,
} from 'react-konva';
import Konva from 'konva';
import { ISignee } from '@/redux/slices/airSocial/contracts/pdf-contract/types';
import { generateImage } from '@/utils/avatarUtils';

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
  stageRef: React.RefObject<Konva.Stage>;
  readonly: boolean;
  onSignatureClick?: (e: any, signee: any) => void;
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
  stageRef,
  readonly = false,
  onSignatureClick,
}) => {
  const signatureRef = useRef<Konva.Group>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const deleteButtonRef = useRef<Konva.Group>(null);
  const [dimensions, setDimensions] = useState({ width: 150, height: 60 });
  const [labelHeight] = useState(16);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [signatureImage, setSignatureImage] = useState<HTMLImageElement | null>(
    null,
  );
  const [imageError, setImageError] = useState(false);

  // Hide delete button when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!stageRef.current || !showDeleteButton) return;

      const target = e.target as HTMLElement;
      // Check if click was on the canvas (not some other HTML element)
      if (!target.closest('.konvajs-content')) return;

      const mousePos = stageRef.current.getPointerPosition();
      if (!mousePos) return;

      // Check if click was on the delete button
      const deleteButton = deleteButtonRef.current;
      if (deleteButton && deleteButton.getClientRect({ skipTransform: true })) {
        const deleteButtonRect = deleteButton.getClientRect({
          skipTransform: false,
        });
        if (
          deleteButtonRect.x <= mousePos.x &&
          deleteButtonRect.x + deleteButtonRect.width >= mousePos.x &&
          deleteButtonRect.y <= mousePos.y &&
          deleteButtonRect.y + deleteButtonRect.height >= mousePos.y
        ) {
          return; // Click was on delete button, don't hide
        }
      }

      // Check if click was on the signature group
      const signature = signatureRef.current;
      if (signature) {
        const signatureRect = signature.getClientRect({
          skipTransform: false,
        });
        if (
          signatureRect.x <= mousePos.x &&
          signatureRect.x + signatureRect.width >= mousePos.x &&
          signatureRect.y <= mousePos.y &&
          signatureRect.y + signatureRect.height >= mousePos.y
        ) {
          return; // Click was on signature, don't hide
        }
      }

      // Click was outside both signature and delete button
      setShowDeleteButton(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDeleteButton, stageRef]);

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

  useEffect(() => {
    if (!signee?.signatureAttachment) {
      setSignatureImage(null);
      return;
    }

    const img = new window.Image();
    img.crossOrigin = 'Anonymous'; // Important for CORS

    // Handle S3 URL (add timestamp to avoid caching issues)
    const url = generateImage(signee.signatureAttachment?.url);
    img.src = url;

    img.onload = () => {
      setImageError(false);
      setSignatureImage(img);
      // Adjust dimensions based on image aspect ratio
      const aspectRatio = img.width / img.height;
      setDimensions({
        width: 150,
        height: 150 / aspectRatio,
      });
    };

    img.onerror = () => {
      setImageError(true);
      setSignatureImage(null);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [signee]);

  const getCenteredImageProps = () => {
    if (!signatureImage || imageError) return null;

    const padding = 5;
    const maxWidth = dimensions.width - padding * 2;
    const maxHeight = dimensions.height - padding * 2;

    const imgAspect = signatureImage.width / signatureImage.height;
    let width = maxWidth;
    let height = width / imgAspect;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * imgAspect;
    }

    return {
      x: (dimensions.width - width) / 2,
      y: (dimensions.height - height) / 2,
      width,
      height,
      image: signatureImage,
    };
  };

  const centeredImageProps = getCenteredImageProps();

  return (
    <>
      <Group
        ref={signatureRef}
        x={x}
        y={y}
        draggable={!readonly}
        dragBoundFunc={!readonly ? handleDragBound : undefined}
        onClick={(e) => {
          if (readonly) {
            onSignatureClick?.(e, signee);
            return;
          }
          e.cancelBubble = true;
          onSelect();
        }}
        onTap={(e) => {
          if (readonly) return;
          e.cancelBubble = true;
          onSelect();
        }}
        onDblClick={(e) => {
          if (readonly) return;
          e.cancelBubble = true;
          setShowDeleteButton(!showDeleteButton);
        }}
        onDblTap={(e) => {
          if (readonly) return;
          e.cancelBubble = true;
          setShowDeleteButton(!showDeleteButton);
        }}
        onDragEnd={(e) => {
          if (!readonly) onPositionChange(e.target.x(), e.target.y());
        }}
        onTransform={!readonly ? handleTransform : undefined}
      >
        <Text
          text={signee?.name}
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

        {/* Signature image centered */}
        {centeredImageProps && (
          <Image {...centeredImageProps} cornerRadius={4} />
        )}

        {showDeleteButton && (
          <Group
            ref={deleteButtonRef}
            x={dimensions.width}
            y={0}
            onClick={(e) => {
              e.cancelBubble = true;
              onDelete();
            }}
            onTap={(e) => {
              e.cancelBubble = true;
              onDelete();
            }}
            onMouseEnter={() => {
              if (stageRef.current?.container()) {
                stageRef.current.container().style.cursor = 'pointer';
              }
            }}
            onMouseLeave={() => {
              if (stageRef.current?.container()) {
                stageRef.current.container().style.cursor = 'default';
              }
            }}
          >
            <Circle radius={10} fill="red" stroke="red" strokeWidth={1} />
            <Path
              data="M-4,-4 L4,4 M4,-4 L-4,4"
              stroke="white"
              strokeWidth={1.5}
            />
          </Group>
        )}
      </Group>

      {isSelected && !readonly && (
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
