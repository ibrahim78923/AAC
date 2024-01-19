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
  companyId,
}: any) => {
  const editCheckBoxes = selectedCheckboxes && selectedCheckboxes[0];

  const methodsdealsTasks = useForm({
    resolver: yupResolver(dealsTasksValidationSchema),
    defaultValues: async () => {
      if (editCheckBoxes && openDrawer !== 'Add') {
        const {
          name,
          type,
          assignTo,
          dueDate,
          priority,
          note,
          createTime,
          reminder,
        } = editCheckBoxes;
        return {
          name,
          type,
          assignTo,
          dueDate: new Date(dueDate),
          priority,
          note,
          createTime: new Date(createTime),
          reminder,
        };
      }
      return dealsTasksDefaultValues;
    },
  });

  const [postDealsTasksManagement] = usePostDealsTasksManagementMutation();
  const [updatedDealsTasksManagement] = useUpdateDealsTasksManagementMutation();

  const onSubmit = async (values: any) => {
    const { dueDate, createTime, ...rest } = values;
    const DueDate = dayjs(dueDate)?.format(DATE_FORMAT?.API);
    const CreateTime = dayjs(createTime)?.format(DATE_FORMAT?.API);

    const body = {
      dueDate: DueDate,
      time: CreateTime,
      ...rest,
    };

    if (openDrawer !== 'Edit') {
      body.companiesIds = [companyId];
    }

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
