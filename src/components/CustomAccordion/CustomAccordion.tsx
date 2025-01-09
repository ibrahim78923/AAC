import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { pxToRem } from '@/utils/getFontValue';
import { ArrowDropDown } from '@mui/icons-material';
import { ACCORDION_VARIANTS } from '@/constants/mui-constant';

export const CustomAccordion = (props: any) => {
  const {
    accordionSummary,
    children,
    summaryTitle,
    variantType = ACCORDION_VARIANTS?.SECONDARY,
    customStyles = {},
    summaryRootStyles = {},
    summaryContentStyles = {},
    disableGutters = true,
  } = props;

  const styles: any = {
    [ACCORDION_VARIANTS?.SECONDARY]: {
      summary: {
        backgroundColor: 'blue.main',
        color: 'common.white',
        borderRadius: pxToRem(8),
      },
      root: {
        mt: 1,
      },
    },
    [ACCORDION_VARIANTS?.INHERIT]: {
      summary: {
        backgroundColor: 'inherit',
        color: 'inherit',
      },
    },
  };

  const accordionVariantStyles = styles?.[variantType];

  return (
    <Accordion
      disableGutters={disableGutters}
      sx={{
        '& .MuiAccordionSummary-root': {
          ...accordionVariantStyles?.summary,
          ...summaryRootStyles,
        },
        '& .MuiAccordionSummary-content': {
          alignItems: 'center',
          ...summaryContentStyles,
        },
        ...accordionVariantStyles?.root,
        ...customStyles,
      }}
    >
      <AccordionSummary
        expandIcon={<ArrowDropDown fontSize="large" />}
        aria-controls={`${summaryTitle}-content`}
        id={`${summaryTitle}-header`}
      >
        <Box>{accordionSummary}</Box>
        {summaryTitle && <Typography>{summaryTitle}</Typography>}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
