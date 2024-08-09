import React from 'react';
import { Box } from '@mui/material';

interface CtaComponentProps {
  buttonHtml: string;
}

const CtaViewComponent = ({ buttonHtml }: CtaComponentProps) => {
  return <Box dangerouslySetInnerHTML={{ __html: buttonHtml }} />;
};

export default CtaViewComponent;
