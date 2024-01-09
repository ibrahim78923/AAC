import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useGetCategoriesAgentDropdownQuery,
  useGetCategoriesRequesterDropdownQuery,
  usePatchServiceCatalogMutation,
} from '@/services/airServices/settings/service-management/service-catalog';
import { enqueueSnackbar } from 'notistack';
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
      const response = await patchServiceCatalogTrigger(
        patchServiceCatalogParameter,
      )?.unwrap();

      enqueueSnackbar(
        response?.data?.message ?? 'Service Visibility Updated ',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    onClose?.();
  };
  const onClose = () => {
    handleCloseVisibility?.();
    setAnchorEl?.(false);
  };
  const apiQueryRequester = useGetCategoriesRequesterDropdownQuery({
    params: { limit: 50, role: 'ORG_REQUESTER' },
  });
  const apiQueryAgent = useGetCategoriesAgentDropdownQuery({
    params: { limit: 50, role: 'ORG_AGENT' },
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
