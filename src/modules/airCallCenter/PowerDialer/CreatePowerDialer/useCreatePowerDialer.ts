import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { successSnackbar } from '@/utils/api';
import { PAGINATION } from '@/config';
import {
  createPowerDialerFieldsDefaultValues,
  createPowerDialerSchema,
} from './CreatePowerDialer.data';

export const useCreatePowerDialer = (props: any) => {
  const { powerDialerModal, setPowerDialerModal } = props;
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [buttonName, setButtonName] = useState<string>('Contacts');
  const [search, setSearch] = useState<any>('');
  const [selectedData, setSelectedData] = useState([]);

  const method: any = useForm({
    resolver: yupResolver(createPowerDialerSchema),
    defaultValues: createPowerDialerFieldsDefaultValues(),
  });

  const onSubmit = async () => {
    successSnackbar('Submitted successfully');
  };

  return {
    page,
    setPage,
    pageLimit,
    setPageLimit,
    buttonName,
    setButtonName,
    search,
    setSearch,
    selectedData,
    setSelectedData,
    method,
    onSubmit,
    powerDialerModal,
    setPowerDialerModal,
  };
};
