import { documentContained } from '@/assets/images';
import { useRouter } from 'next/router';

export const productListCards = () => {
  const router = useRouter();

  return [
    {
      icon: documentContained,
      heading: 'Air Sales',
      content:
        'The Air Sales  provides a comprehensive solution for sales . . . ',
      isActive: true,
      navigateHandler: () =>
        router.push('/super-admin/settings/product-list/module-creation'),
    },
    {
      icon: documentContained,
      heading: 'Air Marketer',
      content: 'The Air Marketer empowers businesses to plan, execute . . .',
      isActive: true,
    },
    {
      icon: documentContained,
      heading: 'Air Services',
      content: 'The Air services focuses on delivering exceptional . . . ',
      isActive: true,
    },
    {
      icon: documentContained,
      heading: 'Loyalty Program',
      content:
        'The Loyalty Program is designed to help businesses engage clients . . .',
      isActive: false,
    },
    {
      icon: documentContained,
      heading: 'Air Operations',
      content:
        'The Air Operations helps businesses streamline and automate . . . ',
      isActive: true,
    },
  ];
};
