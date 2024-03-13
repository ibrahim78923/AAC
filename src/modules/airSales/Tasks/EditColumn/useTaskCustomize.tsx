import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

const useTaskCustomize = () => {
  const theme = useTheme();
  // const { user }: any = getSession();

  const [columns, setColumns] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  // customize columns code starts here
  // const columnsParams = {
  //     type: 'deals',
  // };
  //   const { data: dealCustomzieCol } = useGetCustomizeColumnQuery(columnsParams);

  const columnsData = [
    {
      slug: 'Contacted Person',
      attributes:
        'contactedPerson.name contactedPerson.email contactedPerson.profileImage',
      active: true,
      order: 1,
    },
    {
      slug: 'Deal Name',
      attributes: 'name',
      active: true,
      order: 2,
    },
    {
      slug: 'Deal Owner',
      attributes: 'dealOwner.name email profileImage',
      active: true,
      order: 3,
    },
    {
      slug: 'Priority',
      attributes: 'priority',
      active: false,
      order: 4,
    },
    {
      slug: 'Close Date',
      attributes: 'createdAt',
      active: false,
      order: 5,
    },
    {
      slug: 'Created Date',
      attributes: 'createdAt',
      active: false,
      order: 6,
    },
    {
      slug: 'Deal Stage',
      attributes: 'dealStage',
      active: true,
      order: 7,
    },
    {
      slug: 'Deal Pipeline',
      attributes: 'dealPipeline',
      active: true,
      order: 8,
    },
    {
      slug: 'Amount',
      attributes: 'amount',
      active: true,
      order: 9,
    },
  ];

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

  //   const [putCustomizedColumns] = usePutCustomizedColumnsMutation();

  const handleUpdateColumns = async () => {
    // if (selected?.length > 0) {
    //   try {
    //     await putCustomizedColumns({
    //       body: {
    //         userId: user?._id,
    //         type: 'deals',
    //         columns,
    //       },
    //     })
    //       .unwrap()
    //       .then((data) => {
    //         if (data?.data) {
    //           onClose();
    //           enqueueSnackbar(`Columns customized successfully`, {
    //             variant: NOTISTACK_VARIANTS?.SUCCESS,
    //           });
    //           order;
    //         }
    //       });
    //   } catch (error) {
    //     enqueueSnackbar(`${error}`, { variant: NOTISTACK_VARIANTS?.ERROR });
    //   }
    // } else {
    //   enqueueSnackbar(`Please select atleast ONE column`, {
    //     variant: NOTISTACK_VARIANTS?.WARNING,
    //   });
    // }
  };

  const handleCheckboxChange = (checked: boolean, col: any, i: number) => {
    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];

      // Update the active state of the column
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

  // useEffect(() => {
  //     setColumns(JSON.parse(JSON.stringify(columnsData)));
  //     setSelected(
  //         columnsData
  //             ?.filter((col: { active: boolean }) => col?.active)
  //             ?.map((obj: { slug: string }) => obj?.slug),
  //     );
  // }, [columnsData]);

  useEffect(() => {
    const isColumnsDataChanged =
      JSON.stringify(columnsData) !== JSON.stringify(columns);

    if (isColumnsDataChanged) {
      setColumns(JSON.parse(JSON.stringify(columnsData)));

      setSelected(
        columnsData
          ?.filter((col: { active: boolean }) => col?.active)
          ?.map((obj: { slug: string }) => obj?.slug),
      );
    }
  }, [columnsData, columns]);

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
