import React from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { DragIndicator } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, Tooltip } from '@mui/material';
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

export const Questions = (props: any) => {
  const { sectionIndex, isSection, methods, setSubmitIndex } = props;
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
  } = useQuestions(props);
  return (
    <>
      <DragDropContext
        onDragStart={() => setQuestionIndex(null)}
        onDragEnd={handleDragEnd}
      >
        <StrictModeDroppable droppableId="droppable">
          {(provided) => (
            <Grid
              container
              {...provided?.droppableProps}
              ref={provided?.innerRef}
              justifyContent="space-between"
            >
              {fields?.map((field: any, index: number) => {
                const watchType = watch(
                  `section.${sectionIndex}.questions.${index}.questionType`,
                );
                return (
                  <React.Fragment key={field?.id}>
                    <Draggable
                      key={field?.id}
                      draggableId={field?.id}
                      index={index}
                    >
                      {(provided) => (
                        <Grid
                          item
                          ref={provided?.innerRef}
                          {...provided?.draggableProps}
                          {...provided?.dragHandleProps}
                          xs={11.4}
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
                            <Grid item xs={watchType ? 8 : 12}>
                              <RHFTextField
                                name={`section.${sectionIndex}.questions.${index}.questionTitle`}
                                label={
                                  watchType
                                    ? `${questionTypeData?.question} ${
                                        index + 1
                                      }`
                                    : `${questionTypeData?.title} ${index + 1}`
                                }
                                placeholder={
                                  watchType
                                    ? questionTypeData?.writeQuestion
                                    : questionTypeData?.writeTitle
                                }
                                size="small"
                              />
                            </Grid>
                            {watchType && (
                              <Grid item xs={4}>
                                <RHFAutocomplete
                                  name={`section.${sectionIndex}.questions.${index}.questionType`}
                                  label={'\u00a0'}
                                  placeholder="Select"
                                  size="small"
                                  options={questionTypeOptions}
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
                            {watchType && (
                              <Grid item xs={12}>
                                {
                                  surveyQuestionComponent(
                                    sectionIndex,
                                    index,
                                    methods,
                                    watchType,
                                  )[watchType?.value]
                                }
                              </Grid>
                            )}
                            {!watchType && (
                              <Grid item xs={12}>
                                <RHFTextField
                                  name={`section.${sectionIndex}.questions.${index}.description`}
                                  label="Description"
                                  placeholder="Write Description"
                                  multiline
                                  minRows={3}
                                  size="small"
                                />
                              </Grid>
                            )}
                          </Grid>
                          <Box display="flex" justifyContent="flex-end">
                            <Box display="flex" gap={1} alignItems="center">
                              {fields?.length === index + 1 && (
                                <>
                                  <Button
                                    variant="contained"
                                    onClick={() => {
                                      handleSaveQuestion();
                                      setSubmitIndex(sectionIndex);
                                    }}
                                    type="submit"
                                  >
                                    Save
                                  </Button>
                                  <Box
                                    sx={{
                                      width: '1px',
                                      height: 35,
                                      bgcolor: 'grey.0',
                                    }}
                                  />
                                </>
                              )}
                              {watchType && (
                                <>
                                  <RHFSwitch
                                    name={`section.${sectionIndex}.questions.${index}.isRequired`}
                                    label="Required"
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
                              <IconButton
                                onClick={() => deleteQuestion(index)}
                                sx={{
                                  cursor:
                                    fields?.length > 1 ? 'pointer' : 'no-drop',
                                }}
                              >
                                <DeleteQuestionIcon />
                              </IconButton>
                              <Box
                                sx={{
                                  width: '1px',
                                  height: 35,
                                  bgcolor: 'grey.0',
                                }}
                              />
                              <IconButton onClick={() => copyQuestion(index)}>
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
                        xs={0.5}
                        display="flex"
                        alignItems="center"
                        mt={2}
                      >
                        <AnimatedBox
                          boxShadow={2}
                          borderRadius={2}
                          display="flex"
                          justifyContent="space-evenly"
                          alignItems="center"
                          flexDirection="column"
                          p={2}
                          gap={2}
                        >
                          {tooltipData(
                            appendSection,
                            appendQuestion,
                            appendText,
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
                              <IconButton onClick={item?.onClick}>
                                {item?.icon}
                              </IconButton>
                            </Tooltip>
                          ))}
                        </AnimatedBox>
                      </Grid>
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
