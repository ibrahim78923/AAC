import * as Yup from 'yup';

export const emailLinkToDealSchema: any = () => {
  return Yup?.object()?.shape({
    linkToDeal: Yup?.mixed()?.nullable()?.required('Required'),
  });
};

export const emailLinkToDealDefaultValues = {
  linkToDeal: null,
};
