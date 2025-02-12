import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import {
  IContentArrayItem,
  ICustomizationsDataItem,
  ICustomizationsProps,
} from '../CustomizePortal.interface';
import { customizePortalDefaultValues } from '../CustomizePortal.data';
import { useCustomizations } from './useCustomizations';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';

export const Customizations = (props: ICustomizationsProps) => {
  const {
    customizationsDataArray,
    expanded,
    handleAccordionChange,
    patchCustomerPortalStylingsStatus,
    theme,
    reset,
  } = useCustomizations(props);

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
      <ActionsLoadingButton
        submitButtonText="Apply"
        cancelButtonText="Reset"
        showSubmitLoader={patchCustomerPortalStylingsStatus?.isLoading}
        handleCancelButton={() =>
          reset(() => customizePortalDefaultValues?.(theme))
        }
      />
    </>
  );
};

export default Customizations;
