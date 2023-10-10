import {
  Accordion,
  Switch,
  Box,
  useTheme,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';

import AccordianInterfaceI from './Accordian.interface';

import { v4 as uuidv4 } from 'uuid';

const CommonAccordian = (props: AccordianInterfaceI) => {
  const { className, data, handleSwitch, checked } = props;

  const theme = useTheme();
  return (
    <>
      {data?.map((item: any) => (
        <Accordion className={className} sx={{ my: 2 }} key={uuidv4()}>
          <AccordionSummary
            expandIcon={item?.endIcon}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ background: theme?.palette?.blue?.main, borderRadius: '8px' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: theme?.palette?.common?.white,
              }}
            >
              {item?.hasSwitch && (
                <Switch checked={checked} onChange={handleSwitch} />
              )}
              <Typography>{item?.title}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>{item.content}</AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default CommonAccordian;
