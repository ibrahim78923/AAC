import {
  BeginnerAwardImage,
  DocImage,
  ExpertAwardImage,
  IntermediateAwardImage,
  MasterAwardImage,
  PdfImage,
  ProfessionalAwardImage,
  XlsImage,
} from '@/assets/images';
import { AGENT_LEVELS, ATTACHMENT_FILE_TYPE } from './strings';

export const AGENT_LEVELS_IMAGES = {
  [AGENT_LEVELS?.BEGINNER]: BeginnerAwardImage,
  [AGENT_LEVELS?.EXPERT]: ExpertAwardImage,
  [AGENT_LEVELS?.INTERMEDIATE]: IntermediateAwardImage,
  [AGENT_LEVELS?.MASTER]: MasterAwardImage,
  [AGENT_LEVELS?.PROFESSIONAL]: ProfessionalAwardImage,
};

export const FILE_TYPE_BASED_IMAGES = {
  [ATTACHMENT_FILE_TYPE?.PDF]: PdfImage,
  [ATTACHMENT_FILE_TYPE?.XLS]: XlsImage,
  [ATTACHMENT_FILE_TYPE?.CSV]: XlsImage,
  [ATTACHMENT_FILE_TYPE?.DOC]: DocImage,
  [ATTACHMENT_FILE_TYPE?.DOCX]: DocImage,
};
