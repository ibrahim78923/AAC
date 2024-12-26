import {
  upsertLocationsDefaultValues,
  upsertLocationsFormFieldsDynamic,
  upsertLocationsFormValidationSchema,
} from './UpsertLocations.data';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import {
  usePatchCommonMeetingsLocationsMutation,
  usePostCommonMeetingsLocationsMutation,
} from '@/services/commonFeatures/meetings/settings/locations';
import { useFormLib } from '@/hooks/useFormLib';

export const useUpsertLocations = (props: any) => {
  const { setIsPortalOpen, isPortalOpen } = props;

  const [
    postCommonMeetingsLocationsTrigger,
    postCommonMeetingsLocationsStatus,
  ] = usePostCommonMeetingsLocationsMutation();

  const [
    patchCommonMeetingsLocationsTrigger,
    patchCommonMeetingsLocationsStatus,
  ] = usePatchCommonMeetingsLocationsMutation();

  const useFormValues = {
    defaultValues: upsertLocationsDefaultValues?.(isPortalOpen?.data),
    validationSchema: upsertLocationsFormValidationSchema,
  };

  const { handleSubmit, reset, methods } = useFormLib(useFormValues);

  const submitUpsertLocationForm = async (formData: any) => {
    const newFormData = filteredEmptyValues(formData);

    if (isPortalOpen?.isEdit) {
      submitEditLocationForm?.(newFormData);
      return;
    }
    const apiDataParameter = {
      body: newFormData,
    };

    try {
      await postCommonMeetingsLocationsTrigger?.(apiDataParameter)?.unwrap();
      successSnackbar('Meeting location added successfully');
      closeDrawer?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const submitEditLocationForm = async (formData: any) => {
    const apiDataParameter = {
      body: {
        id: isPortalOpen?.data?._id,
        ...formData,
      },
    };

    try {
      await patchCommonMeetingsLocationsTrigger?.(apiDataParameter)?.unwrap();
      successSnackbar('Meeting location updated successfully');
      closeDrawer?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const closeDrawer = () => {
    reset();
    setIsPortalOpen?.({});
  };

  const upsertLocationsFormFields = upsertLocationsFormFieldsDynamic();

  return {
    methods,
    handleSubmit,
    upsertLocationsFormFields,
    closeDrawer,
    submitUpsertLocationForm,
    patchCommonMeetingsLocationsStatus,
    postCommonMeetingsLocationsStatus,
  };
};
