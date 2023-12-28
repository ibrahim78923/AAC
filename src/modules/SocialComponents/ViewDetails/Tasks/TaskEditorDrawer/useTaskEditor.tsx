import { useForm } from 'react-hook-form';

import {
  dealsTasksDefaultValues,
  dealsTasksValidationSchema,
} from './TaskEditor.data';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  usePostDealsTasksManagementMutation,
  useUpdateDealsTasksManagementMutation,
} from '@/services/airSales/deals/view-details/tasks';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const useTaskEditor = ({
  selectedCheckboxes,
  openDrawer,
  setOpenDrawer,
  setSelectedCheckboxes,
}: any) => {
  const editCheckBoxes = selectedCheckboxes && selectedCheckboxes[0];

  const methodsdealsTasks = useForm({
    resolver: yupResolver(dealsTasksValidationSchema),
    defaultValues: async () => {
      if (editCheckBoxes && openDrawer !== 'Add') {
        const {
          name,
          type,
          assignedto,
          dueDate,
          priority,
          note,
          createTime,
          NotifyBefore,
        } = editCheckBoxes;
        return {
          name,
          type,
          assignedto,
          dueDate: new Date(dueDate),
          priority,
          note,
          createTime: new Date(createTime),
          NotifyBefore,
        };
      }
      return dealsTasksDefaultValues;
    },
  });

  const [postDealsTasksManagement] = usePostDealsTasksManagementMutation();
  const [updatedDealsTasksManagement] = useUpdateDealsTasksManagementMutation();

  const onSubmit = async (values: any) => {
    const { dueDate, ...rest } = values;
    const DueDate = dayjs(dueDate)?.format(DATE_FORMAT?.API);
    const body = {
      dueDate: DueDate,
      ...rest,
    };

    // {
    //   "name": "Title Name",
    //   "type": "Call",
    //   "priority": "Title Name",
    //   "status": "Pending",-------------
    //   "dealId": "655633c2d9d816a1a1cfbeb2",----------
    //   "associate": "Companies",-----------
    //   "assignTo": "652627f809a15759b979dd3a",
    //   "dueDate": "2023-10-05",
    //   "time": "00:00",
    //   "reminder": "Today",---------
    //   "note": "Content will display here..."------------
    // }

    try {
      openDrawer === 'Edit'
        ? await updatedDealsTasksManagement({
            body,
            id: editCheckBoxes?._id,
          })?.unwrap()
        : await postDealsTasksManagement({ body })?.unwrap();
      enqueueSnackbar(
        `Task ${openDrawer === 'Edit' ? 'Updated' : 'Added '} Successfully`,
        { variant: 'success' },
      );
      onCloseDrawer();
      setSelectedCheckboxes([]);
    } catch (error) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
  };
  const { handleSubmit, reset } = methodsdealsTasks;

  const onCloseDrawer = () => {
    setOpenDrawer('');
    reset();
  };
  return { handleSubmit, onSubmit, methodsdealsTasks };
};

export default useTaskEditor;
