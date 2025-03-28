import React, { useEffect, useRef, useState } from 'react';
import { Box, Stack, Button } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  setCurrentPage,
  setContainerWidth,
  setPageDimensions,
} from '@/redux/slices/airSocial/contracts/pdf-contract/slice';
import dynamic from 'next/dynamic';
import { styles } from './PDFViewer.style';

const CanvasEditor = dynamic(() => import('../CanvasEditor'), {
  ssr: false,
});

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface PDFViewerProps {
  pdfFile: File | string;
}

export default function PDFViewer({ pdfFile }: PDFViewerProps) {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.airSocialPdfContract.currentPage,
  );
  const containerWidth = useSelector(
    (state: RootState) => state.airSocialPdfContract.containerWidth,
  );
  const pageDimensions = useSelector(
    (state: RootState) => state.airSocialPdfContract.pageDimensions,
  );
  const [numPages, setNumPages] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pageHeight, setPageHeight] = useState<number>(0);

  const setPage = (page: number) => dispatch(setCurrentPage(page));

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        dispatch(setContainerWidth(containerRef.current.clientWidth));
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [dispatch]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onPageLoadSuccess = (page: any) => {
    const { width, height } = page.getViewport({ scale: 1 });
    dispatch(setPageDimensions({ width, height }));
    setPageHeight(height * (containerWidth / width));
  };

  return (
    <Box>
      {numPages !== null && numPages > 1 && (
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
        </Stack>
      )}
      <Box sx={styles?.pdfViewer} ref={containerRef}>
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          className="pdf-document-container"
        >
          <Page
            key={`page_${currentPage}`}
            pageNumber={currentPage}
            width={containerWidth}
            onLoadSuccess={onPageLoadSuccess}
          />
        </Document>

        {/* Overlay canvas for editing */}
        {pageDimensions && (
          <CanvasEditor
            page={currentPage}
            pageWidth={containerWidth}
            pageHeight={pageHeight}
            scale={containerWidth / pageDimensions.width}
          />
        )}
      </Box>
    </Box>
  );
}
