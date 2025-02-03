import { useRouter } from 'next/router';
import { AIR_SOCIAL_CONTRACTS } from '@/constants/routes';
import { ENUM_CONTRACT_TYPE } from '@/utils/contracts';

export default function useContracts() {
  const router = useRouter();

  const handleClickCreateDraft = () => {
    router?.push({
      pathname: AIR_SOCIAL_CONTRACTS?.CONTRACTS_TEMPLATES,
      query: { folderId: '676a8264884c3ce8851b91f9' },
    });
  };

  const handleClickSignPdf = () => {
    router?.push({
      pathname: AIR_SOCIAL_CONTRACTS?.CONTRACTS_CREATE,
      query: { contractType: ENUM_CONTRACT_TYPE?.PDF },
    });
  };

  return {
    handleClickCreateDraft,
    handleClickSignPdf,
  };
}
