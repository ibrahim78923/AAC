import { SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS } from '@/constants/permission-keys';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import * as Yup from 'yup';
import { MeetingDataI } from './EmailTemplate.interface';
import { Dispatch, SetStateAction } from 'react';
import { NextRouter } from 'next/router';
import { SOCIAL_COMPONENTS } from '@/constants/routes';

export const emailTemplateSchema: any = Yup?.object()?.shape({
  emailTemplate: Yup?.string()
    ?.trim()
    ?.required('Required')
    ?.test('is-not-empty', 'Required', (value) => {
      const strippedContent = value?.replace(/<[^>]*>/g, '')?.trim();
      return strippedContent !== '';
    }),
});

export const defaultValues = (data: any) => ({
  emailTemplate: data?.data?.paragraph,
});

export const templateDropdownFunction = (
  item: MeetingDataI,
  router: NextRouter,
  meetingId: any,
  ticketId: any,
  setDeleteModal: Dispatch<SetStateAction<Record<string, any>>>,
) => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [
      SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.EDIT_MEETING,
      SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.CREATE_MEETING,
    ],
    handleClick: (close: any) => {
      close?.(false);
      router?.push({
        pathname: SOCIAL_COMPONENTS?.CREATE_MEETING_TEMPLATE,
        query: {
          id: item?._id,
          ...(ticketId && { ticketId: ticketId }),
          meetingId: meetingId,
          type: GENERIC_UPSERT_FORM_CONSTANT?.EDIT,
        },
      });
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [
      SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.EDIT_MEETING,
      SOCIAL_COMPONENTS_MEETINGS_PERMISSIONS?.CREATE_MEETING,
    ],
    handleClick: (close: any) => {
      close?.(false);
      setDeleteModal({ isOpen: true, data: item });
    },
    disabled: item?.isDefault === true,
  },
];
