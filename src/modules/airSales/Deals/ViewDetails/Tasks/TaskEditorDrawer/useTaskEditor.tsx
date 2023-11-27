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
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';

const useTaskEditor = ({
  selectedCheckboxes,
  openDrawer,
  setOpenDrawer,
  setSelectedCheckboxes,
}: any) => {
  // todo: for edit case taking first element from array
  const editCheckBoxes = selectedCheckboxes && selectedCheckboxes[0];

  const methodsdealsTasks = useForm({
    resolver: yupResolver(dealsTasksValidationSchema),
    defaultValues: async () => {
      if (editCheckBoxes && openDrawer !== 'Add') {
        const {
          name,
          reminder,
          status,
          type,
          associate,
          deal,
          dueDate,
          priority,
          note,
        } = editCheckBoxes;
        return {
          name,
          reminder,
          status,
          type,
          deal,
          associate,
          dueDate: new Date(dueDate),
          priority,
          note,
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

  return { handleSubmit, onSubmit, methodsdealsTasks, onCloseDrawer };
};

export default useTaskEditor;
