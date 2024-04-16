import usePath from '@/hooks/usePath';
import {
  useLazyGetSignedUrlForImportQuery,
  useUploadFileTos3UsingSignedUrlMutation,
} from '@/services/airServices/global/import';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export const useImportProductCatalog = (props: any) => {
  const { setIsDrawerOpen } = props;
  const importFormMethod = useForm({});
  const router = useRouter();
  const { makePath } = usePath();

  const { handleSubmit, reset } = importFormMethod;
  const [
    uploadFileTos3UsingSignedUrlTrigger,
    uploadFileTos3UsingSignedUrlStatus,
  ] = useUploadFileTos3UsingSignedUrlMutation?.();

  const [lazyGetSignedUrlForImportTrigger, lazyGetSignedUrlForImportStatus] =
    useLazyGetSignedUrlForImportQuery?.();

  const submitImportFile = async (data: any) => {
    const signedUrlApiDataParameter = {
      queryParams: {
        objectUrl: 'users/attachment',
      },
    };
    try {
      const response: any = await lazyGetSignedUrlForImportTrigger?.(
        signedUrlApiDataParameter,
      )?.unwrap();
      const s3Data = {
        file: data?.file,
        signedUrl: response?.data,
      };
      await uploadToS3CsvFile?.(s3Data);
      successSnackbar('File Uploaded Successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const uploadToS3CsvFile = async (data: any) => {
    const s3ApiDataParameter = {
      url: data?.signedUrl,
      body: {
        file: data?.file,
      },
    };
    try {
      await uploadFileTos3UsingSignedUrlTrigger(s3ApiDataParameter)?.unwrap();
      successSnackbar('File Uploaded');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const onClose = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['productListAction'],
      }),
    );
    reset?.();
    setIsDrawerOpen?.(false);
  };
  return {
    handleSubmit,
    onClose,
    submitImportFile,
    importFormMethod,
    uploadFileTos3UsingSignedUrlStatus,
    lazyGetSignedUrlForImportStatus,
  };
};
