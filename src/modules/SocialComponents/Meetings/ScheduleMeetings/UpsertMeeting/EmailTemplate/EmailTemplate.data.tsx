import { TemplateOneImage, TemplateTwoImage } from '@/assets/images';
import * as Yup from 'yup';

export const templatesCardsArray = [
  { id: 1, title: 'Employee Email', image: TemplateOneImage },
  { id: 2, title: 'Employee Email', image: TemplateTwoImage },
  { id: 3, title: 'Employee Email', image: TemplateOneImage },
];

export const previewData = [
  {
    id: 1,
    title: 'Showcase your best stories',
    content:
      'Give an overview of an existing blog post or a popular story from a previous Newsletter. Be sure to add link so the reader can learn more.',
  },
  {
    id: 2,
    title: 'Another Great Story',
    content:
      'Share insights or details about another top-performing blog post or story. Include links for readers to explore further.',
  },
  {
    id: 3,
    title: 'Highlight Popular Posts',
    content:
      'Highlight popular posts from your website that readers should not miss. Ensure you add engaging descriptions and links.',
  },
];

export const emailTemplateSchema: any = Yup?.object()?.shape({
  emailTemplate: Yup?.string()
    ?.trim()
    ?.required('Required')
    ?.test('is-not-empty', 'Required', (value) => {
      const strippedContent = value?.replace(/<[^>]*>/g, '')?.trim();
      return strippedContent !== '';
    }),
});

export const defaultValues = {
  emailTemplate: '',
};

export const templateDropdownFunction = () => [
  {
    id: 1,
    title: 'Edit',
    permissionKey: [],
    handleClick: (close: any) => {
      close?.(false);
    },
  },
  {
    id: 2,
    title: 'Delete',
    permissionKey: [],
    handleClick: (close: any) => {
      close?.(false);
    },
  },
];
