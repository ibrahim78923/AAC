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
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { useGetContactsQuery } from '@/services/commonFeatures/contacts';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

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

  const { data: dataContactsList } = useGetContactsQuery({});
  const contactsList = dataContactsList?.data?.contacts?.map((item: any) => ({
    value: item?._id,
    label: `${item?.firstName} ${item?.lastName}`,
  }));

  const [postDealsTasksManagement] = usePostDealsTasksManagementMutation();
  const [updatedDealsTasksManagement] = useUpdateDealsTasksManagementMutation();

  const onSubmit = async (values: any) => {
    const { dueDate, createTime, ...rest } = values;
    const DueDate = dayjs(dueDate).isValid()
      ? dayjs(dueDate).format(DATE_FORMAT?.API)
      : undefined;
    const CreateTime = dayjs(createTime).isValid()
      ? dayjs(createTime).format(DATE_FORMAT?.API)
      : undefined;

    const cleanedValues = Object.fromEntries(
      Object.entries(rest).filter(([, v]) => v != null && v !== ''),
    );

    const body = {
      dueDate: DueDate,
      time: CreateTime,
      ...cleanedValues,
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
      successSnackbar(
        `Task ${openDrawer === 'Edit' ? 'Updated' : 'Added '} Successfully`,
      );
      onCloseDrawer();
      setSelectedCheckboxes([]);
    } catch (error) {
      const errMsg = error?.data?.message;
      errorSnackbar(errMsg ?? 'Error occurred');
    }
  };
  const { handleSubmit, reset } = methodsdealsTasks;

  const onCloseDrawer = () => {
    setOpenDrawer('');
    reset();
  };

  return { handleSubmit, onSubmit, methodsdealsTasks, contactsList };
};

export default useTaskEditor;
