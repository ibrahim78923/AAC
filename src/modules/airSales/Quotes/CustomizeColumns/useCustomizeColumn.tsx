import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useGetCustomizeColumnQuery,
  usePutCustomizedColumnsMutation,
} from '@/services/airSales/quotes';
import { getSession } from '@/utils';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

const useCustomizeColumn = ({ onClose }: any) => {
  const theme = useTheme();
  const { user }: any = getSession();
  const [columns, setColumns] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);

  const columnsParams = {
    type: 'quotes',
  };
  const { data: getCustomizeColumns } =
    useGetCustomizeColumnQuery(columnsParams);

  const columnsData = getCustomizeColumns?.data?.columns;

  const activeColumns = getCustomizeColumns?.data?.columns?.filter(
    (column: any) => column?.active === true,
  );

  const [order, setOrder] = useState(columnsData);

  const onDragEnd = (result: any) => {
    const items = Array.from(order);
    const [reOrderItem] = items?.splice(result?.source?.index, 1);
    items?.splice(result?.destination?.index, 0, reOrderItem);
    setOrder(items);
  };
  const [putCustomizedColumns] = usePutCustomizedColumnsMutation();

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
              onClose();
              enqueueSnackbar(`Columns customized successfully`, {
                variant: NOTISTACK_VARIANTS?.SUCCESS,
              });
            }
          });
      } catch (error) {
        enqueueSnackbar(`${error}`, { variant: NOTISTACK_VARIANTS?.ERROR });
      }
    } else {
      enqueueSnackbar(`Please select atleast ONE column`, {
        variant: NOTISTACK_VARIANTS?.WARNING,
      });
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
    if (columnsData) {
      setColumns(JSON.parse(JSON.stringify(columnsData)));
      setSelected(
        columnsData
          ?.filter((col: { active: boolean }) => col?.active)
          ?.map((obj: { slug: string }) => obj?.slug),
      );
      setOrder(columnsData);
    }
  }, [columnsData]);

  return {
    theme,
    onDragEnd,
    order,
    selected,
    handleChackboxChange,
    handleUpdateColumns,
    activeColumns,
  };
};

export default useCustomizeColumn;
