import * as Yup from 'yup';

export const closureRoleValidationSchema = Yup?.object()?.shape({
  closeIncidentTimeAdded: Yup?.boolean(),
  closeIncidentAssociatedTasks: Yup?.boolean(),
  closeIncidentChildTickets: Yup?.boolean(),
  closeIncidentClosedResolved: Yup?.string(),
  resolveIncidentTimeAdded: Yup?.boolean(),
  resolveIncidentAssociatedTasks: Yup?.boolean(),
  resolveIncidentChildTickets: Yup?.boolean(),
  resolveIncidentClosedResolved: Yup?.string(),
  serviceCloseTimeAdded: Yup?.boolean(),
  serviceCloseAssociatedTasks: Yup?.boolean(),
  serviceCloseChildTickets: Yup?.boolean(),
  serviceCloseClosedResolved: Yup?.string(),
  serviceResolveTimeAdded: Yup?.boolean(),
  serviceResolveAssociatedTasks: Yup?.boolean(),
  serviceResolveChildTickets: Yup?.boolean(),
  serviceResolveClosedResolved: Yup?.string(),
});

export const closureRoleDefaultValues = {
  closeIncidentTimeAdded: false,
  closeIncidentAssociatedTasks: false,
  closeIncidentChildTickets: false,
  closeIncidentClosedResolved: '',
  resolveIncidentTimeAdded: false,
  resolveIncidentAssociatedTasks: false,
  resolveIncidentChildTickets: false,
  resolveIncidentClosedResolved: '',
  serviceCloseTimeAdded: false,
  serviceCloseAssociatedTasks: false,
  serviceCloseChildTickets: false,
  serviceCloseClosedResolved: '',
  serviceResolveTimeAdded: false,
  serviceResolveAssociatedTasks: false,
  serviceResolveChildTickets: false,
  serviceResolveClosedResolved: '',
};
