import jsPDF from 'jspdf';
import { errorSnackbar } from './snackbar';
import { makePngImage } from './html-to-image-converter';
import { ARRAY_INDEX } from '@/constants/strings';

export const htmlToPdfConvert = async (
  elementRef: any,
  name = 'Pdf',
  padding = 40,
) => {
  const ADJUST_PAGE_PADDING = 2 * padding;

  try {
    const { clientWidth, clientHeight } = elementRef?.current;

    const pdf = new jsPDF('p', 'pt', [clientWidth, clientHeight]);

    const pdfWidth = pdf?.internal?.pageSize?.getWidth();
    const pdfHeight = pdf?.internal?.pageSize?.getHeight();

    const dataUrl = await makePngImage(elementRef?.current);

    let scaleFactor = (pdfWidth - ADJUST_PAGE_PADDING) / clientWidth;
    let imgHeight = Math.round(clientHeight * scaleFactor);

    if (imgHeight > pdfHeight - ADJUST_PAGE_PADDING) {
      scaleFactor = (pdfHeight - ADJUST_PAGE_PADDING) / clientHeight;
      imgHeight = pdfHeight - ADJUST_PAGE_PADDING;
    }

    const finalWidth = Math.round(clientWidth * scaleFactor);
    const finalHeight = Math.round(clientHeight * scaleFactor);

    let yOffset = padding;

    if (imgHeight > pdfHeight - ADJUST_PAGE_PADDING) {
      const totalPages = Math.ceil(
        imgHeight / (pdfHeight - ADJUST_PAGE_PADDING),
      );

      for (let i = ARRAY_INDEX?.ZERO; i < totalPages; i++) {
        if (i > ARRAY_INDEX?.ZERO) {
          pdf?.addPage();
          yOffset = padding;
        }

        const visibleHeight =
          i === totalPages - 1
            ? imgHeight % (pdfHeight - ADJUST_PAGE_PADDING)
            : pdfHeight - ADJUST_PAGE_PADDING;

        pdf?.addImage(
          dataUrl,
          'PNG',
          padding,
          yOffset,
          finalWidth,
          visibleHeight,
        );
        yOffset += visibleHeight;
      }
    } else {
      pdf.addImage(dataUrl, 'PNG', padding, padding, finalWidth, finalHeight);
    }

    pdf.save(`${name}.pdf`);
  } catch (err: any) {
    errorSnackbar(err?.message);
  }
};
