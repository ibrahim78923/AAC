import React, { useState } from 'react';
import { Box, IconButton, Stack, Button } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
// import SignatureCanvas from 'react-signature-canvas';
// import { PDFDocument } from 'pdf-lib';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { styles } from './PDFViewer.style';
import PdfAddText from '@/modules/airSocial/Contracts/CreateContract/components/PdfAddText';
import {
  TextComponentI,
  signatureFieldI,
} from '@/modules/airSocial/Contracts/CreateContract/CreateContract.interface';
import PdfAddSignature from '@/modules/airSocial/Contracts/CreateContract/components/PdfAddSignature';
import { DndContext, useDraggable, DragEndEvent } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

type PDFEditorProps = {
  pdfFile: File | string;
  addTextComponent?: TextComponentI[];
  addSignatureFields?: signatureFieldI[];
  handleDeleteText: (id: string) => void;
  handleDeleteSignature: (id: string) => void;
};

export default function PDFViewer({
  pdfFile,
  addTextComponent,
  addSignatureFields,
  handleDeleteText,
  handleDeleteSignature,
}: PDFEditorProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const sigCanvasRef = useRef<SignatureCanvas | null>(null);
  const [positions, setPositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToNextPage = () => {
    if (currentPage < (numPages || 1)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta } = event;
    const id = event.active.id;
    setPositions((prev) => ({
      ...prev,
      [id]: {
        x: (prev[id]?.x || 0) + delta.x,
        y: (prev[id]?.y || 0) + delta.y,
      },
    }));
  };

  return (
    <Box sx={styles?.pdfViewer}>
      <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
        <Button
          onClick={goToPrevPage}
          disabled={currentPage <= 1}
          variant="contained"
        >
          Previous
        </Button>
        <Button
          onClick={goToNextPage}
          disabled={currentPage >= (numPages || 1)}
          variant="contained"
        >
          Next
        </Button>
      </Stack>
      <DndContext
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page key={`page_${currentPage}`} pageNumber={currentPage}>
            {addTextComponent?.map((item) => {
              return (
                <DraggableText
                  key={item.id}
                  id={item.id}
                  position={positions[item.id] || { x: item.x, y: item.y }}
                  updatePosition={(newPosition) => {
                    setPositions((prev) => ({
                      ...prev,
                      [item.id]: newPosition,
                    }));
                  }}
                >
                  <PdfAddText data={item} handleDeleteText={handleDeleteText} />
                </DraggableText>
              );
            })}
            {addSignatureFields?.map((item) => (
              <DraggableText
                key={item.id}
                id={item.id}
                position={positions[item.id] || { x: item.x, y: item.y }}
                updatePosition={(newPosition) => {
                  setPositions((prev) => ({
                    ...prev,
                    [item.id]: newPosition,
                  }));
                }}
              >
                <PdfAddSignature
                  data={item}
                  handleDeleteSignature={handleDeleteSignature}
                />
              </DraggableText>
            ))}
          </Page>
        </Document>
      </DndContext>
    </Box>
  );
}

// DraggableText Component
type DraggableTextProps = {
  id: string;
  children: React.ReactNode;
  position: { x: number; y: number };
  updatePosition: (pos: { x: number; y: number }) => void;
};

function DraggableText({ id, children, position }: DraggableTextProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  // Calculate temporary position during drag
  const currentX = position.x + (transform?.x || 0);
  const currentY = position.y + (transform?.y || 0);

  const style = {
    position: 'absolute',
    top: currentY,
    left: currentX,
    zIndex: 100,
    width: '100%',
    maxWidth: '430px',
  };

  return (
    <Box ref={setNodeRef} sx={style}>
      <IconButton
        {...listeners}
        {...attributes}
        sx={{
          fontSize: '20px',
          cursor: 'move',
          position: 'absolute',
          top: '5px',
          left: '10px',
          '& > svg': {
            height: '20px',
            width: '20px',
          },
        }}
      >
        <DragIndicatorIcon />
      </IconButton>
      {children}
    </Box>
  );
}
