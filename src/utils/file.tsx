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
  const dummyDomainForURL = window?.location?.origin;
  const values = Array?.from(elements)?.map((element) => {
    const attributes = element.getAttribute(attribute);
    const url = new URL(`${dummyDomainForURL}${attributes}`);
    return url?.searchParams?.get?.(queryParams);
  });

  return values;
};

export const processCSV = (str: any, delim = ',') => {
  const cleanStr = str?.replace?.(/"|\r/g, '');
  const headers = cleanStr?.slice?.(0, cleanStr?.indexOf?.('\n')).split(delim);
  const rows = cleanStr.slice(cleanStr.indexOf('\n') + 1).split('\n');
  const filterEmptyRows = rows?.filter((x: any) => !!x);
  const newArray = filterEmptyRows?.map((row: any) => {
    const values = row.split(delim);
    const eachObject = headers.reduce((obj: any, header: any, i: any) => {
      obj[header] = values[i];
      return obj;
    }, {});
    return eachObject;
  });
  return newArray;
};

new FileReader().onload = function (e: any) {
  const text = e?.target?.result;
  processCSV(text); // plugged in here
};

export const csvReader = (delim = ',') => {
  const csvFileReader = new FileReader();

  csvFileReader.onload = function (e: any) {
    const text = e?.target?.result;
    const cleanStr = text?.replace?.(/"|\r/g, '');
    const headers = cleanStr
      ?.slice?.(0, cleanStr?.indexOf?.('\n'))
      .split(delim);
    const rows = cleanStr.slice(cleanStr.indexOf('\n') + 1).split('\n');
    const filterEmptyRows = rows?.filter((x: any) => !!x);
    const newArray = filterEmptyRows?.map((row: any) => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj: any, header: any, i: any) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });
    return newArray;
  };
};
