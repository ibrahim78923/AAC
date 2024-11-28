import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function useContractTemplates() {
  const router = useRouter();
  const [searchBy, setSearchBy] = useState();

  return {
    router,
    searchBy,
    setSearchBy,
  };
}
