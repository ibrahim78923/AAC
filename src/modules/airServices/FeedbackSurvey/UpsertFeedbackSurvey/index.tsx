import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertFeedbackSurvey } from './useUpsertFeedbackSurvey';
import { CreateSurvey } from './CreateSurvey';
import { CreateFeedback } from './CreateFeedback';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { PreviewSurvey } from './PreviewSurvey';
import { feedbackTypes } from './UpsertFeedbackSurvey.data';

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
  } = useUpsertFeedbackSurvey();
  if (getLoading || getFetching) return <SkeletonForm />;
  return (
    <>
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
            <PreviewSurvey data={data} setCreateSurvey={setCreateSurvey} />
          )
        )}
      </FormProvider>
    </>
  );
};
