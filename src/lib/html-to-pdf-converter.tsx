import jsPDF from 'jspdf';
import { errorSnackbar } from './snackbar';
import { makePngImage } from './html-to-image-converter';

export const htmlToPdfConvert = async (
  elementRef: any,
  name = 'Pdf',
  padding = 40,
) => {
  try {
    const { clientWidth, clientHeight } = elementRef?.current;
    const contentHeight = elementRef?.current?.clientHeight;

    const pdf = new jsPDF('p', 'pt', [clientWidth, clientHeight]);
    const pdfWidth = pdf?.internal?.pageSize?.getWidth();

    const dataUrl = await makePngImage(elementRef?.current);

    let imgHeight =
      (contentHeight * pdfWidth) / elementRef?.current?.clientWidth;

    if (imgHeight > pdf?.internal?.pageSize?.getHeight()) {
      imgHeight = pdf?.internal?.pageSize?.getHeight();
    }

    pdf?.addImage(
      dataUrl,
      'PNG',
      padding,
      padding,
      pdfWidth - 2 * padding,
      imgHeight - 2 * padding,
    );

    pdf?.save(`${name}.pdf`);
  } catch (err: any) {
    errorSnackbar(err?.message);
  }
};
