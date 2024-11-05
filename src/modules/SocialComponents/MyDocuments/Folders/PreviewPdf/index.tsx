import React from 'react';

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
  Typography,
} from '@mui/material';

import { TransitionProps } from '@mui/material/transitions';

import { Close } from '@mui/icons-material';

import { generatePDF } from './PreviewPdf.data';

import { LogoImage } from '@/assets/images';

import usePreiewPdf from './usePreiewPdf';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { generateImage } from '@/utils/avatarUtils';
import { successSnackbar } from '@/lib/snackbar';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PreviewPdf = ({ handlePdfClose, isPdfOpen, selectedFile }: any) => {
  const { theme, isShow, setIsShow, handleSetHide } = usePreiewPdf();

  const pdfViewer = () => {
    setIsShow(true);
    generatePDF(handleSetHide);
    handlePdfClose();
    successSnackbar('Pdf Download Successfully');
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
            <Button variant="contained" onClick={pdfViewer} className="small">
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
                  {selectedFile && (
                    <>
                      <TableRow>
                        <TableCell
                          sx={{
                            borderRight: `1px solid ${theme?.palette?.grey[700]}`,
                            borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
                            color: `${theme?.palette?.slateBlue?.main}`,
                            fontSize: '14px',
                            fontWeight: 400,
                          }}
                        >
                          Name
                        </TableCell>
                        <TableCell
                          sx={{
                            borderRight: `1px solid ${theme?.palette?.grey[700]}`,
                            borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
                            color: `${theme?.palette?.slateBlue?.main}`,
                            fontSize: '14px',
                            fontWeight: 600,
                            textTransform: 'capitalize',
                          }}
                        >
                          {selectedFile?.name}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            borderRight: `1px solid ${theme?.palette?.grey[700]}`,
                            borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
                            color: `${theme?.palette?.slateBlue?.main}`,
                            fontSize: '14px',
                            fontWeight: 400,
                          }}
                        >
                          Created Date
                        </TableCell>

                        <TableCell
                          sx={{
                            borderRight: `1px solid ${theme?.palette?.grey[700]}`,
                            borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
                            color: `${theme?.palette?.slateBlue?.main}`,
                            fontSize: '14px',
                            fontWeight: 600,
                          }}
                        >
                          {dayjs(selectedFile?.createdAt).format(
                            DATE_FORMAT.API,
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            borderRight: `1px solid ${theme?.palette?.grey[700]}`,
                            borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
                            color: `${theme?.palette?.slateBlue?.main}`,
                            fontSize: '14px',
                            fontWeight: 400,
                          }}
                        >
                          Prepared by
                        </TableCell>

                        <TableCell
                          sx={{
                            borderRight: `1px solid ${theme?.palette?.grey[700]}`,
                            borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
                            color: `${theme?.palette?.slateBlue?.main}`,
                            fontSize: '14px',
                            fontWeight: 600,
                          }}
                        >
                          {selectedFile?.createdBy?.firstName}{' '}
                          {selectedFile?.createdBy?.lastName}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            borderRight: `1px solid ${theme?.palette?.grey[700]}`,
                            borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
                            color: `${theme?.palette?.slateBlue?.main}`,
                            fontSize: '14px',
                            fontWeight: 400,
                          }}
                        >
                          Shared Links
                        </TableCell>

                        <TableCell
                          sx={{
                            borderRight: `1px solid ${theme?.palette?.grey[700]}`,
                            borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
                            color: `${theme?.palette?.slateBlue?.main}`,
                            fontSize: '14px',
                            fontWeight: 600,
                          }}
                        >
                          {selectedFile?.sharedLinks}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            borderRight: `1px solid ${theme?.palette?.grey[700]}`,
                            borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
                            color: `${theme?.palette?.slateBlue?.main}`,
                            fontSize: '14px',
                            fontWeight: 400,
                          }}
                        >
                          Read Counts
                        </TableCell>

                        <TableCell
                          sx={{
                            borderRight: `1px solid ${theme?.palette?.grey[700]}`,
                            borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
                            color: `${theme?.palette?.slateBlue?.main}`,
                            fontSize: '14px',
                            fontWeight: 600,
                          }}
                        >
                          {selectedFile?.readsCount}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            borderRight: `1px solid ${theme?.palette?.grey[700]}`,
                            borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
                            color: `${theme?.palette?.slateBlue?.main}`,
                            fontSize: '14px',
                            fontWeight: 400,
                          }}
                        >
                          File Type
                        </TableCell>
                        <TableCell
                          sx={{
                            borderRight: `1px solid ${theme?.palette?.grey[700]}`,
                            borderBottom: `1px solid ${theme?.palette?.grey[700]}`,
                            color: `${theme?.palette?.slateBlue?.main}`,
                            fontSize: '14px',
                            fontWeight: 600,
                            textTransform: 'capitalize',
                          }}
                        >
                          {selectedFile?.media?.mimetype}
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {selectedFile?.media?.mimetype?.includes('image') ? (
              <Box sx={{ marginTop: '0.5rem' }}>
                <Image
                  src={generateImage(selectedFile?.media?.url)}
                  width={250}
                  height={250}
                  alt="Image Missing"
                />
              </Box>
            ) : null}
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default PreviewPdf;
