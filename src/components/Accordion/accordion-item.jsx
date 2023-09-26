import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React from 'react'
import { ArrowUp, ArrowDown } from '@/assets/icons';

export const AccordionItem = ({ title, children }) => {
    const [expanded, setExpanded] = React.useState(false);
    return (
        <>
            <Accordion elevation={0} sx={{
                // "&:before":{display:'none'},
                // mb: '12px',
                borderRadius: '4px !important',
                bgcolor: '#35456D'
            }} expanded={expanded} onChange={() => setExpanded(!expanded)}>
                <AccordionSummary sx={{
                    flexDirection: 'row', '& .MuiAccordionSummary-content': {
                        margin: '16px 16px !important',
                    },
                    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                        transform: 'rotate(0deg)',
                    },
                }} expandIcon={expanded ? <ArrowUp /> : <ArrowDown />} aria-controls="panel1d-content" id="panel1d-header">
                    <div className={`blackish-color sub-heading ${expanded ? "font-weight-500" : ''}`}>{title}</div>
                </AccordionSummary>
                <AccordionDetails sx={{bgcolor: '#333'}}>
                    <div>
                        {children}
                    </div>
                </AccordionDetails>
            </Accordion>
        </>
    )
}
