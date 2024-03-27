import { RHFEditor, RHFTextField } from '@/components/ReactHookForm';
import * as Yup from 'yup';
export const scheduledWorkflowSchema = Yup?.object()?.shape({
  title: Yup.string().required('Required'),
  schedule: Yup?.string(),
  scheduleMonth: Yup?.date(),
  scheduleDay: Yup?.string(),
  scheduleDate: Yup?.date(),
  time: Yup?.date(),
  custom: Yup?.object(),
  type: Yup.string(),
  description: Yup.string(),
  runType: Yup.mixed().nullable().required('Required'),
  module: Yup.string().required('Required'),
  events: Yup.mixed().nullable().required('Required'),
  groups: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Required'),
      conditionType: Yup.mixed().nullable().required('Required'),
      groupCondition: Yup.string(),
      conditions: Yup.array().of(
        Yup.lazy((value) => {
          if (value.key === 'email') {
            return Yup.object().shape({
              key: Yup.string().required('Required'),
              condition: Yup.string().required('Required'),
              value: Yup.string()
                .email('Invalid email')
                .nullable()
                .required('Required'),
            });
          } else if (value.key === 'number') {
            return Yup.object().shape({
              key: Yup.string().required('Required'),
              condition: Yup.string().required('Required'),
              value: Yup.number().nullable().required('Required'),
            });
          } else {
            return Yup.object().shape({
              key: Yup.string().required('Required'),
              condition: Yup.string().required('Required'),
              value: Yup.mixed().nullable().required('Required'),
            });
          }
        }),
      ),
    }),
  ),
});

export const scheduledWorkflowValues: any = {
  title: '',
  type: 'EVENT_BASE',
  schedule: 'DAILY',
  scheduleMonth: new Date(),
  scheduleDay: 'Monday',
  scheduleDate: new Date(),
  time: new Date(),
  custom: {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  },
  description: '',
  events: null,
  runType: null,
  module: 'TICKETS',
  groupCondition: '',
  groups: [
    {
      name: '',
      conditionType: null,
      conditions: [{ key: '', condition: '', value: null }],
    },
    {
      name: '',
      conditionType: null,
      conditions: [{ key: '', condition: '', value: null }],
    },
  ],
};
export const scheduledWorkflowDataArray = [
  {
    componentProps: {
      name: 'title',
      label: 'Title',
      fullWidth: true,
      placeholder: 'Title',
      required: true,
    },

    component: RHFTextField,
    md: 6,
  },
  {
    componentProps: {
      name: 'description',
      label: 'Description',
      fullWidth: true,
      placeholder: 'Description....',
      style: { height: 150 },
    },
    component: RHFEditor,
    md: 12,
  },
];
