import { ROLES } from '@/constants/strings';
import {
  useGetCategoriesAgentDropdownQuery,
  useGetCategoriesRequesterDropdownQuery,
  usePatchServiceCatalogMutation,
} from '@/services/airServices/settings/service-management/service-catalog';
import { errorSnackbar, successSnackbar } from '@/utils/api';

import { useState } from 'react';
const useVisibilityAction = (props: any) => {
  const { handleCloseVisibility, setAnchorEl, id } = props;
  const [selectedAgentCheckboxes, setSelectedAgentCheckboxes] = useState<any>(
    [],
  );
  const [selectedRequestorCheckboxes, setSelectedRequestorCheckboxes] =
    useState<any>([]);
  const [patchServiceCatalogTrigger] = usePatchServiceCatalogMutation();
  const handleSubmit = async () => {
    const moveToCategoryData = new FormData();
    moveToCategoryData.append('id', id?.selectedCheckboxes?.[0]);
    !!selectedAgentCheckboxes?.length &&
      moveToCategoryData.append('agentVisibilty', selectedAgentCheckboxes);
    !!selectedRequestorCheckboxes?.length &&
      moveToCategoryData.append(
        'requesterVisibilty',
        selectedRequestorCheckboxes,
      );
    const body = moveToCategoryData;

    const patchServiceCatalogParameter = { body };
    try {
      await patchServiceCatalogTrigger(patchServiceCatalogParameter)?.unwrap();

      successSnackbar('Service Visibility Updated ');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
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
  };
};

export default useVisibilityAction;
