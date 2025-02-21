import {
  BeginnerAwardImage,
  DocPreviewImage,
  ExpertAwardImage,
  IntermediateAwardImage,
  MasterAwardImage,
  PdfPreviewImage,
  ProfessionalAwardImage,
  XlsPreviewImage,
} from '@/assets/images';
import { AGENT_LEVELS } from './strings';
import { ATTACHMENT_FILE_TYPE } from './file';

export const AGENT_LEVELS_IMAGES = {
  [AGENT_LEVELS?.BEGINNER]: BeginnerAwardImage,
  [AGENT_LEVELS?.EXPERT]: ExpertAwardImage,
  [AGENT_LEVELS?.INTERMEDIATE]: IntermediateAwardImage,
  [AGENT_LEVELS?.MASTER]: MasterAwardImage,
  [AGENT_LEVELS?.PROFESSIONAL]: ProfessionalAwardImage,
};

export const FILE_TYPE_BASED_IMAGES = {
  [ATTACHMENT_FILE_TYPE?.PDF]: PdfPreviewImage,
  [ATTACHMENT_FILE_TYPE?.XLS]: XlsPreviewImage,
  [ATTACHMENT_FILE_TYPE?.CSV]: XlsPreviewImage,
  [ATTACHMENT_FILE_TYPE?.DOC]: DocPreviewImage,
  [ATTACHMENT_FILE_TYPE?.DOCX]: DocPreviewImage,
};

export const STATIC_BLUR_DATA_URL = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8JczVAAAAmklEQVRIDbXBAQEAAAABIP6PzgpV8OQe84F0pKCW4GEHzpRZ7lBCBXbgTkQ4q0U9yswFtr9XlDPX0WoSzAkFqgg2eORl35A0wT2AM5Xj0cYw51TbdTA0vTpDbYfmsd2bGSB4vFQzzbxDLcRg4uAvwFAAAA//8DAIaJeYcAAAAASUVORK5CYII=
`;
