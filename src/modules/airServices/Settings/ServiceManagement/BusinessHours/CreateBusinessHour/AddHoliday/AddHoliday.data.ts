import * as yup from 'yup';
export const holidayDefaultValues = {
    name: '',
    date: null,
}
export const holidayValidationSchema: any = yup?.object()?.shape({
    name: yup
        ?.string()
        ?.required('Required')
        ?.required('Required')
        ?.min(3, 'At least 3 characters Required')
        ?.max(20, 'Must not exceed 20 characters'),
    date: yup?.string()?.nullable()?.required('Required'),
});