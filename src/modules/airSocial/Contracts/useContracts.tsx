import { useState } from 'react';

export default function useContracts() {
  const [openModalSignPdf, setOpenModalSignPdf] = useState(false);

  return {
    openModalSignPdf,
    setOpenModalSignPdf,
  };
}
