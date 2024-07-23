import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetAssetTypeFieldsQuery } from '@/services/airServices/settings/asset-management/asset-type';
import { useTheme } from '@mui/material';

export default function useAssetType() {
  const router: any = useRouter();
  const theme: any = useTheme();

  const [hoveredAccordion, setHoveredAccordion] = useState<string | null>(null);
  const [hoveredChild, setHoveredChild] = useState<string | null>(null);
  const [defaultFields, setDefaultFields] = useState<boolean>(false);

  const [parentDetails, setParentDetails] = useState<any>({
    open: false,
    parentData: null,
  });
  const [childDetails, setChildDetails] = useState<any>({
    open: false,
    parentData: null,
    childData: null,
  });

  const params = {
    meta: false,
  };

  const { data, isLoading, isFetching, isError } =
    useGetAssetTypeFieldsQuery(params);

  return {
    theme,
    router,
    setParentDetails,
    isLoading,
    isFetching,
    isError,
    data,
    setHoveredAccordion,
    hoveredAccordion,
    setHoveredChild,
    hoveredChild,
    setChildDetails,
    parentDetails,
    childDetails,
    setDefaultFields,
    defaultFields,
  };
}
