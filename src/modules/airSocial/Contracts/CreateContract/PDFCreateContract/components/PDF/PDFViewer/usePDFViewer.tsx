import { useState } from 'react';

export default function usePDFViewer() {
  const [totalPages, settotalPages] = useState(0);
  const [pageNumber, setpageNumber] = useState(1);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  function onDocLoad(event: { numPages: number }) {
    settotalPages(event.numPages);
  }

  const changePage = (param: 'prev' | 'next') => {
    if (param === 'prev') {
      setpageNumber((prev) => prev - 1);
    }

    if (param === 'next') {
      setpageNumber((prev) => prev + 1);
    }
  };

  const readFileAsDataURL = (file: File | string) => {
    if (typeof file === 'string') {
      fetch(file)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target && e.target.result) {
              setFileUrl(e.target.result as string);
            }
          };
          reader.readAsDataURL(blob);
        })
        .catch(() => setFileUrl(null));
    } else if (file instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setFileUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setFileUrl(null);
    }
  };

  return {
    totalPages,
    pageNumber,
    setpageNumber,
    onDocLoad,
    changePage,
    readFileAsDataURL,
    fileUrl,
  };
}
