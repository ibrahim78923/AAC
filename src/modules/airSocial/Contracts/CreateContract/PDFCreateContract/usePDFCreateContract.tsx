import React, { useState } from 'react';
import {
  TextComponentI,
  signatureFieldI,
} from '@/modules/airSocial/Contracts/CreateContract/CreateContract.interface';

export default function usePDFCreateContract() {
  // Add Text
  const [textComponents, setTextComponents] = useState<TextComponentI[]>([]);
  const handleAddText = () => {
    const newTextComponent = {
      id: `${Date.now()}`,
      name: `editor-${textComponents?.length + 1}`,
      content: '',
      x: 0,
      y: 0,
    };

    setTextComponents([...textComponents, newTextComponent]);
  };
  const handleDeleteText = (id: string) => {
    const newTextComponents = textComponents.filter(
      (textComponent) => textComponent.id !== id,
    );
    setTextComponents(newTextComponents);
  };

  // Add Signature
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [signatureFields, setSignatureFields] = useState<signatureFieldI[]>([]);
  const handleAddSignature = (name: string) => {
    const newSignatureField = {
      id: `${Date.now()}`,
      name: name,
      x: 0,
      y: 0,
    };

    setSignatureFields([...signatureFields, newSignatureField]);
  };

  const handleDeleteSignature = (id: string) => {
    const newSignatureFields = signatureFields.filter(
      (signatureField) => signatureField.id !== id,
    );
    setSignatureFields(newSignatureFields);
  };

  return {
    textComponents,
    handleAddText,
    handleDeleteText,

    anchorEl,
    open,
    handleClick,
    handleClose,
    signatureFields,
    handleAddSignature,
    handleDeleteSignature,
  };
}
