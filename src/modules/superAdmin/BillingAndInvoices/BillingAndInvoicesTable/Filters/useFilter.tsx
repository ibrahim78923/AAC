import { validationSchema } from './Filters.data';

import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
// import { useGetBilingInvoicesQuery } from "@/services/superAdmin/billing-invoices";
// import { isNullOrEmpty } from "@/utils";

const useFilter = (onClose: any, initialValueProps: any) => {
  // const [jobsParams, setJobsParams] = useState();
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),

    defaultValues: initialValueProps,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    // setJobsParams(values)
    // const paramsObj: any = {};
    // if (!isNullOrEmpty(jobsParams))
    //   paramsObj['search'] = jobsParams;
    // const queryParams = Object.entries(paramsObj)
    //   .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    //   .join('&');
    // const query = `&${queryParams}`;

    // const { data: assignPlanTableData } = useGetBilingInvoicesQuery<any>({param:jobsParams});

    onClose(false);
  };

  return {
    handleSubmit,
    onSubmit,
    methods,
  };
};

export default useFilter;
