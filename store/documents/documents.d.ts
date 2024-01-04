import { DocumentStatusEnum, DocumentTypesEnum } from './documents.enum';

export interface CreateDocumentProps {
  idUser?: string;
  idVehicle?: string;
  type: DocumentTypesEnum;
  url: string;
}

export interface UpdateDocumentProps {
  idUser?: string;
  idVehicle?: string;
  type?: DocumentTypesEnum;
  url?: string;
  status?: DocumentStatusEnum;
  comment?: string;
}

export interface GetDocumentsFilterProps {
  idUser?: string;
  idVehicle?: string;
  type?: DocumentTypesEnum;
  status?: DocumentStatusEnum;
  kind: 'personal' | 'vehicle';
}

export interface DocumentProps {
  _id: string;
  idUser?: string;
  idVehicle?: string;
  type: DocumentTypesEnum;
  url: string;
  status: DocumentStatusEnum;
  comment?: string;
  isActive: boolean;
}

export interface AuxDocumentProps {
  title: string;
  status: DocumentStatusEnum;
  type: DocumentTypesEnum;
  _id?: string;
}
