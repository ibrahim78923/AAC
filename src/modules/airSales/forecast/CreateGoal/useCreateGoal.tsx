import { useRouter } from 'next/router';
import { useState } from 'react';
import Choose from './Choose';
import Describe from './Describe';
import TeamDuration from './TeamDuration';
import Performance from './Performance';
import GoalsSettings from './GoalsSettings';

export const useCreateGoal = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [createScratch, setCreateScratch] = useState(false);

  const router: any = useRouter();
  const hanldeGoBack = () => {
    router?.back();
  };

  const handleNextStep = () => {
    if (activeStep === 4) {
      router?.back();
    } else {
      setActiveStep((prev: any) => prev + 1);
    }
  };

  const handleStepBack = () => {
    setActiveStep((prev: any) => prev - 1);
  };
  const createGoalsSteps = [
    {
      key: 'Choose',
      label: 'Choose',
      component: (
        <Choose
          setCreateScratch={setCreateScratch}
          handleNextStep={handleNextStep}
        />
      ),
    },
    {
      key: 'describe',
      label: 'Describe',
      component: (
        <>
          {' '}
          <Describe createScratch={createScratch} />
        </>
      ),
    },
    {
      key: 'TeamDuration',
      label: 'Team & Duration',
      component: <TeamDuration />,
    },
    {
      key: 'performance',
      label: 'Performance',
      component: <Performance />,
    },
    {
      key: 'settings',
      label: 'Settings',
      component: <GoalsSettings />,
    },
  ];

  return {
    hanldeGoBack,
    createGoalsSteps,
    activeStep,
    handleNextStep,
    handleStepBack,
  };
};
