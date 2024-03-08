import { useForm } from 'react-hook-form';
import { closureRoleDefaultValues } from './ClosureRole.data';
import {
  closeIncidentDataArray,
  resolveIncidentDataArray,
  serviceCloseDataArray,
  serviceResolveDataArray,
} from './ClosureRole.data';
import { useEffect } from 'react';
import { usePostClosureRuleMutation } from '@/services/airServices/settings/service-management/closureRole';
import { useRouter } from 'next/router';
import { AIR_SERVICES } from '@/constants';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useClosureRole = () => {
  const router = useRouter();
  const { closureRuleData, getIsLoading }: any = router?.query;
  const getClosureRuleValues = JSON?.parse(closureRuleData);

  const ticket = {
    incidentClose: 0,
    incidentResolve: 1,
    serviceClose: 1,
    serviceResolve: 0,
  };

  const closureRoleMethods = useForm({
    defaultValues: closureRoleDefaultValues(getClosureRuleValues, ticket),
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

  const { handleSubmit, reset } = closureRoleMethods;
  const handleSubmitClosureRole = handleSubmit(isSubmit);

  const closeIncident = closureRoleMethods?.watch()?.closeIncidentChildTickets;
  const resolveIncident =
    closureRoleMethods?.watch()?.resolveIncidentChildTickets;
  const serviceClose = closureRoleMethods?.watch()?.serviceCloseChildTickets;
  const serviceResolve =
    closureRoleMethods?.watch()?.serviceResolveChildTickets;

  const closeIncidentData = closeIncidentDataArray(closeIncident);
  const resolveIncidentData = resolveIncidentDataArray(resolveIncident);
  const serviceCloseData = serviceCloseDataArray(serviceClose);
  const serviceResolveData = serviceResolveDataArray(serviceResolve);

  useEffect(() => {
    if (closeIncident === false) {
      closureRoleMethods?.setValue('closeIncidentClosedResolved', '');
    }
    if (resolveIncident === false) {
      closureRoleMethods?.setValue('resolveIncidentClosedResolved', '');
    }
    if (serviceClose === false) {
      closureRoleMethods?.setValue('serviceCloseClosedResolved', '');
    }
    if (serviceResolve === false) {
      closureRoleMethods?.setValue('serviceResolveClosedResolved', '');
    }
  }, [closeIncident, resolveIncident, serviceClose, serviceResolve]);

  return {
    closureRoleMethods,
    handleSubmitClosureRole,
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
