import React from 'react';
import UploadAttachments from './UploadAttachment';
import FileAttachment from './FileAttachement';
import { fileAttachmentData } from './FileAttachement/FileAttachment.data';

function Attachments() {
  //const { fileSubmit } = useUploadAttachments();

  return (
    <>
      {fileAttachmentData.length > 0 ? (
        <FileAttachment />
      ) : (
        <UploadAttachments />
      )}
    </>
  );
}

export default Attachments;
