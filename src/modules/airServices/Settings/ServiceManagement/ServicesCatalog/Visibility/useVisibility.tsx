import useAuth from '@/hooks/useAuth';
import {
  useGetAirServicesSettingsServicesAgentsDropdownListQuery,
  useGetAirServicesSettingsServicesRequestersDropdownListQuery,
  usePatchAirServicesSettingsServiceCatalogMutation,
} from '@/services/airServices/settings/service-management/service-catalog';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { SyntheticEvent, useState } from 'react';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';

const useVisibility = (props: any) => {
  const { handleCloseVisibility, setAnchorEl, id, setSelectedCheckboxes } =
    props;
  const auth: any = useAuth();
  const productId = auth?.product?._id ?? {};
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
    if (
      (!selectedAgentCheckboxes ||
        selectedAgentCheckboxes?.length === SELECTED_ARRAY_LENGTH?.ZERO) &&
      (!selectedRequestorCheckboxes ||
        selectedRequestorCheckboxes?.length === SELECTED_ARRAY_LENGTH?.ZERO)
    ) {
      errorSnackbar('Please Select Visibility');
      return;
    }
    const moveToCategoryData: any = {};

    if (
      selectedAgentCheckboxes &&
      selectedAgentCheckboxes?.length > SELECTED_ARRAY_LENGTH?.ZERO
    ) {
      moveToCategoryData.agentVisibilty = selectedAgentCheckboxes;
    }

    if (
      selectedRequestorCheckboxes &&
      selectedRequestorCheckboxes?.length > SELECTED_ARRAY_LENGTH?.ZERO
    ) {
      moveToCategoryData.requesterVisibilty = selectedRequestorCheckboxes;
    }

    if (id && id?.selectedCheckboxes) {
      moveToCategoryData.ids = id?.selectedCheckboxes;
    }

    const body = moveToCategoryData;

    const patchServiceCatalogParameter = { body };
    try {
      await patchServiceCatalogTrigger(patchServiceCatalogParameter)?.unwrap();

      successSnackbar('Service visibility updated ');
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
    setSelectedCheckboxes?.([]);
    onClose?.();
  };

  const onClose = () => {
    handleCloseVisibility?.();
    setAnchorEl?.(false);
  };

  const apiQueryRequester =
    useGetAirServicesSettingsServicesRequestersDropdownListQuery(
      {
        params: { requester: true, admin: true, productId },
      },
      { refetchOnMountOrArgChange: true },
    );

  const apiQueryAgent =
    useGetAirServicesSettingsServicesAgentsDropdownListQuery(
      { params: { productId } },
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
