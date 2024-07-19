import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { errorSnackbar } from './api';

export const downloadFile = (blob: any, name: any, type: any) => {
  const url = window?.URL?.createObjectURL?.(
    new Blob([blob], {
      type: type,
    }),
  );

  const link = document?.createElement('a');
  link?.setAttribute('href', url);
  link?.setAttribute('download', name);
  document?.body?.appendChild(link);
  link?.click();
  window?.URL?.revokeObjectURL?.(url);
  link?.remove();
};

export const findAttributeValues = (
  htmlContent: any,
  selectorPattern: any,
  attribute: any,
  queryParams: any,
) => {
  const parser = new DOMParser();
  const doc = parser?.parseFromString(htmlContent, 'text/html');

  const elements = doc?.querySelectorAll(selectorPattern);
  const values = Array?.from(elements)?.map((element) => {
    const attributes = element.getAttribute(attribute);
    const url = new URL(`${attributes}`);
    return url?.searchParams?.get?.(queryParams);
  });

  return values;
};

export const processCSV = (str: any, delimiter = ',') => {
  const cleanStr = str?.replace?.(/"|\r/g, '');
  const headers = cleanStr
    ?.slice?.(0, cleanStr?.indexOf?.('\n'))
    ?.split?.(delimiter);
  const filterEmptyValue = headers?.filter((x: any) => !!x);
  return filterEmptyValue;
};

export const htmlToPdfConvert = (elementRef: any, name = 'Pdf') => {
  const { clientWidth, clientHeight } = elementRef?.current;
  const contentHeight = elementRef?.current?.clientHeight;
  const pdf = new jsPDF('p', 'pt', [clientWidth, clientHeight]);
  const pdfWidth = pdf?.internal?.pageSize?.getWidth();

  toPng(elementRef?.current, { cacheBust: false })
    ?.then((dataUrl) => {
      let imgHeight =
        (contentHeight * pdfWidth) / elementRef?.current?.clientWidth;

      if (imgHeight > pdf?.internal?.pageSize?.getHeight()) {
        imgHeight = pdf?.internal?.pageSize?.getHeight();
      }

      pdf?.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, imgHeight);
      pdf?.save(`${name}.pdf`);
    })
    ?.catch((err) => {
      errorSnackbar(err?.message);
    });
};

export const htmlToPngConvert = (elementRef: any, name = 'image') => {
  toPng(elementRef.current, { cacheBust: false })
    ?.then((dataUrl) => {
      const link = document?.createElement('a');
      link!.download = `${name}.png`;
      link!.href = dataUrl;
      link?.click();
    })
    ?.catch((err) => {
      errorSnackbar(err?.message);
    });
};
