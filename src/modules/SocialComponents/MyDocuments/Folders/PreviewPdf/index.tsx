import React, { useState } from 'react';

import Image from 'next/image';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';

import { TransitionProps } from '@mui/material/transitions';

import { Close } from '@mui/icons-material';

import { generatePDF, pdfViewData } from './PreviewPdf.data';
import { enqueueSnackbar } from 'notistack';

import { DummyDesktopImage, LogoImage } from '@/assets/images';

import { v4 as uuidv4 } from 'uuid';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PreviewPdf = ({ handlePdfClose, isPdfOpen }: any) => {
  const theme = useTheme<Theme>();
  const [isShow, setIsShow] = useState(false);

  const pdfViewer = () => {
    setIsShow(true);
    generatePDF(handleSetHide);
    handlePdfClose();
    enqueueSnackbar('Pdf Download Successfully', {
      variant: 'success',
    });
  };

  const handleSetHide = () => {
    setIsShow(false);
  };

  return (
    <>
      <Dialog
        open={isPdfOpen}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={handlePdfClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ display: 'flex', gap: '6px' }}>
            <Image src={LogoImage} alt="logo" />
            <Typography variant="h5">Air Applecart</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Button variant="contained" onClick={pdfViewer}>
              Download Document
            </Button>
            <Close onClick={handlePdfClose} sx={{ cursor: 'pointer' }} />
          </Box>
        </DialogTitle>
        <div id="report">
          <DialogContent>
            {isShow ? (
              <Box sx={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <Image src={LogoImage} alt="logo" />
                <Typography variant="h5">Air Applecart</Typography>
              </Box>
            ) : (
              ''
            )}

            <TableContainer
              sx={{
                marginTop: '1rem',
                border: `1px solid ${theme?.palette?.grey[700]}`,
                borderRadius: '8px',
              }}
            >
              <Table>
                <TableBody>
                  {pdfViewData?.map((item) => {
                    return (
                      <TableRow key={uuidv4()}>
                        <TableCell
                          sx={{
                            borderRight: `1px solid ${theme?.palette?.grey[700]}`,
                            borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
                            color: `${theme?.palette?.slateBlue?.main}`,
                            fontSize: '14px',
                            fontWeight: 400,
                          }}
                        >
                          {item?.firstCell}
                        </TableCell>
                        {item?.dots === true ? (
                          <TableCell
                            sx={{
                              borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
                              color: `${theme?.palette?.slateBlue?.main}`,
                              fontSize: '14px',
                              fontWeight: 600,
                            }}
                          >
                            {item?.secondCell?.map((items) => {
                              return (
                                <Box
                                  key={uuidv4()}
                                  sx={{ paddingLeft: '1rem' }}
                                >
                                  <ul>
                                    <li>{items?.list}</li>
                                  </ul>
                                </Box>
                              );
                            })}
                          </TableCell>
                        ) : (
                          <TableCell
                            sx={{
                              borderRight: `1px solid ${theme?.palette?.grey[700]}`,
                              borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
                              color: `${theme?.palette?.slateBlue?.main}`,
                              fontSize: '14px',
                              fontWeight: 600,
                            }}
                          >
                            {item?.thirdCell}
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ marginTop: '0.5rem' }}>
              <Typography
                variant="h6"
                sx={{ color: `${theme?.palette?.grey[800]}`, fontWeight: 600 }}
              >
                Overview
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: `${theme?.palette?.slateBlue?.light}`,
                  fontWeight: 400,
                  marginY: '1rem',
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </Typography>
              <Image src={DummyDesktopImage} alt="Image Missing" />
            </Box>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default PreviewPdf;
