import { useState } from 'react';
import { LeftSideData, RightSideData } from './Chat.interface';

export const useChat = () => {
  const [currTab, setCurrTab] = useState<string | number>('');
  const getTabVal = (val: string | number) => setCurrTab(val);
  const [messages, setMessags] = useState<any>([]);
  const [sendEmailModal, setSendEmailModal] = useState(false);
  const [replyModal, setReplyModal] = useState(false);

  const [linkToDealModal, setLinkToDealModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);

  const handleLinkToDealModal = () => setLinkToDealModal(!linkToDealModal);
  const handleDeleteModal = () => setDeleteModal(!deleteModal);
  const handleSendEmailModal = () => setSendEmailModal(!sendEmailModal);
  const handleReplyModal = () => setReplyModal(!replyModal);
  const handleContactModal = () => setContactModal(!contactModal);

  const handleActionChange = (value: string) => {
    switch (value) {
      case 'Link to deal':
        handleLinkToDealModal();
        break;
      case 'Delete':
        handleDeleteModal();
        break;
      case 'Reply':
        handleReplyModal();
        break;
      case 'Forward':
        handleReplyModal();
        break;

      default:
        break;
    }
  };

  const leftSideData: LeftSideData = {
    getTabVal,
    actionButtonProps: {
      disableActionBtn: false,
      onChange: handleActionChange,
    },
    filterBtnProps: { onClick: () => {} },
    inboxData: {
      data: [
        {
          title: 'this is title',
          subTitle: 'this is sub title',
          description: 'this is description',
          time: '12:48PM',
          date: 'Apr 6, 2023 at 09:49 GMT +5',
          to: 'john doe',
        },
      ],
      handleRefresh: () => {},
      selectAllProps: {
        onChange: ({ target }) => {
          target?.value;
        },
      },
      singleCardClick: (obj: object) => {
        setMessags([obj]);
      },
      singleCheckboxProps: {
        onChange: ({ target }) => {
          target?.value;
        },
      },
    },
    ScheduledData: {},
    draftData: {},
    sentData: {},
    trashData: {},
  };

  const rightSideData: RightSideData = {
    title: 'this is title for message',
    data: messages,
    emailSettingProps: { onClick: () => {} },
    handleForward: (obj) => {
      obj;
      handleReplyModal();
    },
    handleReplay: (obj) => {
      obj;
      handleReplyModal();
    },
    handleReplayAll: (obj) => {
      obj;
    },
    sendEmailProps: { onClick: handleSendEmailModal },
    searchProps: {
      onChange: (event) => {
        event;
      },
    },
    handleContactModal,
  };

  return {
    currTab,
    leftSideData,
    rightSideData,
    linkToDealModal,
    handleLinkToDealModal,
    handleDeleteModal,
    deleteModal,
    handleSendEmailModal,
    sendEmailModal,
    handleReplyModal,
    replyModal,
    contactModal,
    handleContactModal,
  };
};
