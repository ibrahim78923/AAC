import * as Yup from 'yup';

export const pipelineCards = [
  {
    title: 'Total',
    key: 'total',
  },
  {
    title: 'Over time',
    key: 'overtime',
  },
  {
    title: 'Comparison',
    key: 'comparison',
  },
];

export const FilterValidationSchema = Yup.object().shape({
  pipeline: Yup.string(),
  userTeam: Yup.string(),
});

export const FilterDefaultValues = {
  pipeline: [],
  userTeam: '',
};
