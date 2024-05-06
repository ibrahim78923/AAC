import { useState } from 'react';
import { useTheme } from '@mui/material';
import useToggle from '@/hooks/useToggle';
import {
  useGetSignedUrlForImportQuery,
  // useUploadFileTos3UsingSignedUrlMutation
} from '@/services/commonFeatures/companies';
import { useForm } from 'react-hook-form';
// import { enqueueSnackbar } from "notistack";
// import { NOTISTACK_VARIANTS } from "@/constants/strings";
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useImportFileMutation } from '@/services/airServices/global/import';

const useImportCompanies = (setIsDrawerOpen: any) => {
  const theme = useTheme();
  const [isToggled, toggle] = useToggle();
  const [filePath, setFilePath] = useState();

  const { data: getSignedUrlForImport } = useGetSignedUrlForImportQuery({
    objectUrl: filePath,
  });
  // const [uploadFileTos3UsingSignedUrl] = useUploadFileTos3UsingSignedUrlMutation();

  const [importFileTrigger, importFileStatus] = useImportFileMutation?.();

  // console.log('getSignedUrlForImport', getSignedUrlForImport?.data)

  const data = getSignedUrlForImport?.data;

  const methods = useForm({});
  const { handleSubmit } = methods;

  const onSubmit = async () => {
    // if (values?.file) {
    //   setFilePath(values?.file?.path);
    //   try {
    //     await uploadFileTos3UsingSignedUrl({
    //       s3Url: data,
    //       body: values?.file,
    //     });
    //     toggle(true);
    //     enqueueSnackbar('File Import Successfully', {
    //       variant: NOTISTACK_VARIANTS.SUCCESS,
    //     });
    //   } catch (uploadError) {
    //     console.error('File upload failed:', uploadError);
    //     enqueueSnackbar('File upload failed. Please try again later.', {
    //       variant: NOTISTACK_VARIANTS.ERROR,
    //     });
    //   }
    // } else {
    //   enqueueSnackbar('Invalid file format. Please select a valid file', {
    //     variant: NOTISTACK_VARIANTS?.ERROR,
    //   });
    //   setIsImport({ ...isImport, importDrawer: false });
    // }
  };

  const setDrawerDefaultState = () => {
    setIsDrawerOpen?.(false);
  };

  const submitImport = async (apiData: any) => {
    const apiImportData = {
      body: {
        filePath: apiData?.filePath,
        actionType: 'COMPANIES',
        dataColumn: apiData?.dataColumn,
      },
    };
    //TODO: will handle here once import is given by BE just test here the global import
    return;
    try {
      const response: any = await importFileTrigger?.(apiImportData)?.unwrap();
      successSnackbar(response?.message);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  return {
    setDrawerDefaultState,
    importFileStatus,
    submitImport,
    handleSubmit,
    isToggled,
    onSubmit,
    methods,
    theme,
    setFilePath,
    toggle,
    data,
  };
};

export default useImportCompanies;
