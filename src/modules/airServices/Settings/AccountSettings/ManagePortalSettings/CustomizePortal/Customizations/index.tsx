import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useState } from 'react';
import {
  IContentArrayItem,
  ICustomizationsDataItem,
  ICustomizationsProps,
} from '../CustomizePortal.interface';
import { LoadingButton } from '@mui/lab';

const Customizations = (props: ICustomizationsProps) => {
  const { reset, customizationsDataArray } = props;

  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>(
    customizationsDataArray.reduce(
      (acc, curr) => {
        acc[curr?._id] = true;
        return acc;
      },
      {} as { [key: number]: boolean },
    ),
  );

  const handleAccordionChange = (panel: number) => () => {
    setExpanded((prevState) => ({
      ...prevState,
      [panel]: !prevState[panel],
    }));
  };

  return (
    <>
      {customizationsDataArray.map((accordion: ICustomizationsDataItem) => (
        <Accordion
          key={accordion._id}
          expanded={expanded[accordion?._id]}
          onChange={handleAccordionChange(accordion?._id)}
          sx={{
            '& .MuiAccordionSummary-root': {
              color: 'custom.mulled_wine',
              fontWeight: 'bold',
              backgroundColor: 'transparent',
            },
            '& .MuiAccordionSummary-content': {
              alignItems: 'center',
            },
            mt: 1,
          }}
        >
          <AccordionSummary
            expandIcon={
              expanded[accordion?._id] ? (
                <RemoveCircleOutlineOutlinedIcon />
              ) : (
                <AddCircleOutlineOutlinedIcon />
              )
            }
          >
            {accordion?.title}
          </AccordionSummary>
          <AccordionDetails>
            {accordion?.contentArray?.map((content: IContentArrayItem) => (
              <Box key={content?.id}>
                <content.component {...content?.componentProps} />
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}

      <Box display={'flex'} justifyContent={'flex-end'} gap={2}>
        <LoadingButton
          onClick={() => reset()}
          variant={'outlined'}
          color={'secondary'}
        >
          Reset
        </LoadingButton>
        <LoadingButton type={'submit'} variant={'contained'}>
          Apply
        </LoadingButton>
      </Box>
    </>
  );
};

export default Customizations;
