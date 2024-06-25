import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertFeedbackSurvey } from './useUpsertFeedbackSurvey';
import { CreateSurvey } from './CreateSurvey';
import { CreateFeedback } from './CreateFeedback';

export const UpsertFeedbackSurvey = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    createSurvey,
    setCreateSurvey,
    setSubmitIndex,
    createLoading,
    updateLoading,
  } = useUpsertFeedbackSurvey();
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {!createSurvey ? (
          <CreateSurvey
            isLoading={createLoading || updateLoading}
            methods={methods}
          />
        ) : (
          <CreateFeedback
            setCreateSurvey={setCreateSurvey}
            methods={methods}
            setSubmitIndex={setSubmitIndex}
          />
        )}
      </FormProvider>
    </>
  );
};
