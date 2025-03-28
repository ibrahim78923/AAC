import React, { useCallback } from 'react';
import { Stage, Layer } from 'react-konva';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import EditableText from './EditableText';
import EditableSignature from './EditableSignature';
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
}

const CanvasEditor = ({
  page,
  pageWidth,
  pageHeight,
  scale,
}: CanvasEditorProps) => {
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
            onSelect={() => handleSelect('text', item.id)}
            onTextChange={(text) =>
              dispatch(updateTextComponentContent({ id: item.id, text }))
            }
            onPositionChange={(x, y) =>
              handlePositionChange('text')(item.id, x, y)
            }
            onDelete={() => handleDelete('text')(item.id)}
            pageWidth={pageWidth}
            pageHeight={pageHeight}
          />
        ))}

        {/* Render signature components */}
        {signatureComponents.map((item) => (
          <EditableSignature
            key={`signature-${item.id}`}
            {...item}
            x={item.x * scale}
            y={item.y * scale}
            isSelected={selectedId === item.id && selectedType === 'signature'}
            onSelect={() => handleSelect('signature', item.id)}
            onPositionChange={(x, y) =>
              handlePositionChange('signature')(item.id, x, y)
            }
            onDelete={() => handleDelete('signature')(item.id)}
            pageWidth={pageWidth}
            pageHeight={pageHeight}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default CanvasEditor;
