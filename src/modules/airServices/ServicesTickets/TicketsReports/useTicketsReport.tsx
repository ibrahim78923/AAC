import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRouter } from 'next/router';
import { pxToRem } from '@/utils/getFontValue';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export const useTicketsReport = () => {
  const [calendarFilter, setCalendarFilter] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const agentFilterMethod = useForm();
  const { control } = agentFilterMethod;
  const watchForAgentFilter = useWatch({
    control,
    name: 'agent',
    defaultValue: null,
  });

  const handlePrint = async () => {
    setLoading(true);
    const content = document?.getElementById('main-content');

    if (content) {
      const textElements = content?.querySelectorAll(
        'h6, h5, th > div, .MuiChip-root > span',
      );
      textElements?.forEach((textElement: any) => {
        textElement!.style!.marginTop = pxToRem(-15);
        textElement!.style!.overflow = 'visible';
      });

      try {
        const canvas = await html2canvas(content, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
        });

        const imageDataURL = canvas?.toDataURL('image/png');

        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas?.width, canvas?.height],
        });
        pdf?.addImage(imageDataURL, 'PNG', 0, 0, canvas?.width, canvas?.height);
        pdf?.save('Tickets Report.pdf');
        successSnackbar('Report Downloaded Successfully!');
      } catch (error) {
        errorSnackbar();
      } finally {
        const textElements = content?.querySelectorAll(
          'h6, h5, th > div, .MuiChip-root > span',
        );
        textElements?.forEach((textElement: any) => {
          textElement!.style!.marginTop = '';
          textElement!.style!.overflow = '';
        });
        setLoading(false);
      }
    }
  };

  return {
    router,
    agentFilterMethod,
    setCalendarFilter,
    calendarFilter,
    watchForAgentFilter,
    handlePrint,
    loading,
  };
};
