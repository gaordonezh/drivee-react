import { UserSexEnum, UserTypeDocumentEnum } from '@/store/user/user.enum';

export const USER_SEX_TRANSLATE = {
  [UserSexEnum.FEMALE]: 'Mujer',
  [UserSexEnum.MALE]: 'Varón',
  [UserSexEnum.OTHER]: 'Otro',
};

export const USER_TDOC_TRANSLATE = {
  [UserTypeDocumentEnum.DNI]: 'DNI',
  [UserTypeDocumentEnum.RUC]: 'RUC',
  [UserTypeDocumentEnum.PTP]: 'Permiso Temporal de Permanencia (PTP)',
  [UserTypeDocumentEnum.CNT_EXT]: 'Carné de extranjería',
  [UserTypeDocumentEnum.PASSPORT]: 'Pasaporte',
};
