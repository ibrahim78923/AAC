import React from 'react';
import { RHFDropzonePreviewAllTypes } from '@/components/ReactHookForm';
import { IconExportFeatured } from '@/assets/icons';

export default function DefaultAttachment() {
  return (
    <RHFDropzonePreviewAllTypes
      label="Default Attachments"
      name="defaultAttachment"
      fileName=""
      fileType="SVG, PNG, JPG or GIF (max. 800x400px)"
      accept={{
        'image/png': ['.png', '.PNG'],
        'image/jpeg': ['.jpg', '.jpeg', '.JPG', '.JPEG'],
      }}
      icon={<IconExportFeatured />}
    />
  );
}
