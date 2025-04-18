import { closureRuleDefaultValues } from './ClosureRule.data';
import {
  closeIncidentDataArray,
  resolveIncidentDataArray,
  serviceCloseDataArray,
  serviceResolveDataArray,
} from './ClosureRule.data';
import { useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants/routes';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  useGetAirServicesSettingsServiceClosureRulesQuery,
  usePostAirServicesSettingsServiceClosureRuleMutation,
} from '@/services/airServices/settings/service-management/closureRule';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { useFormLib } from '@/hooks/useFormLib';

export const useClosureRule = () => {
  const router = useRouter();

  const { data, isLoading, isFetching, isError, refetch } =
    useGetAirServicesSettingsServiceClosureRulesQuery(null, {
      refetchOnMountOrArgChange: true,
    });

  const ticket = useMemo(
    () => ({
      incidentClose: 0,
      incidentResolve: 1,
      serviceClose: 1,
      serviceResolve: 0,
    }),
    [],
  );

  const formLibProps = {
    defaultValues: closureRuleDefaultValues(data?.data, ticket),
  };

  const { handleSubmit, reset, methods, watch, setValue, getValues } =
    useFormLib(formLibProps);

  useEffect(() => {
    reset(() => closureRuleDefaultValues(data?.data, ticket));
  }, [data, ticket, reset]);

  const [closeIncident, resolveIncident, serviceClose, serviceResolve] = watch([
    'closeIncidentChildTickets',
    'resolveIncidentChildTickets',
    'serviceCloseChildTickets',
    'serviceResolveChildTickets',
  ]);

  const closeIncidentData = useMemo(
    () => closeIncidentDataArray(closeIncident),
    [closeIncident],
  );
  const resolveIncidentData = useMemo(
    () => resolveIncidentDataArray(resolveIncident),
    [resolveIncident],
  );
  const serviceCloseData = useMemo(
    () => serviceCloseDataArray(serviceClose),
    [serviceClose],
  );
  const serviceResolveData = useMemo(
    () => serviceResolveDataArray(serviceResolve),
    [serviceResolve],
  );

  useEffect(() => {
    if (closeIncident) {
      if (!getValues('closeIncidentClosedResolved')) {
        setValue('closeIncidentClosedResolved', 'IncidentCloseClosed');
      }
    } else {
      setValue('closeIncidentClosedResolved', '');
    }

    if (resolveIncident) {
      if (!getValues('resolveIncidentClosedResolved')) {
        setValue('resolveIncidentClosedResolved', 'IncidentResolveEither');
      }
    } else {
      setValue('resolveIncidentClosedResolved', '');
    }

    if (serviceClose) {
      if (!getValues('serviceCloseClosedResolved')) {
        setValue('serviceCloseClosedResolved', 'ServiceResolveClosed');
      }
    } else {
      setValue('serviceCloseClosedResolved', '');
    }

    if (serviceResolve) {
      if (!getValues('serviceResolveClosedResolved')) {
        setValue('serviceResolveClosedResolved', 'ServiceCloseEither');
      }
    } else {
      setValue('serviceResolveClosedResolved', '');
    }
  }, [
    closeIncident,
    resolveIncident,
    serviceClose,
    serviceResolve,
    setValue,
    methods,
  ]);

  const [postClosureRuleTrigger, postClosureRuleProgress] =
    usePostAirServicesSettingsServiceClosureRuleMutation();

  const onSubmit = useCallback(
    async (formData: any) => {
      const payload = {
        incident: [
          {
            associatedTasksCompleted: formData?.closeIncidentAssociatedTasks,
            timeEntryAdded: formData?.closeIncidentTimeAdded,
            childTickets: {
              closed:
                formData?.closeIncidentClosedResolved === 'IncidentCloseClosed',
              resolved:
                formData?.closeIncidentClosedResolved === 'IncidentCloseEither',
            },
            type: 'CLOSED_INCIDENT',
          },
          {
            associatedTasksCompleted: formData?.resolveIncidentAssociatedTasks,
            timeEntryAdded: formData?.resolveIncidentTimeAdded,
            childTickets: {
              closed:
                formData?.resolveIncidentClosedResolved ===
                'IncidentResolveClosed',
              resolved:
                formData?.resolveIncidentClosedResolved ===
                'IncidentResolveEither',
            },
            type: 'RESOLVED_INCIDENT',
          },
        ],
        services: [
          {
            associatedTasksCompleted: formData?.serviceResolveAssociatedTasks,
            timeEntryAdded: formData?.serviceResolveTimeAdded,
            childTickets: {
              closed:
                formData?.serviceResolveClosedResolved === 'ServiceCloseClosed',
              resolved:
                formData?.serviceResolveClosedResolved === 'ServiceCloseEither',
            },
            type: 'RESOLVED_SERVICES',
          },
          {
            associatedTasksCompleted: formData?.serviceCloseAssociatedTasks,
            timeEntryAdded: formData?.serviceCloseTimeAdded,
            childTickets: {
              closed:
                formData?.serviceCloseClosedResolved === 'ServiceResolveClosed',
              resolved:
                formData?.serviceCloseClosedResolved === 'ServiceResolveEither',
            },
            type: 'CLOSED_SERVICES',
          },
        ],
      };
      try {
        await postClosureRuleTrigger(payload).unwrap();
        successSnackbar('Closure rule added successfully');
        handleBack();
        reset();
      } catch (error) {
        const errorResponse = error as IErrorResponse;
        errorSnackbar(errorResponse?.data?.message);
      }
    },
    [postClosureRuleTrigger, reset],
  );

  const handleBack = useCallback(() => {
    router.push({
      pathname: AIR_SERVICES.SERVICE_MANAGEMENT,
    });
  }, [router]);

  const handleCancel = useCallback(() => {
    handleBack();
    reset();
  }, [handleBack, reset]);

  return {
    methods,
    closeIncidentData,
    resolveIncidentData,
    serviceCloseData,
    serviceResolveData,
    postClosureRuleProgress,
    isLoading,
    handleCancel,
    isError,
    isFetching,
    onSubmit,
    handleSubmit,
    refetch,
  };
};
