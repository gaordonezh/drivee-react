import { CombinedDocumentEnum } from '@/store/documents/documents.enum';
import { UserSexEnum, UserTypeDocumentEnum } from '@/store/user/user.enum';

export const USER_SEX_TRANSLATE = {
  [UserSexEnum.FEMALE]: 'Mujer',
  [UserSexEnum.MALE]: 'Varón',
  [UserSexEnum.OTHER]: 'Otro',
};

export const USER_TDOC_TRANSLATE = {
  [UserTypeDocumentEnum.DNI]: 'DNI',
  [UserTypeDocumentEnum.PTP]: 'Permiso Temporal de Permanencia (PTP)',
  [UserTypeDocumentEnum.CNT_EXT]: 'Carné de extranjería',
  [UserTypeDocumentEnum.PASSPORT]: 'Pasaporte',
};

export const DOCUMENT_TYPES_TRANSLATE = {
  [CombinedDocumentEnum.IDENTIFICATION_CARD]: 'Documento de identificación',
  [CombinedDocumentEnum.SOAT]: 'SOAT',
  [CombinedDocumentEnum.DRIVER_LICENSE]: 'Licencia de conducir',
  [CombinedDocumentEnum.OWNERSHIP_CARD]: 'Tarjeta de propiedad',
  [CombinedDocumentEnum.TECHNICAL_INSPECTION]: 'Inspección técnica',
  [CombinedDocumentEnum.POLARIZED_GLASS]: 'Permiso para vidrio polarizado',
};
