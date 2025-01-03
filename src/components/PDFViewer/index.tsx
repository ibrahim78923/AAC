import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
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
import { v4 as uuidv4 } from 'uuid';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

type PDFEditorProps = {
  pdfFile: File | string;
  addTextComponent?: TextComponentI[];
  addSignatureFields?: signatureFieldI[];
  onClickTextDelete?: (id: string) => void;
  onClickSignatureDelete?: (id: string) => void;
};

export default function PDFViewer({
  pdfFile,
  addTextComponent,
  addSignatureFields,
  onClickTextDelete = () => {},
  onClickSignatureDelete = () => {},
}: PDFEditorProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  // const sigCanvasRef = useRef<SignatureCanvas | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <Box sx={styles?.pdfViewer}>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>

      {addTextComponent?.map((item) => (
        <PdfAddText
          data={item}
          onClickDelete={onClickTextDelete}
          key={uuidv4()}
        />
      ))}

      {addSignatureFields?.map((item) => (
        <PdfAddSignature
          data={item}
          onClickDelete={onClickSignatureDelete}
          key={uuidv4()}
        />
      ))}
    </Box>
  );
}
