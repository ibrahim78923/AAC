import { Box, Button, IconButton, Typography } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '@/components/DynamicFormModals/StrictModeDroppable';
import { useForm } from 'react-hook-form';
import React, { createElement } from 'react';
import { componentMap } from '@/utils/dynamic-forms';
import { FormProvider } from '@/components/ReactHookForm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function DroppableArea({ form, setForm, handleEdit }: any) {
  const methods: any = useForm({});

  const handleFormCreation = () => {
    localStorage?.setItem('form', JSON?.stringify(form));
  };

  const handleDelete = (id: any) => {
    setForm(
      (prevForm: any) => prevForm?.filter((item: any) => item?.id !== id),
    );
  };

  return (
    <Droppable droppableId={'droppable'}>
      {(provided) => (
        <Box
          bgcolor={'secondary.50'}
          borderRadius={2}
          p={2}
          width={'100%'}
          ref={provided?.innerRef}
          {...provided?.droppableProps}
        >
          {!!!form?.length ? (
            <Typography
              variant={'h3'}
              color={'primary.main'}
              textAlign={'center'}
            >
              Start Building Form
            </Typography>
          ) : (
            form?.map((item: any, index: number) => (
              <Draggable key={item?.id} draggableId={item?.id} index={index}>
                {(provided) => (
                  <Box
                    ref={provided?.innerRef}
                    {...provided?.draggableProps}
                    {...provided?.dragHandleProps}
                    my={1}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <FormProvider methods={methods} style={{ width: '100%' }}>
                      {componentMap[item?.component] &&
                        createElement(
                          componentMap[item?.component],
                          {
                            ...item?.componentProps,
                            size: 'small',
                          },
                          item?.heading,
                        )}
                    </FormProvider>
                    <Box display={'flex'} alignItems={'center'} mt={1}>
                      <IconButton
                        sx={{ color: 'primary.main' }}
                        onClick={() => handleEdit(item?.id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: 'error.lighter' }}
                        onClick={() => handleDelete(item?.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </Draggable>
            ))
          )}
          {provided?.placeholder}

          {!!form?.length && (
            <Button variant={'contained'} onClick={handleFormCreation}>
              Create
            </Button>
          )}
        </Box>
      )}
    </Droppable>
  );
}
