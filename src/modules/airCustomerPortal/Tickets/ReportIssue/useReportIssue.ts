import {
  reportIssueFormDefaultValues,
  reportIssueFormFieldsDynamic,
  reportIssueFormValidationSchema,
} from './ReportIssue.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  ARRAY_INDEX,
  PORTAL_TICKET_FIELDS,
  ROLES,
  TICKET_STATUS,
  TICKET_TYPE,
} from '@/constants/strings';
import {
  useLazyGetAssociateAssetsDropdownByCompanyIdQuery,
  useLazyGetAllArticlesQuery,
  useLazyGetAllRequestersDropdownCustomerPortalTicketsQuery,
  usePostReportAnIssueTicketsMutation,
} from '@/services/airCustomerPortal/Tickets';
import {
  getActiveAccountSession,
  getCustomerPortalPermissions,
  getCustomerPortalStyling,
  getSession,
} from '@/utils';
import { AIR_CUSTOMER_PORTAL } from '@/constants';
import { AIR_CUSTOMER_PORTAL_REQUESTER_PERMISSIONS } from '@/constants/permission-keys';
import useAuth from '@/hooks/useAuth';
import { ReportIssuePropsI } from './ReportIssue.interface';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

export const useReportIssue = (props: ReportIssuePropsI) => {
  const { setIsPortalOpen } = props;
  const router = useRouter();
  const { companyId } = router?.query;
  const auth = useAuth();
  const product = useMemo(() => getActiveAccountSession(), []);
  const session: any = useMemo(() => getSession(), []);
  const userRole = session?.user?.role;
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
  const apiQueryAssociateAsset =
    useLazyGetAssociateAssetsDropdownByCompanyIdQuery();
  const apiQueryRequester =
    useLazyGetAllRequestersDropdownCustomerPortalTicketsQuery();

  const methods = useForm<any>({
    resolver: yupResolver(
      reportIssueFormValidationSchema(checkRequesterPermission),
    ),
    defaultValues: reportIssueFormDefaultValues?.(),
  });

  const { handleSubmit, reset, watch } = methods;

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
    }
    reportAnIssueData?.append('subject', data?.subject);
    reportAnIssueData?.append('description', data?.description);
    userRole != ROLES?.ORG_REQUESTER &&
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
    userRole != ROLES?.ORG_REQUESTER &&
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
  const reportIssueFormFields = reportIssueFormFieldsDynamic(
    apiQueryAssociateAsset,
    apiQueryRequester,
    getCompanyId,
  );
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
    reportIssueFormFields,
    checkRequesterPermission,
    getArticleStatus,
    handleArticleClick,
    subjectValue,
    checkArticlePermission,
    portalStyles,
    requestorCondition,
  };
};
