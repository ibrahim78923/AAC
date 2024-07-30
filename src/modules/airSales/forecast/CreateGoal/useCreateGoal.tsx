import { useRouter } from 'next/router';
import { useState } from 'react';
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
import { DATE_TIME_FORMAT, GOALS_YEARLY_FORMAT } from '@/constants';
import { useAppSelector } from '@/redux/store';
import dayjs from 'dayjs';
import { useGetDealPipeLineQuery } from '@/services/airSales/deals';
import { ARRAY_INDEX } from '@/constants/strings';
import { usePostGoalMutation } from '@/services/airSales/forecast';

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

  const { data: dealPipelineData } = useGetDealPipeLineQuery({ meta: false });
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

  // this is describe step
  const describeScratchMethods: any = useForm({
    resolver: yupResolver(goalDetailsValidationSchema),
    defaultValues: goalDetailsDefaultValues,
  });

  const { handleSubmit: describeScratchHandleSubmit } = describeScratchMethods;

  const onSubmitDescribeScratch = async (values: any) => {
    dispatch(setDescribeFormData(values));
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
            jan: monthlyData?.['q1-jan'] || '',
            feb: monthlyData?.['q1-jan'] || '',
            mar: monthlyData?.['q1-jan'] || '',
            apr: monthlyData?.['q2-apr'] || '',
            may: monthlyData?.['q2-apr'] || '',
            jun: monthlyData?.['q2-apr'] || '',
            jul: monthlyData?.['q3-jul'] || '',
            aug: monthlyData?.['q3-jul'] || '',
            sep: monthlyData?.['q3-jul'] || '',
            oct: monthlyData?.['q4-oct'] || '',
            nov: monthlyData?.['q4-oct'] || '',
            dec: monthlyData?.['q4-oct'] || '',
          };
        }

        if (teamDurationForm?.duration === GOALS_YEARLY_FORMAT?.YEARLY) {
          monthlyData = {
            jan: monthlyData?.['jan'] || '',
            feb: monthlyData?.['jan'] || '',
            mar: monthlyData?.['jan'] || '',
            apr: monthlyData?.['jan'] || '',
            may: monthlyData?.['jan'] || '',
            jun: monthlyData?.['jan'] || '',
            jul: monthlyData?.['jan'] || '',
            aug: monthlyData?.['jan'] || '',
            sep: monthlyData?.['jan'] || '',
            oct: monthlyData?.['jan'] || '',
            nov: monthlyData?.['jan'] || '',
            dec: monthlyData?.['jan'] || '',
          };
        }
        if (teamDurationForm?.duration === GOALS_YEARLY_FORMAT?.CUSTOM) {
          const startDate = dayjs(teamDurationForm?.from);
          const endDate = dayjs(teamDurationForm?.to);

          for (
            let currentDate = startDate;
            currentDate?.isBefore(endDate) || currentDate?.isSame(endDate);
            currentDate = currentDate?.add(1, 'month')
          ) {
            const monthName = currentDate
              ?.format(DATE_TIME_FORMAT?.MMM)
              ?.toLowerCase();
            const date = currentDate?.format(DATE_TIME_FORMAT?.DD);

            monthlyData[monthName] = inputValues[row?._id]?.[date] || '';
          }

          // Delete the first entry in the months object
          const firstKey = Object?.keys(monthlyData)[ARRAY_INDEX?.ZERO];
          if (firstKey) {
            delete monthlyData[firstKey];
          }
        }

        return {
          contributorId: row?._id,
          pipelines:
            selectedValues[index]?.map((pipeline: any) => pipeline?.id) || [], // Set selected pipeline
          unit: 'USD',
          year: dayjs()?.year(),
          months: monthlyData,
        };
      });
    };

    const transformedData = transformData();
    dispatch(setPerformanceData(transformedData));
    setActiveStep((prev: any) => prev + 1);
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
    const payload = {
      trackingMethod: describeForm?.trackingMethod,
      goalName: describeForm?.goalName,
      duration: teamDurationForm?.duration,
      ...(teamDurationForm?.userTeam === 'USER'
        ? {
            contributors: teamDurationForm?.collaborators?.map(
              (collaborator: any) => collaborator?._id,
            ),
          }
        : {
            teams: teamDurationForm?.collaborators?.map(
              (collaborator: any) => collaborator?._id,
            ),
          }),
      targets: performanceData,
      notification: selectedNotifications,
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
