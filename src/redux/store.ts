import { configureStore } from '@reduxjs/toolkit';
import { baseAPI } from '../services/base-api';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import chatSlice from './slices/chat/slice';
import emailSlice from './slices/email/others/slice';
import gmailSlice from './slices/email/gmail/slice';
import outlookSlice from './slices/email/outlook/slice';
import authSlice from './slices/auth/slice';
import SocialInboxSlice from './slices/socialInbox/index';
import planManagementSlice from './slices/planManagement/planManagementSlice';
import taskManagementSlice from './slices/taskManagement/taskManagementSlice';
import dealsTaskSlice from './slices/airSales/Deals/ViewDetails/Tasks/taskSlice';
import subscriptionAndInvoicesSlice from './slices/orgAdmin/SubscriptionAndInvoices';
import forecastSlice from './slices/forecast/forecastSlice';
import genericReportSlice from './slices/genericReport/genericReportSlice';
import salesWorkflowSlice from './slices/salesWorkflow';
import servicesWorkflowSlice from './slices/servicesWorkflow';
import servicesKnowledgeBaseSlice from './slices/airServices/knowledge-base/slice';
import servicesTicketsSlice from './slices/airServices/tickets/slice';
import operationsReportsListsSlice from './slices/airOperations/reports/slice';
import servicesRelatedTicketsSlice from './slices/airServices/related-tickets/slice';
import servicesTicketTasksSlice from './slices/airServices/tickets-tasks/slice';
import operationsRestoreReportsListsSlice from './slices/airOperations/restore-reports/slice';
import operationsUsersSlice from './slices/airOperations/users/slice';
import operationsTeamSlice from './slices/airOperations/teams/slice';
import servicesTicketApprovalsSlice from './slices/airServices/tickets-approvals/slice';
import notificationsSlice from './slices/notifications/notifications';
import servicesTicketConversationSlice from './slices/airServices/ticket-conversation/slice';
import loyaltyProgramRoleAndRightsSlice from './slices/airLoyaltyProgram/roles-and-right/slice';
import loyaltyProgramUsersSlice from './slices/airLoyaltyProgram/users/slice';
import loyaltyProgramRulesSlice from './slices/airLoyaltyProgram/rules/slice';
import loyaltyProgramTiersSlice from './slices/airLoyaltyProgram/tiers/slice';
import servicesDashboardSlice from './slices/airServices/dashboard/slice';
import quotesSlice from './slices/airSales/Quotes/quotesSlice';
import loyaltyProgramDashboardSlice from './slices/airLoyaltyProgram/dashboard';

const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    chat: chatSlice,
    notifications: notificationsSlice,
    email: emailSlice,
    gmail: gmailSlice,
    outlook: outlookSlice,
    task: taskManagementSlice,
    task_deals: dealsTaskSlice,
    subscriptionAndInvoices: subscriptionAndInvoicesSlice,
    auth: authSlice,
    socialInbox: SocialInboxSlice,
    planManagementForms: planManagementSlice,
    forecastForm: forecastSlice,
    genericReport: genericReportSlice,
    salesWorkflow: salesWorkflowSlice,
    servicesWorkflow: servicesWorkflowSlice,
    servicesKnowledgeBase: servicesKnowledgeBaseSlice,
    servicesTickets: servicesTicketsSlice,
    operationsReportsLists: operationsReportsListsSlice,
    servicesRelatedTickets: servicesRelatedTicketsSlice,
    servicesTicketTasks: servicesTicketTasksSlice,
    operationsRestoreReportsLists: operationsRestoreReportsListsSlice,
    operationsUsersLists: operationsUsersSlice,
    operationsTeam: operationsTeamSlice,
    servicesTicketApprovals: servicesTicketApprovalsSlice,
    servicesTicketConversation: servicesTicketConversationSlice,
    loyaltyProgramRoleAndRights: loyaltyProgramRoleAndRightsSlice,
    loyaltyProgramUsers: loyaltyProgramUsersSlice,
    loyaltyProgramRules: loyaltyProgramRulesSlice,
    loyaltyProgramTiers: loyaltyProgramTiersSlice,
    servicesDashboard: servicesDashboardSlice,
    quotesForm: quotesSlice,
    loyaltyProgramDashboard: loyaltyProgramDashboardSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export default store;
