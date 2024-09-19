import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Describe from './Describe';
import TeamDuration from './TeamDuration';
import Performance from './Performance';
import GoalsSettings from './GoalsSettings';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  goalDetailsDefaultValues,
  goalDetailsValidationSchema,
} from './Describe/Describe.data';
import { useDispatch } from 'react-redux';
import {
  setDescribeFormData,
  setPerformanceData,
  setTeamDurationFormData,
} from '@/redux/slices/forecast/forecastSlice';
import {
  teamDurationDefaultValues,
  teamDurationValidationSchema,
} from './TeamDuration/TeamDuration.data';
import { enqueueSnackbar } from 'notistack';
import { DATE_FORMAT, GOALS_YEARLY_FORMAT, RADIO_VALUE } from '@/constants';
import { useAppSelector } from '@/redux/store';
import dayjs from 'dayjs';
import { useGetDealPipeLineQuery } from '@/services/airSales/deals';
import { ARRAY_INDEX } from '@/constants/strings';
import { usePostGoalMutation } from '@/services/airSales/forecast';
import { isNullOrEmpty } from '@/utils';
import { useLazyGetDynamicFieldsQuery } from '@/services/dynamic-fields';
import {
  DYNAMIC_FIELDS,
  DYNAMIC_FORM_FIELDS_TYPES,
} from '@/utils/dynamic-forms';
import { filteredEmptyValues } from '@/utils/api';

