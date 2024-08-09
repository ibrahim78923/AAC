import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { errorSnackbar } from './api';
import { parse } from 'json2csv';
import * as XLSX from 'xlsx';

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

    const dataUrl = await toPng(elementRef?.current, { cacheBust: false });

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

export const htmlToPngConvert = async (
  elementRef: any,
  color?: any,
  name = 'image',
  padding = 1.5,
) => {
  try {
    const originalElement = elementRef?.current;
    const wrapper = document?.createElement('div');
    wrapper.style.padding = `${padding}rem`;
    wrapper.style.background = color;

    const clonedElement = originalElement?.cloneNode?.(true);
    wrapper?.appendChild?.(clonedElement);

    document?.body?.appendChild?.(wrapper);

    const dataUrl = await toPng(wrapper, { cacheBust: false });

    const link = document?.createElement?.('a');
    link.download = `${name}.png`;
    link.href = dataUrl;
    link?.click();
    document?.body?.removeChild?.(wrapper);
  } catch (err: any) {
    errorSnackbar(err?.message);
  }
};

export const exportDataToCSV = (dataToExport: any, name: any, type: any) => {
  const csv = parse(dataToExport);
  downloadFile?.(csv, name, type);
};

export const exportDataToXLS = (dataToExport: any, name: any, type: any) => {
  const worksheet = XLSX?.utils?.json_to_sheet(dataToExport);
  const workbook = XLSX?.utils?.book_new();
  XLSX?.utils?.book_append_sheet(workbook, worksheet, 'Data');
  const excelBuffer = XLSX?.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });
  downloadFile?.(excelBuffer, name, type);
};
