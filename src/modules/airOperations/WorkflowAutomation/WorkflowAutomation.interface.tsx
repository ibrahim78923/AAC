export interface WorkflowAutomationTypesI {
  id: number;
  avatar: () => JSX.Element;
  type: string;
  purpose: string;
  link: string;
  permission: string[];
  hasAccount: boolean;
}
