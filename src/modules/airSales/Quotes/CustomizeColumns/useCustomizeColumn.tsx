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
  const [columns, setColumns] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const { user }: any = getSession();

  const columnsParams = {
    type: 'quotes',
  };
  const { data: QuoteCustomzieCol } = useGetCustomizeColumnQuery(columnsParams);
  const [putCustomizedColumns] = usePutCustomizedColumnsMutation();

  const columnsData = QuoteCustomzieCol?.data?.columns;
  const [order, setOrder] = useState(columnsData);

  const onDragEnd = (result: any) => {
    try {
      if (!result?.destination) return;
      const items = Array.from(order);
      const [reOrderItem] = items?.splice(result?.source?.index, 1);
      items.splice(result?.destination?.index, 0, reOrderItem);
      setOrder(items);
    } catch (error) {}
  };
  const handleUpdateColumns = async () => {
    if (selected?.length > 0) {
      try {
        await putCustomizedColumns({
          body: {
            userId: user?._id,
            type: 'quotes',
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
              order;
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
    setColumns(JSON.parse(JSON.stringify(columnsData)));
    setSelected(
      columnsData
        ?.filter((col: { active: boolean }) => col?.active)
        ?.map((obj: { slug: string }) => obj?.slug),
    );
  }, [columnsData]);

  return {
    QuoteCustomzieCol,
    handleChackboxChange,
    handleUpdateColumns,
    columnsData,
    selected,
    theme,
    order,
    onDragEnd,
  };
};

export default useCustomizeColumn;
