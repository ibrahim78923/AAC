import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import {
  AddPlusPrimaryIcon,
  WhiteMessageIcon,
  WhiteTrashIcon,
} from '@/assets/icons';
import { useToDoList } from './useToDoList';
import { FormProvider } from '@/components/ReactHookForm';
import { toDoListFormFieldsDynamic } from './ToDoList.data';

export const ToDoList = () => {
  const theme = useTheme();
  const { newTodoItem, setNewTodoItem, methods } = useToDoList();
  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.grey[700]}`,
          borderRadius: '8px',
          padding: '20px',
          marginTop: '60px',
          height: 370,
          overflow: 'auto',
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>
          To-Do
        </Typography>
        {newTodoItem ? (
          <Box
            sx={{
              border: `1px solid ${theme?.palette?.grey[700]}`,
              borderRadius: 2,
              padding: 2,
              marginTop: 2,
            }}
          >
            <Typography variant="h5" color="grey.800">
              New Todo Item
            </Typography>
            <Box mt={1}>
              <FormProvider methods={methods}>
                <Grid container spacing={1}>
                  {toDoListFormFieldsDynamic?.map((item: any) => (
                    <Grid item xs={12} key={item?.id}>
                      <item.component
                        {...item?.componentProps}
                        size={'small'}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Box display={'flex'} justifyContent={'flex-end'} mt={2}>
                  <Button
                    sx={{ marginRight: '10px', width: 100, height: 40 }}
                    variant={'outlined'}
                    color="secondary"
                    onClick={() => setNewTodoItem(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={'contained'}
                    sx={{ width: 100, height: 40 }}
                    type="submit"
                    disableElevation
                  >
                    Add
                  </Button>
                </Box>
              </FormProvider>
            </Box>
          </Box>
        ) : (
          <Button
            sx={{
              border: `1px solid ${theme?.palette?.grey[700]}`,
              height: '70px',
              width: '100%',
            }}
            startIcon={<AddPlusPrimaryIcon />}
            onClick={() => setNewTodoItem(true)}
          >
            {' '}
            New to do item{' '}
          </Button>
        )}

        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={'12px'}
          sx={{
            backgroundColor: theme?.palette?.primary?.main,
            marginTop: '20px',
            padding: '15px',
            borderRadius: '8px',
            color: 'white',
          }}
        >
          <Box>
            <WhiteMessageIcon />
          </Box>
          <Box>
            <Typography variant="body2">Meeting with CEO</Typography>
            <Typography variant="body3">
              Presentation about the Air Applecart projects
            </Typography>
          </Box>
          <Box display={'grid'} gap={'15px'}>
            <Typography variant="body3">1 day</Typography>
            <WhiteTrashIcon />
          </Box>
        </Box>

        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={'12px'}
          sx={{
            backgroundColor: theme?.palette?.warning?.main,
            marginTop: '20px',
            padding: '15px',
            borderRadius: '8px',
            color: 'white',
          }}
        >
          <Box>
            <WhiteMessageIcon />
          </Box>
          <Box>
            <Typography variant="body2">Lunch</Typography>
            <Typography variant="body3">
              Lunch with stakeholders at Glascow at 01:30 PM
            </Typography>
          </Box>
          <Box display={'grid'} gap={'15px'}>
            <Typography variant="body3">1 day</Typography>
            <WhiteTrashIcon />
          </Box>
        </Box>
      </Box>
    </>
  );
};
