import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';

const useTaskCardView = ({ data, selectedRec, setSelectedRec }: any) => {
  const theme = useTheme();
  const [taskCardData, setTaskCardData] = useState<any[]>([]);

  const formatTaskDate = (dateString: any) => {
    const date = new Date(dateString);
    return `${date?.getDate()}-${date?.getMonth() + 1}-${date?.getFullYear()}`;
  };

  const taskCardViewData = (tasks: any) => {
    const groupedTasks = tasks?.reduce((acc: any, task: any) => {
      const taskStatus =
        task?.status?.charAt(0)?.toUpperCase() +
        task?.status?.slice(1)?.toLowerCase();
      const assignUser = `${task?.assignedTo[0]?.firstName} ${task?.assignedTo[0]?.lastName}`;
      const lastDate = `Last Date: ${formatTaskDate(task?.dueDate)}`;
      const cardItem = {
        id: task?._id,
        subTitle:
          task?.taskName?.charAt(0)?.toUpperCase() +
          task?.taskName?.slice(1)?.toLowerCase(),
        date: lastDate,
        linkdCompany: 'Outfit',
        assignUser: assignUser,
        status: taskStatus,
      };

      // Add to 'All' category
      if (!acc?.All) {
        acc.All = [];
      }
      acc?.All?.push(cardItem);

      // Add to specific status category
      if (!acc[taskStatus]) {
        acc[taskStatus] = [];
      }
      acc[taskStatus]?.push(cardItem);

      return acc;
    }, {});

    const result = Object?.keys(groupedTasks)?.map((status) => ({
      mainTitle: status,
      cardData: groupedTasks[status],
    }));
    return result;
  };

  const statusConstants = {
    Inprogress: 'Inprogress',
    Pending: 'Pending',
    Complete: 'Completed',
  };

  useEffect(() => {
    setTaskCardData([
      ...taskCardViewData(data)?.map((column: any) => ({
        mainTitle: column?.mainTitle,
        cardData: [...column?.cardData],
      })),
    ]);
  }, []);

  const handleSelectTaskById = (checked: boolean, id: string): void => {
    if (checked) {
      setSelectedRec([...selectedRec, id]);
    } else {
      setSelectedRec(selectedRec?.filter((_id: any) => _id !== id));
    }
  };

  return {
    theme,
    taskCardData,
    statusConstants,
    setTaskCardData,
    taskCardViewData,
    handleSelectTaskById,
  };
};
export default useTaskCardView;
