import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  useTheme,
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
import { customizePortalDefaultValues } from '../CustomizePortal.data';

const Customizations = (props: ICustomizationsProps) => {
  const { reset, customizationsDataArray, patchCustomerPortalStylingsStatus } =
    props;

  const theme = useTheme();

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
                <content.component
                  {...content?.componentProps}
                  disabled={patchCustomerPortalStylingsStatus?.isLoading}
                />
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}

      <Box display={'flex'} justifyContent={'flex-end'} gap={2}>
        <LoadingButton
          onClick={() => reset(() => customizePortalDefaultValues?.(theme))}
          variant={'outlined'}
          color={'secondary'}
          disabled={patchCustomerPortalStylingsStatus?.isLoading}
        >
          Reset
        </LoadingButton>
        <LoadingButton
          type={'submit'}
          variant={'contained'}
          loading={patchCustomerPortalStylingsStatus?.isLoading}
        >
          Apply
        </LoadingButton>
      </Box>
    </>
  );
};

export default Customizations;
