import { useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_SOCIAL_CONTRACTS } from '@/constants/routes';

export default function useContracts() {
  const router = useRouter();
  const [openModalSignPdf, setOpenModalSignPdf] = useState(false);

  const onSubmitModalSignPdf = () => {
    router?.push({
      pathname: AIR_SOCIAL_CONTRACTS?.CONTRACTS_CREATE,
      query: { signPDF: true },
    });
  };

  return {
    openModalSignPdf,
    setOpenModalSignPdf,
    onSubmitModalSignPdf,
  };
}
