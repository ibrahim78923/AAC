import { useTheme } from '@mui/material';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRouter } from 'next/router';

export const useTicketsReport = () => {
  const [calendarFilter, setCalendarFilter] = useState();
  const theme = useTheme();
  const router = useRouter();
  const agentFilterMethod = useForm();
  const { control } = agentFilterMethod;
  const watchForAgentFilter = useWatch({
    control,
    name: 'agent',
    defaultValue: null,
  });
  const handlePrint = async () => {
    const element = document.getElementById('main-content');
    if (!element) return;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('Tickets Report.pdf');
  };

  return {
    theme,
    router,
    agentFilterMethod,
    setCalendarFilter,
    calendarFilter,
    watchForAgentFilter,
    handlePrint,
  };
};
