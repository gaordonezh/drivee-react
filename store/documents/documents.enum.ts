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
  DRIVER_LICENSE = 'DRIVER_LICENSE',
  OWNERSHIP_CARD = 'OWNERSHIP_CARD',
  POLARIZED_GLASS = 'POLARIZED_GLASS',
  TECHNICAL_INSPECTION = 'TECHNICAL_INSPECTION',
}
export const CombinedDocumentEnum = {
  ...PersonalDocumentTypesEnum,
  ...VehicleDocumentTypesEnum,
};
export type DocumentTypesEnum = keyof typeof CombinedDocumentEnum;
