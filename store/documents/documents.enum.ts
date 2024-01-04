export enum DocumentStatusEnum {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  REVIEW = 'review',
}

export enum PersonalDocumentTypesEnum {
  IDENTIFICATION_CARD = 'IDENTIFICATION_CARD',
}
export enum VehicleDocumentTypesEnum {
  SOAT = 'SOAT',
}
export const CombinedDocumentEnum = {
  ...PersonalDocumentTypesEnum,
  ...VehicleDocumentTypesEnum,
};
export type DocumentTypesEnum = keyof typeof CombinedDocumentEnum;
