import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  closureRoleValidationSchema,
  closureRoleDefaultValues,
} from './ClosureRole.data';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  closeIncidentDataArray,
  resolveIncidentDataArray,
  serviceCloseDataArray,
  serviceResolveDataArray,
} from './ClosureRole.data';
import { useEffect } from 'react';
import { usePostClosureRuleMutation } from '@/services/airServices/settings/service-management/closureRole';

export const useClosureRole = () => {
  const closureRoleMethods = useForm({
    resolver: yupResolver(closureRoleValidationSchema),
    defaultValues: closureRoleDefaultValues,
  });

  //const {data} = useGetClosureRulesQuery(null)
  //console.log('Closure Rule data', data);

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
      reset();
      enqueueSnackbar(res?.message ?? 'Saved Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
    } catch (error) {
      enqueueSnackbar(`${error}`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
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
      closureRoleMethods?.setValue(
        'closeIncidentClosedResolved',
        closureRoleDefaultValues?.closeIncidentClosedResolved,
      );
    }
    if (resolveIncident === false) {
      closureRoleMethods?.setValue(
        'resolveIncidentClosedResolved',
        closureRoleDefaultValues?.resolveIncidentClosedResolved,
      );
    }
    if (serviceClose === false) {
      closureRoleMethods?.setValue(
        'serviceCloseClosedResolved',
        closureRoleDefaultValues?.serviceCloseClosedResolved,
      );
    }
    if (serviceResolve === false) {
      closureRoleMethods?.setValue(
        'serviceResolveClosedResolved',
        closureRoleDefaultValues?.serviceResolveClosedResolved,
      );
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
  };
};
