import React, { useCallback, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import EditableText from './EditableText';
import EditableSignature from './EditableSignature';
import Konva from 'konva';
import {
  updateTextComponentPosition,
  updateTextComponentContent,
  deleteTextComponent,
  updateSignaturePosition,
  deleteSignatureComponent,
} from '@/redux/slices/airSocial/contracts/pdf-contract/slice';

interface CanvasEditorProps {
  page: number;
  pageWidth: number;
  pageHeight: number;
  scale: number;
  readonly?: boolean;
  onSignatureClick?: () => void;
  signees?: any;
}

const CanvasEditor = ({
  page,
  pageWidth,
  pageHeight,
  scale,
  readonly = false,
  onSignatureClick,
  signees,
}: CanvasEditorProps) => {
  const stageRef = useRef<Konva.Stage>(null);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [selectedType, setSelectedType] = React.useState<
    'text' | 'signature' | null
  >(null);

  // Get filtered components for current page
  const { textComponents, signatureComponents } = useSelector(
    (state: RootState) => ({
      textComponents: state.airSocialPdfContract.textComponents.filter(
        (c) => c.page === page,
      ),
      signatureComponents:
        state.airSocialPdfContract.signatureComponents.filter(
          (c) => c.page === page,
        ),
    }),
  );

  // Manipulate singature components if signees have signatureAttachment
  const signatureComponentsWithAttachment = signatureComponents.map(
    (component: any) => {
      const matchingSignee = signees?.find(
        (s: any) => s.email === component?.signee?.email,
      );
      if (matchingSignee && matchingSignee.signatureAttachment) {
        return {
          ...component,
          signee: {
            ...component.signee,
            signatureAttachment: matchingSignee?.signatureAttachment,
          },
        };
      }
      return component;
    },
  );

  // const handleTextChange = (id: string, newText: string) => {
  //   dispatch(updateTextComponentContent({ id, text: newText }));
  // };

  // Common handler for position changes
  const handlePositionChange = useCallback(
    (type: 'text' | 'signature') => (id: string, x: number, y: number) => {
      const action =
        type === 'text' ? updateTextComponentPosition : updateSignaturePosition;
      dispatch(action({ id, x: x / scale, y: y / scale }));
    },
    [dispatch, scale],
  );

  // Common handler for deletions
  const handleDelete = useCallback(
    (type: 'text' | 'signature') => (id: string) => {
      const action =
        type === 'text' ? deleteTextComponent : deleteSignatureComponent;
      dispatch(action(id));
      if (selectedId === id && selectedType === type) {
        setSelectedId(null);
        setSelectedType(null);
      }
    },
    [dispatch, selectedId, selectedType],
  );

  const handleSelect = useCallback((type: 'text' | 'signature', id: string) => {
    setSelectedId(id);
    setSelectedType(type);
  }, []);

  return (
    <Stage
      ref={stageRef}
      width={pageWidth}
      height={pageHeight}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'all',
        zIndex: 111,
      }}
    >
      <Layer>
        {textComponents.map((item) => (
          <EditableText
            key={`text-${item.id}`}
            {...item}
            x={item.x * scale}
            y={item.y * scale}
            // text={item.text}
            isSelected={selectedId === item.id && selectedType === 'text'}
            onSelect={() => !readonly && handleSelect('text', item.id)}
            onTextChange={(text) =>
              !readonly &&
              dispatch(updateTextComponentContent({ id: item.id, text }))
            }
            onPositionChange={(x, y) =>
              !readonly && handlePositionChange('text')(item.id, x, y)
            }
            onDelete={() => handleDelete('text')(item.id)}
            pageWidth={pageWidth}
            pageHeight={pageHeight}
            readonly={readonly}
          />
        ))}

        {/* Render signature components */}
        {signatureComponentsWithAttachment.map((item) => {
          return (
            <EditableSignature
              key={`signature-${item.id}`}
              {...item}
              x={item.x * scale}
              y={item.y * scale}
              isSelected={
                selectedId === item.id && selectedType === 'signature'
              }
              onSelect={() => !readonly && handleSelect('signature', item.id)}
              onPositionChange={(x, y) =>
                !readonly && handlePositionChange('signature')(item.id, x, y)
              }
              onDelete={() => !readonly && handleDelete('signature')(item.id)}
              pageWidth={pageWidth}
              pageHeight={pageHeight}
              stageRef={stageRef}
              readonly={readonly}
              onSignatureClick={onSignatureClick}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default CanvasEditor;
