export const downloadBlob = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const isValidBlob = (blob: any): blob is Blob => {
  return blob instanceof Blob;
};

export const extractFileName = (
  headers: Headers | undefined,
): string | null => {
  const contentDisposition = headers?.get('Content-Disposition');
  if (contentDisposition && contentDisposition.includes('filename=')) {
    return contentDisposition
      .split('filename=')[1]
      .split(';')[0]
      .replace(/['"]/g, '');
  }
  return null;
};

export const downloadLink = (url: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = '';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
