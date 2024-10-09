import { ROLES } from '@/constants/strings';
import {
  useGetAirServicesSettingsServicesAllUsersDropdownListQuery,
  useGetAirServicesSettingsServicesRequesterDropdownQuery,
  usePatchAirServicesSettingsServiceCatalogMutation,
} from '@/services/airServices/settings/service-management/service-catalog';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { SyntheticEvent, useState } from 'react';

const useVisibility = (props: any) => {
  const { handleCloseVisibility, setAnchorEl, id } = props;

  const [selectedAgentCheckboxes, setSelectedAgentCheckboxes] = useState<any>(
    [],
  );
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    false,
  );

  const handleAccordionChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded ? panel : false);
    };
  const [selectedRequestorCheckboxes, setSelectedRequestorCheckboxes] =
    useState<any>([]);

  const [patchServiceCatalogTrigger, patchServiceCatalogTriggerStatus] =
    usePatchAirServicesSettingsServiceCatalogMutation();

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

  const apiQueryRequester =
    useGetAirServicesSettingsServicesRequesterDropdownQuery(
      {
        params: { limit: 50, role: ROLES?.ORG_REQUESTER },
      },
      { refetchOnMountOrArgChange: true },
    );

  const apiQueryAgent =
    useGetAirServicesSettingsServicesAllUsersDropdownListQuery(
      {},
      { refetchOnMountOrArgChange: true },
    );

  return {
    selectedAgentCheckboxes,
    setSelectedAgentCheckboxes,
    selectedRequestorCheckboxes,
    setSelectedRequestorCheckboxes,
    handleSubmit,
    apiQueryAgent,
    apiQueryRequester,
    patchServiceCatalogTriggerStatus,
    expandedAccordion,
    handleAccordionChange,
  };
};

export default useVisibility;
