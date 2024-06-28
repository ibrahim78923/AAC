import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useEditPhysicalCard = () => {
  const theme = useTheme();
  const router = useRouter();
  const [flip, setFlip] = useState(false);
  const [editShop, setEditShop] = useState(true);
  const [editShopValue, setEditShopValue] = useState();
  const [editCard, setEditCard] = useState(true);
  const [editCardValue, setEditCardValue] = useState();
  const [editText, setEditText] = useState(true);
  const [editTextValue, setEditTextValue] = useState();

  const methods: any = useForm({
    defaultValues: {
      shopTitle: 'Share My Dine',
      cardTitle: 'Gift Card',
      enterText: 'Enter Text',
    },
  });
  const { watch, setValue } = methods;
  const shopTitle = watch('shopTitle');
  const cardTitle = watch('cardTitle');
  const enterText = watch('enterText');

  return {
    editShop,
    setEditShop,
    setEditShopValue,
    editShopValue,
    editCard,
    setEditCard,
    editCardValue,
    setEditCardValue,
    editText,
    setEditText,
    editTextValue,
    setEditTextValue,
    theme,
    flip,
    setFlip,
    router,
    methods,
    shopTitle,
    setValue,
    enterText,
    cardTitle,
  };
};
