import { useFormLib } from '@/hooks/useFormLib';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { usePostArticleFeedbackMutation } from '@/services/airCustomerPortal/KnowledgeBase';
import {
  articleFeedbackFormDefaultValues,
  articleFeedbackFormFieldsDynamic,
  articleFeedbackFormValidationSchema,
} from './PostArticleFeedback.data';
import { useMemo, useState } from 'react';
import { getActiveAccountSession, getSession } from '@/utils';
import { useRouter } from 'next/router';
import { ARRAY_INDEX } from '@/constants/strings';

export const usePostArticleFeedback = (props: any) => {
  const { setIsSuccess } = props;
  const router = useRouter();
  const [isHelpful, setIsHelpful] = useState(true);

  const companyIdStorage = useMemo(() => {
    const product: any = getActiveAccountSession();
    return product?.company?._id;
  }, []);

  const { sessionCompanyId, sessionUserId, sessionEmail } = useMemo(() => {
    const session: any = getSession();
    const sessionData = {
      sessionCompanyId: session?.user?.companyId,
      sessionUserId: session?.user?._id,
      sessionEmail: session?.user?.email,
    };
    return sessionData;
  }, []);

  const { companyId } = router?.query;

  const decryptedId = useMemo(() => {
    const id = Array.isArray(companyId)
      ? companyId?.[ARRAY_INDEX?.ZERO]
      : companyId;
    if (!id) return null;
    try {
      atob(id);
    } catch (error) {
      return null;
    }
  }, [companyId]);

  const singleArticleId = router?.query?.articleId;

  const formLibProps = {
    validationSchema: articleFeedbackFormValidationSchema(),
    defaultValues: articleFeedbackFormDefaultValues?.(sessionEmail),
  };

  const { handleSubmit, reset, methods } = useFormLib(formLibProps);

  const [postArticleFeedbackTrigger, { isLoading }] =
    usePostArticleFeedbackMutation();

  const onSubmit = async (data: any) => {
    const payload = {
      id: singleArticleId,
      helpful: isHelpful,
      feedback: JSON.stringify(data?.feedback),
      comment: data?.comment,
      ...(sessionUserId
        ? { createdBy: sessionUserId }
        : { email: data?.email }),
      companyId: decryptedId || companyIdStorage || sessionCompanyId,
    };

    try {
      await postArticleFeedbackTrigger(payload)?.unwrap();
      successSnackbar('Feedback added successfully');
      setIsSuccess?.(true);
      setIsHelpful((prevState: boolean) => !prevState);
      reset();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const articleFeedbackFormFields = articleFeedbackFormFieldsDynamic();

  return {
    methods,
    handleSubmit,
    onSubmit,
    isLoading,
    articleFeedbackFormFields,
    isHelpful,
    setIsHelpful,
  };
};
