import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues, articleFieldsFunction } from './UpsertArticle.data';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { AIR_SERVICES } from '@/constants';
import {
  useGetArticleByIdQuery,
  useGetFoldersQuery,
  usePostArticleMutation,
} from '@/services/airServices/assets/knowledge-base/articles';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const { KNOWLEDGE_BASE } = AIR_SERVICES;

export const useUpsertArticle = () => {
  const { push, query } = useRouter();
  const articleId = query?.id;
  const { data } = useGetArticleByIdQuery(articleId);
  const articleData = data?.data;
  const { data: folderData } = useGetFoldersQuery({});
  const folderOptions =
    folderData?.data?.map?.((folder: any) => ({
      value: folder?._id,
      label: folder?.name,
    })) ?? [];

  const articleMethods = useForm({
    defaultValues: defaultValues(articleData),
  });
  useEffect(() => {
    articleMethods?.reset(defaultValues(articleData));
  }, [articleId, data]);

  const needApprovals = articleMethods?.watch('needsApproval');

  const handlePayloadFormat = (data: any) => {
    const formattedPayload: any = {};
    data?.details && (formattedPayload.details = data?.details);
    data?.folder?.value && (formattedPayload.folder = data?.folder?.value);
    data?.tags && (formattedPayload.tags = [...data?.tags]);
    data?.keywords && (formattedPayload.keywords = [...data?.keywords]);
    formattedPayload.isApproval = data?.isApproval ?? false;
    data?.approver && (formattedPayload.approver = data?.approver);
    data?.reviewDate && (formattedPayload.reviewDate = data?.reviewDate);
    data?.attachments && (formattedPayload.attachments = data?.attachments);
    data?.status && (formattedPayload.status = data?.status);
    return formattedPayload;
  };

  const [postArticle] = usePostArticleMutation();

  const upsertArticleSubmit = async () => {
    const data: any = articleMethods.getValues();
    const payload = handlePayloadFormat(data);

    const formData = new FormData();
    Object.entries(payload)?.map(([key, value]: any) => {
      if (Array.isArray(value)) {
        value?.forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, value);
      }
    });

    try {
      await postArticle(formData).unwrap();
      enqueueSnackbar({
        message: 'New Article Created successfully',
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      push(AIR_SERVICES?.KNOWLEDGE_BASE);
    } catch (error: any) {
      enqueueSnackbar({
        message: error?.data?.message ?? 'Something went wrong',
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const newArticleFields = articleFieldsFunction?.(
    needApprovals,
    folderOptions,
  );

  const handlePageBack = () => {
    push(KNOWLEDGE_BASE);
  };

  return {
    handlePageBack,
    articleMethods,
    needApprovals,
    upsertArticleSubmit,
    newArticleFields,
  };
};
