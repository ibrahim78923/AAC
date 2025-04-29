import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  useGetPublicCommonContractByIdQuery,
  usePutContractSignMutation,
} from '@/services/commonFeatures/contracts';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { base64ToFile } from '@/utils/contracts';

export default function useContractView() {
  const router = useRouter();
  const [signature, setSignature] = useState<string | null>(null);
  const [signatureStatus, setSignatureStatus] = useState<string>('SIGNED');
  const [signatureMessage, setSignatureMessage] = useState<string>('');
  const { contractId, signeeId } = router?.query;
  const { data: dataContractById, isLoading: loadingGetContractById } =
    useGetPublicCommonContractByIdQuery(contractId, { skip: !contractId });

  const signees = dataContractById?.data?.signees;
  const currentSignee = signees?.find(
    (signee: any) => signee?._id === signeeId,
  );

  const currentSigneeSignatureType = currentSignee?.signatureType;
  const currentSigneesignatureStatus = currentSignee?.signatureStatus;

  const [isConfirmSigning, setIsConfirmSigning] = useState(false);
  const handleChangeConfirmSigning = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsConfirmSigning(event.target.checked);
  };

  const [openModalSignAndSend, setOpenModalSignAndSend] =
    useState<boolean>(false);
  const handleOpenModalSignAndSend = (_: any, data?: any) => {
    if (currentSigneesignatureStatus === 'SIGNED') return;

    if (data) {
      if (currentSignee?.email !== data?.email) {
        errorSnackbar('You are not allowed to sign this contract');
        return;
      }
    }

    setSignatureStatus('SIGNED');
    setOpenModalSignAndSend(true);
  };
  const handleCloseModalSignAndSend = () => {
    setOpenModalSignAndSend(false);
    setIsConfirmSigning(false);
  };

  const [openModalDismissAgreement, setOpenModalDismissAgreement] =
    useState<boolean>(false);
  const handleOpenModalDismissAgreement = () => {
    setSignatureStatus('REJECTED');
    setOpenModalDismissAgreement(true);
  };
  const handleCloseModalDismissAgreement = () => {
    setOpenModalDismissAgreement(false);
    setSignatureMessage('');
  };

  const [openModalRequestChanged, setOpenModalRequestChanged] =
    useState<boolean>(false);
  const handleOpenModalRequestChanged = () => {
    setSignatureStatus('CHANGE_REQUEST');
    setOpenModalRequestChanged(true);
  };
  const handleCloseModalRequestChanged = () => {
    setOpenModalRequestChanged(false);
    setSignatureMessage('');
  };

  const [putCommonContract, { isLoading: loadingPutContract }] =
    usePutContractSignMutation();

  const handleSubmitSignAndSend = async () => {
    const signatureFile = base64ToFile(signature, 'signature.png');
    const formData = new FormData();

    formData.append('contractId', contractId as string);
    formData.append(
      'signees',
      JSON.stringify([
        {
          id: signeeId,
          signatureStatus: signatureStatus,
          signatureMessage:
            signatureMessage === ''
              ? 'I agree to the terms and conditions'
              : signatureMessage,
        },
      ]),
    );
    if (signatureFile) {
      formData.append('signatureAttachment', signatureFile);
    }

    try {
      await putCommonContract({
        body: formData,
      })?.unwrap();
      successSnackbar('Contract signed successfully');
      handleCloseModalSignAndSend();
      handleCloseModalDismissAgreement();
      handleCloseModalRequestChanged();
    } catch (error: any) {
      errorSnackbar('An error occured');
    }
  };

  const sendIsViewedRequest = async () => {
    if (!contractId || !signeeId || currentSignee?.isViewed) return;

    try {
      const formData = new FormData();
      formData.append(
        'contractId',
        Array.isArray(contractId) ? contractId[0] : contractId,
      );
      formData.append(
        'signees',
        JSON.stringify([{ id: signeeId, isViewed: true }]),
      );

      await putCommonContract({ body: formData })?.unwrap();
    } catch (error: any) {
      errorSnackbar('An error occurred');
    }
  };

  useEffect(() => {
    if (dataContractById && !currentSignee?.isViewed) {
      sendIsViewedRequest();
    }
  }, [currentSignee, dataContractById]);

  return {
    signature,
    setSignature,
    dataContractById,
    loadingGetContractById,
    signeeId,

    currentSignee,
    currentSigneeSignatureType,
    currentSigneesignatureStatus,

    openModalSignAndSend,
    handleOpenModalSignAndSend,
    handleCloseModalSignAndSend,

    isConfirmSigning,
    handleChangeConfirmSigning,

    loadingPutContract,
    handleSubmitSignAndSend,

    signatureMessage,
    setSignatureMessage,
    openModalDismissAgreement,
    handleOpenModalDismissAgreement,
    handleCloseModalDismissAgreement,

    openModalRequestChanged,
    handleOpenModalRequestChanged,
    handleCloseModalRequestChanged,
  };
}
