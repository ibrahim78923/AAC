import { useForm } from 'react-hook-form';
import TimeSlotsHeader from './TimeSlotsHeader';
import TimeSlotsWeekly from './TimeSlotsWeekly';
import { FormProvider } from '@/components/ReactHookForm';

export const TimeSlotPreferences = () => {
  const methods = useForm({});
  return (
    <>
      <FormProvider methods={methods}>
        <TimeSlotsHeader />
        <TimeSlotsWeekly />
      </FormProvider>
    </>
  );
};
