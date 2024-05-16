import { useRouter } from 'next/router';
import { CardsData } from './InventoryReports.data';
import { useForm } from 'react-hook-form';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { pxToRem } from '@/utils/getFontValue';
import { useState } from 'react';

export default function useInventoryReports() {
  const router: any = useRouter();
  const cardsData = CardsData();
  const [loading, setLoading] = useState<boolean>(false);

  const methods: any = useForm({
    defaultValues: { assets: '' },
  });

  const { handleSubmit } = methods;

  const onFilterSubmit = () => {};

  const handleDownload = async () => {
    setLoading(true);
    const content = document?.getElementById('inventory-reports');

    if (content) {
      const textElements = content?.querySelectorAll(
        'h6, h5, th > div, .MuiChip-root > span',
      );
      textElements?.forEach((textElement: any) => {
        textElement!.style!.marginTop = pxToRem(-15);
        textElement!.style!.overflow = 'visible';
      });

      const inputElement = content?.querySelectorAll(
        'input, .MuiAutocomplete-input',
      );
      inputElement?.forEach((textElement: any) => {
        textElement!.style!.marginTop = pxToRem(-15);
        textElement!.style!.overflow = 'visible';
        textElement!.style!.height = pxToRem(25);
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
        pdf?.save('Inventory Report.pdf');
        successSnackbar('Report Downloaded Successfully!');
      } catch (error) {
        errorSnackbar();
      } finally {
        const textElements = content?.querySelectorAll(
          'h6, h5, th > div, .MuiChip-root > span, input, .MuiAutocomplete-input',
        );
        textElements?.forEach((textElement: any) => {
          textElement!.style!.marginTop = '';
          textElement!.style!.overflow = '';
          textElement!.style!.height = '';
        });
        setLoading(false);
      }
    }
  };

  return {
    router,
    handleDownload,
    loading,
    cardsData,
    methods,
    handleSubmit,
    onFilterSubmit,
  };
}
