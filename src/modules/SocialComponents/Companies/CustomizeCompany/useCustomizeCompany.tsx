import { useTheme } from '@mui/material';
import {
  useGetCustomizeColumnsCompaniesQuery,
  usePutCustomizedColumnsCompaniesMutation,
} from '@/services/commonFeatures/companies';
import { getSession } from '@/utils';
import { useEffect, useState } from 'react';
import {
  errorSnackbar,
  successSnackbar,
  warningSnackbar,
} from '@/lib/snackbar';

const useCustomizeCompany = ({ setIsCustomize, isCustomize }: any) => {
  const theme = useTheme();
  const { user }: any = getSession();
  const [columns, setColumns] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);

  // customize columns code starts here
  const columnsParams = {
    type: 'companies',
  };
  const { data: getCustomizeColumns } =
    useGetCustomizeColumnsCompaniesQuery(columnsParams);
  const columnsData = getCustomizeColumns?.data?.columns;

  const [order, setOrder] = useState(columnsData);

  const onDragEnd = (result: any) => {
    const items = Array.from(order);
    const [reOrderItem] = items?.splice(result?.source?.index, 1);
    items?.splice(result?.destination?.index, 0, reOrderItem);
    setOrder(items);
  };

  const [putCustomizedColumns, { isLoading }] =
    usePutCustomizedColumnsCompaniesMutation();

  const handleUpdateColumns = async () => {
    if (selected?.length > 0) {
      try {
        await putCustomizedColumns({
          body: {
            userId: user?._id,
            type: 'companies',
            columns,
          },
        })
          .unwrap()
          .then((data) => {
            if (data?.data) {
              setIsCustomize({ ...isCustomize, customizeDrawer: false });
              successSnackbar(`Columns customized successfully`);
            }
          });
      } catch (error) {
        errorSnackbar(`${error}`);
      }
    } else {
      warningSnackbar(`Please select atleast ONE column`);
    }
  };

  const handleChackboxChange = (checked: boolean, col: any, i: number) => {
    const newArr = [...columns];
    if (checked) {
      setSelected((prevSelected) => [...prevSelected, col?.slug]);
      newArr[i].active = checked;
    } else if (selected?.includes(col?.slug)) {
      setSelected(
        (prevSelected) =>
          prevSelected?.filter((val: string) => val !== col?.slug),
      );
      newArr[i].active = false;
    }
    setColumns(newArr);
  };

  useEffect(() => {
    setColumns(JSON.parse(JSON.stringify(columnsData)));
    setSelected(
      columnsData
        ?.filter((col: { active: boolean }) => col?.active)
        ?.map((obj: { slug: string }) => obj?.slug),
    );
  }, [columnsData]);

  return {
    handleChackboxChange,
    handleUpdateColumns,
    columnsData,
    selected,
    theme,
    order,
    onDragEnd,
    isLoading,
  };
};

export default useCustomizeCompany;
