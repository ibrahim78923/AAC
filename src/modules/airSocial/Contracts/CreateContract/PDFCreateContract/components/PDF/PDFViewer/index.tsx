import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box, Stack, Button } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
// import SignatureCanvas from 'react-signature-canvas';
import { PDFDocument, rgb } from 'pdf-lib';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { styles } from './PDFViewer.style';
import PdfAddText from '../PdfAddText';

import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import DraggableText from '../../Draggable/DraggableText';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  setCurrentPage,
  setTextComponents,
  updateSignaturePosition,
  updateTextComponentPosition,
} from '@/redux/slices/airSocial/contracts/pdf-contract/slice';
import { errorSnackbar } from '@/lib/snackbar';
import PdfAddSignature from '../PdfAddSignature';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface PDFViewerProps {
  pdfFile: File | string;
  onUpdatePdf: (newPdfUrl: string) => void;
}

export default function PDFViewer({ pdfFile, onUpdatePdf }: PDFViewerProps) {
  const dispatch = useDispatch();
  const textComponents = useSelector(
    (state: RootState) => state.airSocialPdfContract.textComponents,
  );

  const signatureComponents = useSelector(
    (state: RootState) => state.airSocialPdfContract.signatureComponents,
  );

  const currentPage = useSelector(
    (state: RootState) => state.airSocialPdfContract.currentPage,
  );

  const setPage = (page: number) => dispatch(setCurrentPage(page));

  const updateTextPosition = useCallback(
    (id: string, x: number, y: number) => {
      dispatch(updateTextComponentPosition({ id, x, y }));
    },
    [dispatch],
  );

  const [numPages, setNumPages] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(600);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const id = active.id as string;

    // Check if the dragged item is a text or signature
    const prevTextPosition = textComponents.find((item) => item.id === id);
    if (prevTextPosition) {
      const newX = prevTextPosition.x + delta.x;
      const newY = prevTextPosition.y + delta.y;
      updateTextPosition(id, newX, newY);
      return;
    }

    const prevSignaturePosition = signatureComponents.find(
      (item) => item.id === id,
    );
    if (prevSignaturePosition) {
      const newX = prevSignaturePosition.x + delta.x;
      const newY = prevSignaturePosition.y + delta.y;
      dispatch(updateSignaturePosition({ id, x: newX, y: newY }));
    }
  };

  const handleSavePdf = async () => {
    try {
      let existingPdfBytes: ArrayBuffer;

      if (typeof pdfFile === 'string' && pdfFile.startsWith('blob:')) {
        const response = await fetch(pdfFile);
        const blob = await response.blob();
        existingPdfBytes = await blob.arrayBuffer();
      } else if (typeof pdfFile === 'string') {
        const response = await fetch(pdfFile);
        if (!response.ok) throw new Error('Failed to fetch PDF');
        existingPdfBytes = await response.arrayBuffer();
      } else if (pdfFile instanceof File) {
        existingPdfBytes = await pdfFile.arrayBuffer();
      } else {
        errorSnackbar(`Invalid PDF source: ${pdfFile}`);
        return;
      }

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      textComponents.forEach((item) => {
        const page = pages[item.page - 1];
        if (!page) return;

        const pageWidth = page.getWidth();
        const pageHeight = page.getHeight();
        const textSize = 12;

        const scaleX = pageWidth / containerWidth;
        const scaleY = pageHeight / (containerWidth * 1.414);

        const safeX = Math.max(10, Math.min(item.x * scaleX, pageWidth - 50));
        const safeY = Math.max(
          10,
          Math.min(pageHeight - (item.y * scaleY + textSize), pageHeight - 20),
        );

        page.drawText(item.content || 'Sample Text', {
          x: safeX,
          y: safeY,
          size: textSize,
          color: rgb(0.357, 0.608, 0.835),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const updatedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const updatedPdfUrl = URL.createObjectURL(updatedPdfBlob);
      onUpdatePdf(updatedPdfUrl);

      // Revoke old URL
      if (typeof pdfFile === 'string' && pdfFile.startsWith('blob:')) {
        URL.revokeObjectURL(pdfFile);
      }

      dispatch(setTextComponents([]));
    } catch (error: any) {
      errorSnackbar(`Failed to save PDF: ${error.message}`);
    }
  };

  const draggableTextElements = useMemo(
    () =>
      textComponents
        .filter((item) => item.page === currentPage)
        .map((item) => (
          <DraggableText
            key={item.id}
            id={item.id}
            position={{ x: item.x, y: item.y }}
          >
            <PdfAddText data={item} />
          </DraggableText>
        )),
    [textComponents, currentPage],
  );

  const draggableSignatureElements = useMemo(
    () =>
      signatureComponents
        .filter((item) => item.page === currentPage)
        .map((item) => (
          <DraggableText
            key={item.id}
            id={item.id}
            position={{ x: item.x, y: item.y }}
          >
            <PdfAddSignature data={item} />
          </DraggableText>
        )),
    [signatureComponents, currentPage],
  );

  return (
    <Box sx={styles?.pdfViewer} ref={containerRef}>
      <Stack
        height="56px"
        direction="row"
        justifyContent="center"
        spacing={'10px'}
        sx={{ py: 1 }}
      >
        <Button
          variant="outlined"
          onClick={() => setPage(Math.max(currentPage - 1, 1))}
          className="small"
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={() => setPage(Math.min(currentPage + 1, numPages || 1))}
          className="small"
          disabled={currentPage === numPages}
        >
          Next
        </Button>
        {textComponents.length > 0 && (
          <Button
            variant="contained"
            onClick={handleSavePdf}
            className="small"
            sx={{
              position: 'absolute',
              right: 0,
              top: '8px',
            }}
          >
            Save
          </Button>
        )}
      </Stack>

      <DndContext
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Box sx={{ position: 'relative' }}>
            <Page
              key={`page_${currentPage}`}
              pageNumber={currentPage}
              width={containerWidth}
            />

            {draggableTextElements}
            {draggableSignatureElements}
          </Box>
        </Document>
      </DndContext>
    </Box>
  );
}
