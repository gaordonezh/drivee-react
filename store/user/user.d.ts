import { UserRolesEnum, UserSexEnum, UserTypeDocumentEnum } from './user.enum';

export interface CreatePasswordBodyProps {
  token: string;
  password: string;
}

export interface ValidateUserBodyProps {
  n_doc?: string;
  email?: string;
  phone?: string;
  user?: string;
}

export interface CreateUserBodyProps {
  f_name: string;
  l_name: string;
  email: string;
  phone: string;
  roles: Array<UserRolesEnum>;
  date_birth: string;
}

export interface UpdateUserBodyProps {
  f_name: string;
  l_name: string;
  email: string;
  phone: string;
  // t_doc: UserTypeDocumentEnum;
  // n_doc: string;
  sex: UserSexEnum;
  date_birth: Date | null;
  address: AddressProps;
  photo: string;
  files?: Array<File>;
}

export interface UserProps {
  _id: string;
  f_name: string;
  l_name?: string;
  email: string;
  phone?: string;
  t_doc?: UserTypeDocumentEnum;
  n_doc?: string;
  sex?: UserSexEnum;
  address?: AddressProps;
  roles: Array<UserRolesEnum>;
  date_birth?: string;
  photo?: string;
  isVerified?: boolean;
}

export interface AddressProps {
  region?: string;
  province?: string;
  district?: string;
  ubigeo?: string;
  address: string;
  location: LocationProps;
}

export interface LocationProps {
  latitude: number;
  longitude: number;
}
