import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  agentFilterFields,
  defaultValuesAgentFilter,
  validationSchemaAgentFilterFields,
} from './AgentFilter.data';
import { useGetDepartmentQuery } from '@/services/common-APIs';
import { useLazyGetDepartmentDropdownQuery } from '@/services/airServices/tickets';

export const useAgentFilter = (props: any) => {
  const { setAgentFilterDrawerOpen, setFilterAgentData } = props;
  const agentFilterDrawerMethods: any = useForm({
    resolver: yupResolver(validationSchemaAgentFilterFields),
    defaultValues: defaultValuesAgentFilter,
  });
  const { data } = useGetDepartmentQuery(null);
  const departmentData = data?.data?.departments;
  const onSubmit = async (data: any) => {
    setFilterAgentData(data);
    setAgentFilterDrawerOpen(false);
    agentFilterDrawerMethods?.reset();
  };

  const handleCloseDrawer = () => {
    setAgentFilterDrawerOpen(false);
  };
  const apiQueryDepartment = useLazyGetDepartmentDropdownQuery();
  const agentFilterFormFields = agentFilterFields(apiQueryDepartment);
  return {
    onSubmit,
    handleCloseDrawer,
    agentFilterDrawerMethods,
    departmentData,
    agentFilterFormFields,
  };
};
