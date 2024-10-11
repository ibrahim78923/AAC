import { errorSnackbar, successSnackbar } from '@/utils/api';
import type {
  LazyQueryTrigger,
  MutationTrigger,
} from '@reduxjs/toolkit/dist/query/react/buildHooks';

type FileType = 'csv' | 'pdf' | 'xlsx' | 'zip';
export const DownloadCsv = async (
  trigger: LazyQueryTrigger<any> | MutationTrigger<any>,
  FileName: string,
  fileType: FileType,
  params?: any,
): Promise<void> => {
  try {
    const response: any = await trigger(params).unwrap();
    const url = window.URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${FileName}.${fileType}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    successSnackbar(`File exported successfully`);
  } catch (error: any) {
    errorSnackbar(error?.data?.message);
  }
};
