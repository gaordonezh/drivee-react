import { PaginationProps } from '@/interfaces/global';
import { AddressProps, SimpleUserProps } from '../user/user';
import { VehicleStatusEnum, VehicleTypeEnum } from './vehicle.enum';
import { VehicleDocumentTypesEnum } from '../documents/documents.enum';
import { SimpleVehicleProps } from '../vehicle/vehicle';

export interface CommentProps {
  _id: string;
  user: SimpleUserProps;
  vehicle: SimpleVehicleProps;
  stars: number;
  title: string;
  description: string;
  updatedAt: string;
}

export interface GetCommentsFilterProps extends PaginationProps {
  user?: string;
  vehicle?: string;
}

export interface CreateCommentBodyProps {
  user: SimpleUserProps;
  vehicle: SimpleVehicleProps;
  stars: number;
  title: string;
  description: string;
}
