import { CONTRACTS_STATUS } from '@/constants';
import { useTheme } from '@mui/material';
import React from 'react';

const DocumentIcon = ({ type }: any) => {
  const theme = useTheme();
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
        stroke={theme.palette?.custom?.slate_blue ?? '#98A2B3'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 10V14.47"
        stroke={theme.palette?.custom?.slate_blue ?? '#98A2B3'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
        stroke={theme.palette?.custom?.slate_blue ?? '#98A2B3'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {type === CONTRACTS_STATUS?.DRAFT && (
        <>
          <path
            d="M14.2102 13.798C13.0302 14.918 13.3702 15.828 14.1302 16.638L18.5202 21.288C18.6902 21.468 19.0202 21.648 19.2602 21.688L20.9802 21.978C21.6002 22.088 22.0502 21.658 21.9802 21.028L21.7802 19.298C21.7502 19.058 21.5902 18.708 21.4202 18.528L17.0302 13.878C16.2702 13.078 15.3802 12.688 14.2002 13.788L14.2102 13.798Z"
            stroke="#38CAB5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.8594 17.1225C16.2394 16.9825 17.3594 15.9325 17.5694 14.5625"
            stroke="#38CAB5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}

      {type === CONTRACTS_STATUS?.PENDING && (
        <>
          <path
            d="M18.5 22C20.43 22 22 20.43 22 18.5C22 16.57 20.43 15 18.5 15C16.57 15 15 16.57 15 18.5C15 20.43 16.57 22 18.5 22Z"
            stroke={theme?.palette?.warning?.main ?? '#FFC20E'}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.2695 18.5H19.3695"
            stroke={theme?.palette?.warning?.main ?? '#FFC20E'}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.6699 19.5531L19.7199 18.5031L18.6699 17.4531"
            stroke={theme?.palette?.warning?.main ?? '#FFC20E'}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {(type === CONTRACTS_STATUS?.CHANGE_REQUEST ||
        type === CONTRACTS_STATUS?.REJECTED) && (
        <>
          <path
            d="M17.5991 22.2137C19.6891 22.2137 21.4091 20.5037 21.4091 18.4037C21.4091 16.3037 19.6991 14.5938 17.5991 14.5938C15.4991 14.5938 13.7891 16.3037 13.7891 18.4037C13.7891 20.5037 15.4991 22.2137 17.5991 22.2137Z"
            stroke={theme?.palette?.custom?.inactive_bg ?? '#FF4A4A'}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.5293 19.4725L18.6893 17.3125"
            stroke={theme?.palette?.custom?.inactive_bg ?? '#FF4A4A'}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.6795 19.4725L16.5195 17.3125"
            stroke={theme?.palette?.custom?.inactive_bg ?? '#FF4A4A'}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}

      {type === CONTRACTS_STATUS?.SIGNED && (
        <>
          <path
            d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
            stroke={theme.palette?.custom?.slate_blue ?? '#98A2B3'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.6801 21.9969C19.6601 21.9969 21.2801 20.3769 21.2801 18.3969C21.2801 16.4169 19.6601 14.7969 17.6801 14.7969C15.7001 14.7969 14.0801 16.4169 14.0801 18.3969C14.0801 20.3769 15.7001 21.9969 17.6801 21.9969Z"
            stroke="#47B263"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.1504 18.4028L17.1704 19.4228L19.2104 17.3828"
            stroke="#47B263"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
};

export default DocumentIcon;