export const useCreateGoal = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [tableRowValues, setTableRowValues] = useState([]);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const dispatch = useDispatch();

  const router: any = useRouter();
  const hanldeGoBack = () => {
    router?.back();
  };

  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (contributorId: any, month: any, value: any) => {
    // Convert the input value to a number
    const numericValue = parseFloat(value);

    setInputValues((prev) => ({
      ...prev,
      [contributorId]: {
        ...prev[contributorId],
        [month]: isNaN(numericValue) ? 0 : numericValue,
      },
    }));
  };

  const { data: dealPipelineData } = useGetDealPipeLineQuery(
    { meta: false },
    { skip: activeStep < 2 },
  );
  const [selectedValues, setSelectedValues] = useState({});

  const processData = (data: any) => {
    return data?.map((item: any) => ({
      id: item?._id,
      name: item?.name,
    }));
  };

  // Assuming 'apiResponse' is the data you get from the API
  const processedData = processData(dealPipelineData?.data);

  const handleChange = (rowId: any) => (event: any) => {
    const {
      target: { value },
    } = event;

    const selectedStagesArray =
      typeof value === 'string' ? value?.split(',') : value;

    const stagesForRow = processedData?.filter(
      (stage: any) => selectedStagesArray?.includes(stage?.id),
    );

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [rowId]: stagesForRow,
    }));
  };

  const teamDurationForm: any = useAppSelector(
    (state) => state?.forecastForm?.teamDurationForm,
  );

  const [form, setForm] = useState<any>([]);

  const [getDynamicFieldsTrigger, getDynamicFieldsStatus] =
    useLazyGetDynamicFieldsQuery();

  const getDynamicFormData = async () => {
    const params = {
      productType: DYNAMIC_FIELDS?.PT_SALES,
      moduleType: DYNAMIC_FIELDS?.MT_GOAL,
    };
    const getDynamicFieldsParameters = { params };

    try {
      const res: any = await getDynamicFieldsTrigger(
        getDynamicFieldsParameters,
      )?.unwrap();
      setForm(res);
    } catch (error: any) {
      setForm([]);
    }
  };

  useEffect(() => {
    getDynamicFormData();
  }, []);

  // this is describe step
  const describeScratchMethods: any = useForm({
    resolver: yupResolver(goalDetailsValidationSchema?.(form)),
    defaultValues: goalDetailsDefaultValues?.(),
  });

  const { handleSubmit: describeScratchHandleSubmit } = describeScratchMethods;

  const onSubmitDescribeScratch = async (values: any) => {
    const filteredEmptyData = filteredEmptyValues(values);

    const customFields: any = {};
    const body: any = {};

    const customFieldKeys = new Set(
      form?.map((field: any) => field?.componentProps?.label),
    );

    Object?.entries(filteredEmptyData)?.forEach(([key, value]) => {
      if (customFieldKeys?.has(key)) {
        if (value instanceof Date) {
          value = value?.toISOString();
        }
        if (
          typeof value === DYNAMIC_FORM_FIELDS_TYPES?.OBJECT &&
          !Array?.isArray(value) &&
          value !== null
        ) {
          customFields[key] = { ...customFields[key], ...value };
        } else {
          customFields[key] = value;
        }
      } else {
        body[key] = value;
      }
    });

    if (Object?.keys(customFields)?.length > 0) {
      body.customFields = customFields;
    }

    dispatch(setDescribeFormData(body));
    setActiveStep((prev: any) => prev + 1);
  };

  const handleDescribeForm = describeScratchHandleSubmit(
    onSubmitDescribeScratch,
  );
  // this is describe step

  // this is team & duration step
  const teamDurationMethods: any = useForm({
    resolver: yupResolver(teamDurationValidationSchema),
    defaultValues: teamDurationDefaultValues,
  });

  const { handleSubmit: teamDurationHandleSubmit, watch: watchRadioValue } =
    teamDurationMethods;
  const onSubmitTeamDuration = async (values: any) => {
    if (values?.duration === GOALS_YEARLY_FORMAT?.CUSTOM) {
      if (values?.to === undefined || values?.from === undefined) {
        enqueueSnackbar('Please enter date', { variant: 'error' });
        return;
      }
    }
    dispatch(setTeamDurationFormData(values));
    setActiveStep((prev: any) => prev + 1);
  };
  const userTeamValue = watchRadioValue('userTeam');
  const customDateValue = watchRadioValue('duration');

  const handleTeamDurationForm = teamDurationHandleSubmit(onSubmitTeamDuration);
  // this is team & duration step

  // this is performance step
  const handlePerformanceSubmit = () => {
    const transformData = () => {
      return teamDurationForm?.collaborators?.map((row: any, index: any) => {
        let monthlyData: any = inputValues[row?._id] || {};

        if (teamDurationForm?.duration === GOALS_YEARLY_FORMAT?.QUARTERLY) {
          monthlyData = {
            Q1: monthlyData?.['q1-jan'] || '',
            Q2: monthlyData?.['q2-apr'] || '',
            Q3: monthlyData?.['q3-jul'] || '',
            Q4: monthlyData?.['q4-oct'] || '',
          };
        }

        if (teamDurationForm?.duration === GOALS_YEARLY_FORMAT?.YEARLY) {
          monthlyData = {
            Yearly: monthlyData?.['jan'] || '',
          };
        }
        if (teamDurationForm?.duration === GOALS_YEARLY_FORMAT?.CUSTOM) {
          const firstMonthValue =
            Object?.values(monthlyData)[ARRAY_INDEX?.ZERO];

          monthlyData = {
            custom: firstMonthValue,
          };
        }

        return {
          collaboratorId: row?._id,
          pipelines:
            selectedValues[index]?.map((pipeline: any) => pipeline?.id) || [], // Set selected pipeline
          targets: monthlyData,
        };
      });
    };

    const transformedData = transformData();
    let validationPassed = true;

    transformedData?.forEach((item: any) => {
      if (!item?.pipelines || isNullOrEmpty(item?.pipelines)) {
        enqueueSnackbar('Please select Pipelines', {
          variant: 'error',
        });
        validationPassed = false;
      } else if (
        teamDurationForm?.duration === GOALS_YEARLY_FORMAT?.CUSTOM &&
        Object?.keys(item?.targets)?.length === 0
      ) {
        enqueueSnackbar('Please enter target values in Months ', {
          variant: 'error',
        });
        validationPassed = false;
      }
      // else if (
      //   teamDurationForm?.duration !== GOALS_YEARLY_FORMAT?.CUSTOM &&
      //   Object?.keys(item?.targets)?.length !== 12
      // ) {
      //   enqueueSnackbar('Please enter target values in Months ', {
      //     variant: 'error',
      //   });
      //   validationPassed = false;
      // }
      else {
        for (const [, value] of Object.entries(item.targets)) {
          if (typeof value !== 'number' || isNaN(value) || value === '') {
            enqueueSnackbar('please enter all values.', {
              variant: 'error',
            });
            validationPassed = false;
            break; // Exit loop as error found
          }
        }
      }
    });

    if (validationPassed) {
      dispatch(setPerformanceData(transformedData));
      setActiveStep((prev: any) => prev + 1);
    }
  };
  // this is performance step

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event?.target;
    if (checked) {
      setSelectedNotifications((prev: any) => [...prev, name]);
    } else {
      setSelectedNotifications((prev) =>
        prev.filter((notification) => notification !== name),
      );
    }
  };

  const performanceData: any = useAppSelector(
    (state) => state?.forecastForm?.performanceData,
  );

  const describeForm: any = useAppSelector(
    (state) => state?.forecastForm?.describeForm,
  );

  const [postCreateInvoice, { isLoading }] = usePostGoalMutation();

  // this is final step
  const handleFinalSubmit = async () => {
    const startDate = teamDurationForm?.from
      ? dayjs(teamDurationForm?.from)?.format(DATE_FORMAT.API)
      : dayjs()?.format(DATE_FORMAT?.API);

    const endDate = teamDurationForm?.to
      ? dayjs(teamDurationForm?.to).format(DATE_FORMAT?.API)
      : dayjs()
          ?.add(1, 'year')
          ?.format(DATE_FORMAT?.API);

    if (isNullOrEmpty(selectedNotifications)) {
      enqueueSnackbar('Please select a notification', {
        variant: 'error',
      });
    } else {
      const payload = {
        trackingMethod: describeForm?.trackingMethod,
        goalName: describeForm?.goalName,
        calculationType: describeForm?.calculatetats,
        customFields: describeForm?.customFields,
        duration: teamDurationForm?.duration,
        collaborators: performanceData,
        notification: selectedNotifications,
        isTeam: teamDurationForm?.userTeam === RADIO_VALUE?.USER ? false : true,
        startDate: startDate,
        endDate: endDate,
        unit: 'USD',
        year: dayjs()?.year().toString(),
      };

      try {
        await postCreateInvoice({ body: payload })?.unwrap();
        enqueueSnackbar('Goals added successfully', {
          variant: 'success',
        });
        router?.back();
      } catch (error: any) {
        enqueueSnackbar('An error occured', {
          variant: 'error',
        });
      }
    }
  };

  // this is final step
  const handleNextStep = () => {
    if (activeStep === 0) {
      handleDescribeForm();
    } else if (activeStep === 1) {
      handleTeamDurationForm();
    } else if (activeStep === 2) {
      handlePerformanceSubmit();
    } else {
      handleFinalSubmit();
    }
  };

  const handleStepBack = () => {
    if (activeStep === 0) {
      router?.back();
    } else {
      setActiveStep((prev: any) => prev - 1);
    }
  };
  const createGoalsSteps = [
    {
      key: 'describe',
      label: 'Describe',
      component: (
        <>
          {' '}
          <Describe
            methods={describeScratchMethods}
            handleSubmit={handleDescribeForm}
            form={form}
            getDynamicFieldsStatus={getDynamicFieldsStatus}
          />
        </>
      ),
    },
    {
      key: 'TeamDuration',
      label: 'Team & Duration',
      component: (
        <TeamDuration
          methods={teamDurationMethods}
          handleSubmit={handleTeamDurationForm}
          userTeamValue={userTeamValue}
          customDateValue={customDateValue}
        />
      ),
    },
    {
      key: 'performance',
      label: 'Performance',
      component: (
        <Performance
          tableRowValues={tableRowValues}
          setTableRowValues={setTableRowValues}
          handleInputChange={handleInputChange}
          inputValues={inputValues}
          processedData={processedData}
          selectedValues={selectedValues}
          handleChange={handleChange}
          setInputValues={setInputValues}
        />
      ),
    },
    {
      key: 'settings',
      label: 'Settings',
      component: (
        <GoalsSettings
          selectedNotifications={selectedNotifications}
          handleCheckboxChange={handleCheckboxChange}
        />
      ),
    },
  ];

  return {
    hanldeGoBack,
    createGoalsSteps,
    activeStep,
    handleNextStep,
    handleStepBack,
    isLoading,
  };
};
