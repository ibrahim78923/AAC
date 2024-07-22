import React from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { DragIndicator } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { CopyQuestionIcon, DeleteQuestionIcon } from '@/assets/icons';
import {
  RHFAutocomplete,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import { useQuestions } from './useQuestions';
import {
  AnimatedBox,
  questionTypeData,
  questionTypeOptions,
  surveyQuestionComponent,
  tooltipData,
} from './Questions.data';
import { StrictModeDroppable } from '@/components/DynamicFormModals/StrictModeDroppable';
import { LoadingButton } from '@mui/lab';
import { ImportQuestions } from './ImportQuestions';

export const Questions = (props: any) => {
  const {
    sectionIndex,
    isSection,
    methods,
    qusLoading,
    secLoading,
    unSaveSection,
    sectionVerification,
    sectionCondition,
  } = props;
  const {
    deleteQuestion,
    fields,
    copyQuestion,
    watch,
    questionIndex,
    setQuestionIndex,
    appendQuestion,
    appendSection,
    appendText,
    handleSaveQuestion,
    handleDragEnd,
    updateLoading,
    deleteLoading,
    deleteIndex,
    openImport,
    setOpenImport,
    handleImportOpen,
  } = useQuestions(props);
  return (
    <>
      <DragDropContext
        onDragStart={() => setQuestionIndex(null)}
        onDragEnd={handleDragEnd}
      >
        <StrictModeDroppable droppableId="droppable">
          {(provided: any) => (
            <Grid
              container
              {...provided?.droppableProps}
              ref={provided?.innerRef}
              justifyContent="space-between"
            >
              {fields?.map((field: any, index: number) => {
                const watchType = watch(
                  `sections.${sectionIndex}.questions.${index}.questionType`,
                );
                return (
                  <React.Fragment key={field?.id}>
                    <Draggable
                      key={field?.id}
                      draggableId={field?.id}
                      index={index}
                      isDragDisabled={sectionCondition}
                    >
                      {(provided: any) => (
                        <Grid
                          item
                          ref={provided?.innerRef}
                          {...provided?.draggableProps}
                          {...provided?.dragHandleProps}
                          xl={11.2}
                          lg={11}
                          md={10.5}
                          xs={12}
                          p={2}
                          pt={1}
                          borderRadius={2}
                          boxShadow={2}
                          m={0}
                          mt={2}
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                          onMouseEnter={() => {
                            setQuestionIndex(index);
                          }}
                        >
                          <Grid container spacing={2}>
                            <Grid item xs={12} textAlign="center">
                              <DragIndicator
                                sx={{
                                  color: 'grey.900',
                                  transform: 'rotate(90deg)',
                                }}
                              />
                            </Grid>
                            <Grid
                              item
                              md={
                                watchType?.value !== questionTypeData?.text
                                  ? 8
                                  : 12
                              }
                              xs={12}
                            >
                              <RHFTextField
                                name={`sections.${sectionIndex}.questions.${index}.questionTitle`}
                                label={
                                  watchType?.value !== questionTypeData?.text
                                    ? `${questionTypeData?.question} ${
                                        index + 1
                                      }`
                                    : `${questionTypeData?.title} ${index + 1}`
                                }
                                placeholder={
                                  watchType?.value !== questionTypeData?.text
                                    ? questionTypeData?.writeQuestion
                                    : questionTypeData?.writeTitle
                                }
                                size="small"
                                disabled={sectionCondition}
                                required
                              />
                            </Grid>
                            {watchType?.value !== questionTypeData?.text && (
                              <Grid item md={4} xs={12}>
                                <RHFAutocomplete
                                  name={`sections.${sectionIndex}.questions.${index}.questionType`}
                                  label={'\u00a0'}
                                  placeholder="Select"
                                  size="small"
                                  options={questionTypeOptions}
                                  disabled={sectionCondition}
                                  renderOption={(
                                    renderProps: any,
                                    option: any,
                                  ) => {
                                    return (
                                      <Box
                                        {...renderProps}
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                      >
                                        {option?.icon}
                                        {option?.label}
                                      </Box>
                                    );
                                  }}
                                  getOptionLabel={(option: any) =>
                                    option?.label
                                  }
                                />
                              </Grid>
                            )}
                            {watchType?.value !== questionTypeData?.text && (
                              <Grid item xs={12}>
                                {
                                  surveyQuestionComponent(
                                    sectionIndex,
                                    index,
                                    methods,
                                    watchType,
                                    sectionCondition,
                                  )[watchType?.value]
                                }
                              </Grid>
                            )}
                            {watchType?.value === questionTypeData?.text && (
                              <Grid item xs={12}>
                                <RHFTextField
                                  name={`sections.${sectionIndex}.questions.${index}.description`}
                                  label="Description"
                                  placeholder="Write Description"
                                  multiline
                                  minRows={3}
                                  size="small"
                                  disabled={sectionCondition}
                                />
                              </Grid>
                            )}
                          </Grid>
                          <Box
                            display="flex"
                            justifyContent="flex-end"
                            mt={{ sx: '', xs: 1 }}
                          >
                            <Box
                              display="flex"
                              gap={1}
                              alignItems="center"
                              justifyContent="center"
                              flexWrap="wrap"
                            >
                              {fields?.length === index + 1 && (
                                <>
                                  <LoadingButton
                                    variant="contained"
                                    loading={
                                      (qusLoading || secLoading) &&
                                      sectionIndex === unSaveSection?.index
                                    }
                                    disabled={
                                      sectionCondition ||
                                      deleteLoading ||
                                      sectionVerification
                                    }
                                    onClick={handleSaveQuestion}
                                    type="submit"
                                  >
                                    Save
                                  </LoadingButton>
                                  <Box
                                    sx={{
                                      width: '1px',
                                      height: 35,
                                      bgcolor: 'grey.0',
                                    }}
                                  />
                                </>
                              )}
                              {watchType?.value !== questionTypeData?.text && (
                                <>
                                  <RHFSwitch
                                    name={`sections.${sectionIndex}.questions.${index}.isRequired`}
                                    label="Required"
                                    disabled={
                                      sectionCondition ||
                                      qusLoading ||
                                      secLoading ||
                                      deleteLoading
                                    }
                                  />
                                  <Box
                                    sx={{
                                      width: '1px',
                                      height: 35,
                                      bgcolor: 'grey.0',
                                    }}
                                  />
                                </>
                              )}
                              {deleteLoading && deleteIndex === index ? (
                                <CircularProgress size="30px" />
                              ) : (
                                <IconButton
                                  disabled={
                                    qusLoading || secLoading || deleteLoading
                                  }
                                  onClick={() => deleteQuestion(index)}
                                  sx={{
                                    cursor:
                                      fields?.length > 1
                                        ? 'pointer'
                                        : 'no-drop',
                                  }}
                                >
                                  <DeleteQuestionIcon />
                                </IconButton>
                              )}
                              <Box
                                sx={{
                                  width: '1px',
                                  height: 35,
                                  bgcolor: 'grey.0',
                                }}
                              />
                              <IconButton
                                disabled={
                                  qusLoading || secLoading || deleteLoading
                                }
                                onClick={() => copyQuestion(index)}
                              >
                                <CopyQuestionIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        </Grid>
                      )}
                    </Draggable>
                    {sectionIndex === isSection && questionIndex === index && (
                      <Grid
                        item
                        xl={0.7}
                        lg={0.9}
                        md={1.4}
                        xs={12}
                        display="flex"
                        alignItems="center"
                        justifyContent={{ md: 'unset', xs: 'center' }}
                        mt={2}
                      >
                        <AnimatedBox
                          boxShadow={2}
                          borderRadius={2}
                          display="flex"
                          justifyContent="space-evenly"
                          alignItems="center"
                          flexDirection={{ md: 'column', xs: 'row' }}
                          p={{ sm: 2, xs: 1 }}
                          gap={{ sm: 2, xs: 1 }}
                        >
                          {tooltipData(
                            appendSection,
                            appendQuestion,
                            appendText,
                            handleImportOpen,
                          )?.map((item: any) => (
                            <Tooltip
                              key={item?.id}
                              title={item?.title}
                              arrow
                              placement="left"
                              slotProps={{
                                tooltip: { sx: { bgcolor: 'primary.main' } },
                                arrow: { sx: { color: 'primary.main' } },
                              }}
                            >
                              {updateLoading && item?.id === 4 ? (
                                <CircularProgress size="35px" />
                              ) : (
                                <IconButton onClick={item?.onClick}>
                                  {item?.icon}
                                </IconButton>
                              )}
                            </Tooltip>
                          ))}
                        </AnimatedBox>
                      </Grid>
                    )}
                    {openImport && (
                      <ImportQuestions
                        openImport={openImport}
                        setOpenImport={setOpenImport}
                        methods={methods}
                        sectionIndex={sectionIndex}
                      />
                    )}
                  </React.Fragment>
                );
              })}
              {provided?.placeholder}
            </Grid>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </>
  );
};
