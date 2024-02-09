import { PaginationProps } from '@/interfaces/global';
import { SimpleUserProps } from '../user/user';
import { SimpleVehicleProps } from '../vehicle/vehicle';
import { BookingStatusEnum } from './booking.enum';

export interface BookingProps {
  _id: string;
  user: SimpleUserProps;
  vehicle: SimpleVehicleProps;
  startDatetime: string;
  endDatetime: string;
  totalPrice: number;
  totalHours: number;
  status: BookingStatusEnum;
}

export interface GetBookingBodyProps extends PaginationProps {
  user?: string;
  owner?: string;
  status?: BookingStatusEnum;
  populate?: Array<'owner'>;
}

export interface CreateBookingBodyProps {
  user: SimpleUserProps;
  vehicle: SimpleVehicleProps;
  startDatetime: string;
  endDatetime: string;
  totalPrice: number;
  totalHours: number;
}
