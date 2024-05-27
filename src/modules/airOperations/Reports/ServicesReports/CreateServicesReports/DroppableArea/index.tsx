import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import { DroppableModule as Droppable } from '../../DroppableModule';
import { ReportsIcon } from '@/assets/icons';
import { Chart } from '../../DraggableFormFields/Chart';
import { InteractiveFilter } from '../../DraggableFormFields/InteractiveFilter';
import { Text } from '../../DraggableFormFields/Text';
import { Table } from '../../DraggableFormFields/Table';

export default function DroppableArea(props: any) {
  const {
    fontSize,
    color,
    setText,
    bold,
    italic,
    underline,
    textAlign,
    alignItem,
    formattedText,
    fieldData,
    modal,
  } = props;
  const theme: any = useTheme();

  return (
    <Droppable droppableId={'droppable'}>
      {(provided: any) => (
        <Box
          bgcolor={'secondary.50'}
          borderRadius={2}
          p={2}
          width={'100%'}
          minHeight={'61vh'}
          ref={provided?.innerRef}
          {...provided?.droppableProps}
        >
          {!!!fieldData ? (
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
            >
              <ReportsIcon />
              <Typography variant={'h6'} mt={1} component={'span'}>
                Drag or Drop Widgets here to create your report!
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                m={2}
                width={'50%'}
              >
                <Divider
                  sx={{
                    flexGrow: 1,
                    border: `.1rem solid ${theme?.palette?.grey[400]}`,
                  }}
                />
                <Typography variant="h4" sx={{ mx: 2 }}>
                  or
                </Typography>
                <Divider
                  sx={{
                    flexGrow: 1,
                    border: `.1rem solid ${theme?.palette?.grey[400]}`,
                  }}
                />
              </Box>
              <Box>
                <Button variant="contained">Chose Template</Button>
              </Box>
            </Box>
          ) : (
            <>
              {modal?.chart && <Chart />}
              {modal?.interactiveFilter && <InteractiveFilter />}
              {modal?.text && (
                <Text
                  fontSize={fontSize}
                  color={color}
                  setText={setText}
                  bold={bold}
                  italic={italic}
                  underline={underline}
                  textAlign={textAlign}
                  alignItem={alignItem}
                  formattedText={formattedText}
                />
              )}
              {modal?.table && <Table />}
            </>
          )}
        </Box>
      )}
    </Droppable>
  );
}
