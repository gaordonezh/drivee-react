import { PaginationProps } from '@/interfaces/global';
import { AddressProps, SimpleUserProps } from '../user/user';
import { VehicleStatusEnum, VehicleTypeEnum } from './vehicle.enum';
import { VehicleDocumentTypesEnum } from '../documents/documents.enum';

export interface VehicleProps {
  _id: string;
  user: SimpleUserProps;
  name: string;
  description: string;
  images: Array<string>;
  pricexhour: number;
  address: AddressProps;
  status: VehicleStatusEnum;
  details: Array<VehicleDetailsProps>;
  documents: Array<VehicleDocumentTypesEnum>;
  type: VehicleTypeEnum;
}

export interface VehicleDetailsProps {
  title: string;
  value: string;
}

export interface GetVehiclesFilterProps extends PaginationProps {
  user: string;
}

export interface GetPublicVehiclesFilterProps extends PaginationProps {
  willcard?: string;
  latitude?: number;
  longitude?: number;
  dateFrom?: string;
  dateTo?: string;
  type?: VehicleTypeEnum;
  priceFrom?: string;
  priceTo?: string;
}

export interface CreateVehicleBodyProps {
  user: SimpleUserProps;
  name: string;
  description: string;
  images: Array<string>;
  pricexhour: number;
  address: AddressProps;
  details: Array<VehicleDetailsProps>;
}

export interface updateVehicleBodyProps {
  user?: SimpleUserProps;
  name?: string;
  description?: string;
  images?: Array<string>;
  pricexhour?: number;
  address?: AddressProps;
  status?: VehicleStatusEnum;
  details?: Array<VehicleDetailsProps>;
  documents?: Array<VehicleDocumentTypesEnum>;
}

export interface SimpleVehicleProps {
  id: string;
  name: string;
  description: string;
}
