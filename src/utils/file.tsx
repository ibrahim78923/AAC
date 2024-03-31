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
  const dummyDomainForURL = 'http:xyz.yop/';
  const values = Array?.from(elements)?.map((element) => {
    const attributes = element.getAttribute(attribute);
    const url = new URL(`${dummyDomainForURL}${attributes}`);
    return url?.searchParams?.get?.(queryParams);
  });

  return values;
};
