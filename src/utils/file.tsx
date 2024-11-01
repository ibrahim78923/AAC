import { errorSnackbar } from '@/lib/snackbar';
import { IMG_URL } from '@/config';
import { REGEX } from '@/constants/validation';

export const makeDownloadLink = (fileName = 'file', hrefLink = '') => {
  const link = document?.createElement?.('a');
  link.download = fileName;
  link.href = hrefLink;
  link?.click();
};

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
    const attributes = element?.getAttribute(attribute);
    const url = new URL(`${attributes}`);
    return url?.searchParams?.get?.(queryParams);
  });

  return values;
};

export const processCSV = (str: any, delimiter = ',') => {
  const cleanStr = str?.replace?.(
    REGEX?.GLOBAL_DOUBLE_QUOTATION_AND_CARRIAGE_RETURN,
    '',
  );
  const headers = cleanStr
    ?.slice?.(0, cleanStr?.indexOf?.('\n'))
    ?.split?.(delimiter);
  const filterEmptyValue = headers?.filter((x: any) => !!x);
  return filterEmptyValue;
};

export const downloadFiles = async (
  files: {
    id?: string;
    name: string;
    url: string;
    size?: string | number;
    mimetype?: string;
  }[],
) => {
  for (let index = 0; index < files.length; index++) {
    const url = `${IMG_URL}${files[index].url}`;
    const filename = files[index].name;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const blob = await response.blob();

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        errorSnackbar(`Failed to fetch ${url}`);
      }
    } catch (error) {
      errorSnackbar(`Error downloading ${url}: ${error}`);
    }
  }
};

export const urlFileName = (url?: any) => {
  const fileName = url?.pathname
    ?.split('/')
    ?.pop()
    ?.replace(/\.csv$/i, '')
    ?.replace(/\.xlsx$/i, '');
  return fileName?.toLowerCase();
};
