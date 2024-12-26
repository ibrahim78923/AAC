import {
  reportIssueFormDefaultValues,
  reportIssueFormValidationSchema,
} from './ReportIssue.data';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  ARRAY_INDEX,
  PORTAL_TICKET_FIELDS,
  TICKET_STATUS,
  TICKET_TYPE,
} from '@/constants/strings';
import {
  useLazyGetAllArticlesQuery,
  usePostReportAnIssueTicketsMutation,
} from '@/services/airCustomerPortal/Tickets';
import {
  getActiveAccountSession,
  getCustomerPortalPermissions,
  getCustomerPortalStyling,
  getSession,
} from '@/utils';
import { AIR_CUSTOMER_PORTAL } from '@/constants/routes';
import { AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS } from '@/constants/permission-keys';
import useAuth from '@/hooks/useAuth';
import { ReportIssuePropsI } from './ReportIssue.interface';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useFormLib } from '@/hooks/useFormLib';

export const useReportIssue = (props: ReportIssuePropsI) => {
  const { setIsPortalOpen } = props;
  const router = useRouter();
  const { companyId } = router?.query;
  const auth = useAuth();
  const product = useMemo(() => getActiveAccountSession(), []);
  const session: any = useMemo(() => getSession(), []);
  const sessionId = session?.user?.companyId;
  const companyIdStorage = product?.company?._id;
  const decryptedId = useMemo(() => {
    const id = Array.isArray(companyId)
      ? companyId[ARRAY_INDEX?.ZERO]
      : companyId;
    return atob(id ?? '');
  }, [companyId]);
  const getCompanyId = decryptedId || companyIdStorage || sessionId;
  const getPortalPermissions = getCustomerPortalPermissions();
  const checkRequesterPermission =
    getPortalPermissions?.customerPortalPermissions?.includes(
      AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SEARCH_REQUESTER_AGENT_BY_EVERYONE,
    );
  const checkArticlePermission =
    getPortalPermissions?.customerPortalPermissions?.includes(
      AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS?.SERVICE_CUSTOMER_SUGGEST_ARTICLES_TO_EVERYONE,
    );

  const { methods, handleSubmit, reset, watch } = useFormLib({
    validationSchema: reportIssueFormValidationSchema(checkRequesterPermission),
    defaultValues: reportIssueFormDefaultValues?.(),
  });

  const [postReportAnIssueTrigger, postReportAnIssueStatus] =
    usePostReportAnIssueTicketsMutation();
  const [getArticleTrigger, getArticleStatus] = useLazyGetAllArticlesQuery();
  const subjectValue = watch('subject');
  const handleArticle = async () => {
    await getArticleTrigger({
      search: subjectValue,
      companyId: getCompanyId,
      status: 'PUBLISHED',
    })?.unwrap();
  };
  useEffect(() => {
    if (!checkArticlePermission) return;
    const timer = setTimeout(() => {
      handleArticle();
    }, 1000);

    return () => clearTimeout(timer);
  }, [subjectValue]);
  const closePortal = () => {
    reset?.();
    setIsPortalOpen?.(false);
  };

  const onSubmit = async (data: any) => {
    const reportAnIssueData = new FormData();
    if (!!checkRequesterPermission && !!auth?.isAuthenticated) {
      reportAnIssueData?.append('requester', data?.requester?._id);
    } else {
      reportAnIssueData?.append('requesterEmail', data?.requesterEmail);
      reportAnIssueData?.append('name', data?.name);
    }
    reportAnIssueData?.append('subject', data?.subject);
    reportAnIssueData?.append('description', data?.description);
    !auth?.isAuthenticated &&
      reportAnIssueData?.append(
        'organization',
        getPortalPermissions?.organizationId,
      );
    reportAnIssueData?.append('status', TICKET_STATUS?.OPEN);
    !!data?.associatesAssets?.length &&
      reportAnIssueData?.append(
        'associateAssets',
        data?.associatesAssets?.map((asset: any) => asset?._id),
      );
    reportAnIssueData?.append('moduleType', 'CUSTOMER_PORTAL');
    !auth?.isAuthenticated &&
      reportAnIssueData?.append('companyId', getCompanyId);
    reportAnIssueData?.append('ticketType', TICKET_TYPE?.INC);
    data?.attachFile !== null &&
      reportAnIssueData?.append('fileUrl', data?.attachFile);

    const postReportAnIssueParameter = {
      body: reportAnIssueData,
    };

    try {
      await postReportAnIssueTrigger(postReportAnIssueParameter)?.unwrap();
      successSnackbar('Issue Report Successfully');
      closePortal?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  const handleArticleClick = (articleId: string, folderId: string) => {
    router?.push({
      pathname: AIR_CUSTOMER_PORTAL?.KNOWLEDGE_BASE_TICKET_DETAIL,
      query: { articleId, folderId, ...(!!companyId && { companyId }) },
    });
  };
  const portalStyles = getCustomerPortalStyling();
  const requestorCondition = (item: any) =>
    (item?.componentProps?.name === PORTAL_TICKET_FIELDS?.REQUESTER &&
      !checkRequesterPermission &&
      !!auth?.isAuthenticated) ||
    (item?.componentProps?.name === PORTAL_TICKET_FIELDS?.REQUESTER &&
      !auth?.isAuthenticated);
  return {
    methods,
    postReportAnIssueStatus,
    closePortal,
    handleSubmit,
    onSubmit,
    checkRequesterPermission,
    getArticleStatus,
    handleArticleClick,
    subjectValue,
    checkArticlePermission,
    portalStyles,
    requestorCondition,
  };
};
