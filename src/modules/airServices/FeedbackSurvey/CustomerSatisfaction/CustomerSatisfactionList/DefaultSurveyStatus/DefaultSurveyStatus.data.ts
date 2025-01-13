import { FeedbackSurveyListI } from '@/types/modules/AirServices/FeedbackSurvey';
import { Theme } from '@mui/material';

export const surveyEmailHtml = ({
  sessionData,
  theme,
  surveyValues,
}: {
  theme: Theme;
  sessionData: { user: { organization: { name: string } } };
  surveyValues: FeedbackSurveyListI;
}) =>
  `<p><b>Dear Valued Contributor,</b></p>
  <p>I hope this message finds you well. We would like to invite you to participate in an anonymous survey for the ${surveyValues?.surveyTitle}.</p>
  <p>The purpose of this survey is to help our management team better understand your work experience. Your participation is completely private, and your answers will remain confidential.</p>
  <p>To fill out the survey, please visit the following link:<br>
  <a href="${surveyValues?.magicLink}" style="text-decoration: underline; color: ${theme
    ?.palette?.blue?.link_blue}" target="_blank">${
    surveyValues?.displayName ?? surveyValues?.surveyTitle
  }</a></p><br/>
  <p>Thank you in advance for your valuable feedback.</p><br/>
  <p>Regards,<br/><br><b>${sessionData?.user?.organization?.name}</b></p>
  `;
