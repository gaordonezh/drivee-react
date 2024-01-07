import { UserProps } from '../user/user';
import { VehicleProps } from '../vehicle/vehicle';
import { DocumentStatusEnum, DocumentTypesEnum } from './documents.enum';

export interface CreateDocumentProps {
  user?: string;
  vehicle?: string;
  type: DocumentTypesEnum;
  url: string;
  username: string;
  email: string;
  documents?: Array<DocumentTypesEnum>;
  skip?: boolean;
}

export interface UpdateDocumentProps {
  user?: string;
  vehicle?: string;
  type?: DocumentTypesEnum;
  url?: string;
  status?: DocumentStatusEnum;
  comment?: string;
  username: string;
  email: string;
}

export interface GetDocumentsFilterProps {
  user?: string;
  vehicle?: string;
  type?: DocumentTypesEnum;
  status?: DocumentStatusEnum;
  kind?: 'user' | 'vehicle';
  populate?: Array<'user' | 'vehicle'>;
}

export interface DocumentProps {
  _id: string;
  user?: UserProps;
  vehicle?: VehicleProps;
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
  comment?: string;
  _id?: string;
  url?: string;
}
