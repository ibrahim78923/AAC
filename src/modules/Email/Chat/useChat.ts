import { useState } from 'react';
import { LeftSideData, RightSideData } from './Chat.interface';

export const useChat = () => {
  const [currTab, setCurrTab] = useState<string | number>('');
  const getTabVal = (val: string | number) => setCurrTab(val);
  const [messages, setMessags] = useState<any>([]);

  const leftSideData: LeftSideData = {
    getTabVal,
    actionButtonProps: {
      disableActionBtn: false,
      onChange: (value) => {
        value;
      },
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
          target.value;
        },
      },
      singleCardClick: (obj: object) => {
        setMessags([obj]);
      },
      singleCheckboxProps: {
        onChange: ({ target }) => {
          target.value;
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
    },
    handleReplay: (obj) => {
      obj;
    },
    handleReplayAll: (obj) => {
      obj;
    },
    sendEmailProps: { onClick: () => {} },
    searchProps: {
      onChange: (event) => {
        event;
      },
    },
  };

  return {
    currTab,
    leftSideData,
    rightSideData,
  };
};
