import {
  newIncidentFormFieldsDynamic,
  newIncidentValidationSchema,
  newIncidentsDefaultValuesFunction,
} from './NewIncident.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  useGetTicketsByIdQuery,
  useLazyGetAgentDropdownQuery,
  useLazyGetAssociateAssetsDropdownQuery,
  useLazyGetCategoriesDropdownQuery,
  useLazyGetDepartmentDropdownQuery,
  useLazyGetRequesterDropdownQuery,
} from '@/services/airServices/tickets';
import { useRouter } from 'next/router';
import usePath from '@/hooks/usePath';
export const useNewIncident = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const { setIsDrawerOpen, setSelectedTicketList } = props;
  const { makePath } = usePath();
  const ticketId = searchParams?.get('ticketId');

  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };
  //   const [putTicketTrigger] = usePostTicketsMutation();
  // console.log(putTicketTrigger);
  const methods: any = useForm<any>({
    resolver: yupResolver(newIncidentValidationSchema),
    defaultValues: newIncidentsDefaultValuesFunction(),
  });
  const { data, isLoading, isFetching, isError } = useGetTicketsByIdQuery(
    getSingleTicketParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    },
  );

  const { handleSubmit, reset } = methods;

  const onSubmit = async () => {
    enqueueSnackbar(` Incident Created Successfully!`, {
      variant: NOTISTACK_VARIANTS?.SUCCESS,
    });
    // setSelectedTicketList?.([]);
    reset();
    onClose();
    return;
  };
  useEffect(() => {
    reset(() => newIncidentsDefaultValuesFunction(data?.data));
  }, [data, reset]);
  // const apiQueryOrganizations = useLazyGetOrganizationsQuery();

  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const apiQueryRequester = useLazyGetRequesterDropdownQuery();
  const apiQueryAgent = useLazyGetAgentDropdownQuery();
  const apiQueryAssociateAsset = useLazyGetAssociateAssetsDropdownQuery();
  const apiQueryCategories = useLazyGetCategoriesDropdownQuery();

  const newIncidentFormFields = newIncidentFormFieldsDynamic(
    apiQueryRequester,
    apiQueryDepartment,
    apiQueryAgent,
    apiQueryCategories,
    apiQueryAssociateAsset,
    router,
  );
  const onClose = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['ticketAction'],
      }),
    );
    // setSelectedTicketList([]);
    reset?.();
    // setIsDrawerOpen?.(false);
  };
  // const onSubmit = async () => {
  //   enqueueSnackbar('Incident Associated Successfully!', {
  //     variant: 'success',
  //   });
  //   onClose(false);
  // };
  return {
    handleSubmit,
    onSubmit,
    methods,
    newIncidentFormFields,
    isLoading,
    isFetching,
    isError,
    onClose,
  };
};
