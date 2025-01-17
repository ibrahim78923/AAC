import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertFeedbackSurvey } from './useUpsertFeedbackSurvey';
import { CreateSurvey } from './CreateSurvey';
import { CreateFeedback } from './CreateFeedback';
import { PreviewSurvey } from './PreviewSurvey';
import { feedbackTypes } from './UpsertFeedbackSurvey.data';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

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
    getLoading,
    getFetching,
    qusLoading,
    setSubmitType,
    sectionVerification,
    unSaveSection,
    data,
    getError,
    refetch,
  } = useUpsertFeedbackSurvey();
  return (
    <ApiRequestFlow
      showSkeleton={getLoading || getFetching}
      hasError={getError}
      refreshApi={refetch}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {createSurvey === feedbackTypes?.survey ? (
          <CreateSurvey
            isLoading={createLoading || updateLoading}
            methods={methods}
            setSubmitType={setSubmitType}
          />
        ) : createSurvey === feedbackTypes?.feedback ? (
          <CreateFeedback
            setCreateSurvey={setCreateSurvey}
            methods={methods}
            setSubmitIndex={setSubmitIndex}
            qusLoading={qusLoading}
            secLoading={updateLoading}
            setSubmitType={setSubmitType}
            sectionVerification={sectionVerification}
            unSaveSection={unSaveSection}
          />
        ) : (
          createSurvey === feedbackTypes?.preview && (
            <PreviewSurvey
              data={data?.data?.sections}
              setCreateSurvey={setCreateSurvey}
            />
          )
        )}
      </FormProvider>
    </ApiRequestFlow>
  );
};
