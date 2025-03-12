import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  useGetPublicCommonContractByIdQuery,
  usePutContractSignMutation,
} from '@/services/commonFeatures/contracts';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { base64ToFile } from '@/utils/contracts';

export default function useContractView() {
  const [signature, setSignature] = useState<string | null>(null);
  const router = useRouter();
  const { contractId, signeeId } = router?.query;
  const { data: dataContractById, isLoading: loadingGetContractById } =
    useGetPublicCommonContractByIdQuery(contractId, { skip: !contractId });

  const signees = dataContractById?.data?.signees;
  const currentSignee = signees?.find(
    (signee: any) => signee?._id === signeeId,
  );
  const currentSigneeSignatureType = currentSignee?.signatureType;

  const isLastSignee = () => {
    if (!signees?.length) return false;
    const lastSignee = signees.reduce(
      (max: any, signee: any) =>
        signee.signingOrder > max.signingOrder ? signee : max,
      signees[0],
    );
    return lastSignee._id === signeeId;
  };

  const [isConfirmSigning, setIsConfirmSigning] = useState(false);
  const handleChangeConfirmSigning = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsConfirmSigning(event.target.checked);
  };

  const [openModalSignAndSend, setOpenModalSignAndSend] =
    useState<boolean>(false);
  const handleOpenModalSignAndSend = () => {
    setOpenModalSignAndSend(true);
  };
  const handleCloseModalSignAndSend = () => {
    setOpenModalSignAndSend(false);
    setIsConfirmSigning(false);
  };

  const [putCommonContract, { isLoading: loadingUpdateContract }] =
    usePutContractSignMutation();

  const handleSubmitSignAndSend = async () => {
    const signatureFile = base64ToFile(signature, 'signature.png');
    const formData = new FormData();

    formData.append('contractId', contractId as string);
    formData.append(
      'signees',
      JSON.stringify([{ id: signeeId, signatureStatus: 'SIGNED' }]),
    );
    if (signatureFile) {
      formData.append('signatureAttachment', signatureFile);
    }
    if (isLastSignee()) {
      formData.append('status', 'SIGNED');
    }

    try {
      await putCommonContract({
        body: formData,
      })?.unwrap();
      successSnackbar('Contract signed successfully');
    } catch (error: any) {
      errorSnackbar('An error occured');
    }
  };

  return {
    setSignature,
    dataContractById,
    loadingGetContractById,
    signeeId,

    currentSignee,
    currentSigneeSignatureType,

    openModalSignAndSend,
    handleOpenModalSignAndSend,
    handleCloseModalSignAndSend,

    isConfirmSigning,
    handleChangeConfirmSigning,

    loadingUpdateContract,
    handleSubmitSignAndSend,
  };
}
