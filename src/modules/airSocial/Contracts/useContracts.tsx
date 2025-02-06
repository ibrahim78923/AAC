import { useRouter } from 'next/router';
import { AIR_SOCIAL_CONTRACTS } from '@/constants/routes';
import { ENUM_CONTRACT_TYPE } from '@/utils/contracts';

export default function useContracts(activeFolder: any) {
  const router = useRouter();

  const handleClickCreateDraft = () => {
    router?.push({
      pathname: AIR_SOCIAL_CONTRACTS?.CONTRACTS_TEMPLATES,
      query: { folderId: activeFolder?._id },
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
