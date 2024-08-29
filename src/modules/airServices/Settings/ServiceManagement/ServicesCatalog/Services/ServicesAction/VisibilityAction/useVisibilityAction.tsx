import { ROLES } from '@/constants/strings';
import {
  useGetCategoriesAgentDropdownQuery,
  useGetCategoriesRequesterDropdownQuery,
  usePatchServiceCatalogMutation,
} from '@/services/airServices/settings/service-management/service-catalog';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useState } from 'react';
import { IServicesProps } from '../../Services.interface';

const useVisibilityAction = (props: IServicesProps) => {
  const { handleCloseVisibility, setAnchorEl, id } = props;

  const [selectedAgentCheckboxes, setSelectedAgentCheckboxes] = useState<any>(
    [],
  );
  const [selectedRequestorCheckboxes, setSelectedRequestorCheckboxes] =
    useState<any>([]);

  const [patchServiceCatalogTrigger, patchServiceCatalogTriggerStatus] =
    usePatchServiceCatalogMutation();

  const handleSubmit = async () => {
    const moveToCategoryData: any = {};

    if (selectedAgentCheckboxes && selectedAgentCheckboxes.length > 0) {
      moveToCategoryData.agentVisibilty = selectedAgentCheckboxes;
    }

    if (selectedRequestorCheckboxes && selectedRequestorCheckboxes.length > 0) {
      moveToCategoryData.requesterVisibilty = selectedRequestorCheckboxes;
    }

    if (id && id.selectedCheckboxes) {
      moveToCategoryData.ids = id.selectedCheckboxes;
    }

    const body = moveToCategoryData;

    const patchServiceCatalogParameter = { body };
    try {
      await patchServiceCatalogTrigger(patchServiceCatalogParameter)?.unwrap();

      successSnackbar('Service Visibility Updated ');
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
    onClose?.();
  };

  const onClose = () => {
    handleCloseVisibility?.();
    setAnchorEl?.(false);
  };

  const apiQueryRequester = useGetCategoriesRequesterDropdownQuery({
    params: { limit: 50, role: ROLES?.ORG_REQUESTER },
  });

  const apiQueryAgent = useGetCategoriesAgentDropdownQuery({
    params: { limit: 50, role: ROLES?.ORG_EMPLOYEE },
  });

  return {
    selectedAgentCheckboxes,
    setSelectedAgentCheckboxes,
    selectedRequestorCheckboxes,
    setSelectedRequestorCheckboxes,
    handleSubmit,
    apiQueryAgent,
    apiQueryRequester,
    patchServiceCatalogTriggerStatus,
  };
};

export default useVisibilityAction;
