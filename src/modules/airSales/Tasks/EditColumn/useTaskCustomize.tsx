import { NOTISTACK_VARIANTS } from '@/constants/strings';
import {
  useGetTaskColumnsQuery,
  usePutTaskCustomizedColumnsMutation,
} from '@/services/airSales/task';
import { getSession } from '@/utils';
import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

const useTaskCustomize = ({ onClose }: any) => {
  const theme = useTheme();
  const { user }: any = getSession();

  const [columns, setColumns] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  // customize columns code starts here
  const columnsParams = {
    type: 'tasks',
  };
  const { data: taskCustomizeCol } = useGetTaskColumnsQuery(columnsParams);

  const columnsData = taskCustomizeCol?.data?.columns;
  const [order, setOrder] = useState<any>();

  const onDragEnd = (result: any) => {
    try {
      if (!result?.destination) return;
      const items = Array.from(order);
      const [reOrderItem] = items?.splice(result?.source?.index, 1);
      items.splice(result?.destination?.index, 0, reOrderItem);
      setOrder(items);
    } catch (error) {}
  };

  const [putTaskCustomizedColumns] = usePutTaskCustomizedColumnsMutation();
  const handleUpdateColumns = async () => {
    if (selected?.length > 0) {
      try {
        await putTaskCustomizedColumns({
          body: {
            userId: user?._id,
            type: 'tasks',
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

  const handleCheckboxChange = (checked: boolean, col: any, i: number) => {
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      updatedColumns[i] = {
        ...updatedColumns[i],
        active: checked,
      };

      return updatedColumns;
    });
    setSelected((prevSelected) => {
      if (checked) {
        return [...prevSelected, col?.slug];
      } else {
        return prevSelected?.filter((val: string) => val !== col?.slug);
      }
    });
  };

  useEffect(() => {
    setColumns(columnsData);
    setSelected(
      columnsData
        ?.filter((col: { active: boolean }) => col?.active)
        ?.map((obj: { slug: string }) => obj?.slug),
    );
  }, [columnsData]);

  // useEffect(() => {
  //   const isColumnsDataChanged =
  //     JSON.stringify(columnsData) !== JSON.stringify(columns);

  //   if (isColumnsDataChanged) {
  //     setColumns(JSON.parse(JSON.stringify(columnsData)));

  //     setSelected(
  //       columnsData
  //         ?.filter((col: { active: boolean }) => col?.active)
  //         ?.map((obj: { slug: string }) => obj?.slug),
  //     );
  //   }
  // }, [columnsData, columns]);

  useEffect(() => {
    setOrder(taskCustomizeCol?.data?.columns);
  }, [taskCustomizeCol?.data?.columns]);

  return {
    handleCheckboxChange,
    handleUpdateColumns,
    columnsData,
    selected,
    theme,
    order,
    onDragEnd,
  };
};

export default useTaskCustomize;
