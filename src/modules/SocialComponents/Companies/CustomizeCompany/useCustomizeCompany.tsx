import { useGetCustomizeColumnsQuery } from '@/services/commonFeatures/companies';
import { useForm } from 'react-hook-form';

const useCustomizeCompany = () => {
  const methods: any = useForm({});

  // customize columns code starts here
  const columnsParams = {
    type: 'companies',
  };
  const { data: getCustomizeColumns } =
    useGetCustomizeColumnsQuery(columnsParams);
  const columnsData = getCustomizeColumns?.data?.columns;
  // customize columns code starts here

  const { handleSubmit } = methods;

  const onSubmit = () => {};
  return {
    methods,
    handleSubmit,
    onSubmit,
    columnsData,
  };
};

export default useCustomizeCompany;
