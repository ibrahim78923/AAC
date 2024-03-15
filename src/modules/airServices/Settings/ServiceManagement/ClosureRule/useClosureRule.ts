import { useForm } from 'react-hook-form';
import { closureRuleDefaultValues } from './ClosureRule.data';
import {
  closeIncidentDataArray,
  resolveIncidentDataArray,
  serviceCloseDataArray,
  serviceResolveDataArray,
} from './ClosureRule.data';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  useGetClosureRulesQuery,
  usePostClosureRuleMutation,
} from '@/services/airServices/settings/service-management/closureRule';

export const useClosureRule = () => {
  const router = useRouter();
  const { data, isLoading: getIsLoading } = useGetClosureRulesQuery(null);
  const getClosureRuleValues = data?.data;

  const ticket = {
    incidentClose: 0,
    incidentResolve: 1,
    serviceClose: 1,
    serviceResolve: 0,
  };

  const closureRuleMethods = useForm({
    defaultValues: closureRuleDefaultValues(getClosureRuleValues, ticket),
  });

  const [postClosureRuleTrigger, postClosureRuleProgress] =
    usePostClosureRuleMutation();
  const isLoading = postClosureRuleProgress?.isLoading;

  const isSubmit = async (data: any) => {
    const payload = {
      incident: [
        {
          associatedTasksCompleted: data?.closeIncidentAssociatedTasks,
          timeEntryAdded: data?.closeIncidentTimeAdded,
          childTickets: {
            closed:
              data?.closeIncidentClosedResolved === 'Closed' ? true : false,
            resolved:
              data?.closeIncidentClosedResolved === 'Either closed or resolved'
                ? true
                : false,
          },
          type: 'CLOSED_INCIDENT',
        },
        {
          associatedTasksCompleted: data?.resolveIncidentAssociatedTasks,
          timeEntryAdded: data?.resolveIncidentTimeAdded,
          childTickets: {
            closed:
              data?.resolveIncidentClosedResolved === 'Closed' ? true : false,
            resolved:
              data?.resolveIncidentClosedResolved ===
              'Either closed or resolved'
                ? true
                : false,
          },
          type: 'RESOLVED_INCIDENT',
        },
      ],
      services: [
        {
          associatedTasksCompleted: data?.serviceResolveAssociatedTasks,
          timeEntryAdded: data?.serviceResolveTimeAdded,
          childTickets: {
            closed:
              data?.serviceResolveClosedResolved === 'Closed' ? true : false,
            resolved:
              data?.serviceResolveClosedResolved === 'Either closed or resolved'
                ? true
                : false,
          },
          type: 'RESOLVED_SERVICES',
        },
        {
          associatedTasksCompleted: data?.serviceCloseAssociatedTasks,
          timeEntryAdded: data?.serviceCloseTimeAdded,
          childTickets: {
            closed:
              data?.serviceCloseClosedResolved === 'Closed' ? true : false,
            resolved:
              data?.serviceCloseClosedResolved === 'Either closed or resolved'
                ? true
                : false,
          },
          type: 'CLOSED_SERVICES',
        },
      ],
    };
    try {
      const res: any = await postClosureRuleTrigger(payload)?.unwrap();
      successSnackbar(res?.message ?? 'Saved Successfully');
      handleBack();
      reset();
    } catch (error) {
      errorSnackbar();
    }
  };

  const handleBack = () => {
    router?.push({
      pathname: AIR_SERVICES?.SERVICE_MANAGEMENT,
    });
  };

  const handleCancel = () => {
    handleBack();
    reset();
  };

  const { handleSubmit, reset } = closureRuleMethods;
  const handleSubmitClosureRule = handleSubmit(isSubmit);

  const closeIncident = closureRuleMethods?.watch()?.closeIncidentChildTickets;
  const resolveIncident =
    closureRuleMethods?.watch()?.resolveIncidentChildTickets;
  const serviceClose = closureRuleMethods?.watch()?.serviceCloseChildTickets;
  const serviceResolve =
    closureRuleMethods?.watch()?.serviceResolveChildTickets;

  const closeIncidentData = closeIncidentDataArray(closeIncident);
  const resolveIncidentData = resolveIncidentDataArray(resolveIncident);
  const serviceCloseData = serviceCloseDataArray(serviceClose);
  const serviceResolveData = serviceResolveDataArray(serviceResolve);

  useEffect(() => {
    if (closeIncident === false) {
      closureRuleMethods?.setValue('closeIncidentClosedResolved', '');
    }
    if (resolveIncident === false) {
      closureRuleMethods?.setValue('resolveIncidentClosedResolved', '');
    }
    if (serviceClose === false) {
      closureRuleMethods?.setValue('serviceCloseClosedResolved', '');
    }
    if (serviceResolve === false) {
      closureRuleMethods?.setValue('serviceResolveClosedResolved', '');
    }
  }, [closeIncident, resolveIncident, serviceClose, serviceResolve]);

  return {
    closureRuleMethods,
    handleSubmitClosureRule,
    reset,
    closeIncidentData,
    resolveIncidentData,
    serviceCloseData,
    serviceResolveData,
    isLoading,
    getIsLoading,
    handleCancel,
  };
};
