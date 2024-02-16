import { UserRolesEnum, UserSexEnum, UserTypeDocumentEnum } from './user.enum';

export interface CreatePasswordBodyProps {
  token: string;
  password: string;
  action?: string;
}

export interface ForgotPasswordBodyProps {
  email: string;
}

export interface UpdatePasswordBodyProps {
  userId: string;
  body: {
    current: string;
    new: string;
    confirm: string;
  };
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
  t_doc: UserTypeDocumentEnum;
  n_doc: string;
  phone: string;
  // sex: UserSexEnum;
  date_birth: Date | null;
  address: AddressProps | null;
  photo: string;
  files?: Array<File>;
  roles?: Array<UserRolesEnum>;
}

export interface SimpleUserProps {
  f_name: string;
  l_name: string;
  email: string;
  phone: string;
  id: string;
  photo?: string;
}

export interface UserProps {
  _id: string;
  f_name: string;
  l_name?: string;
  email: string;
  phone?: string;
  t_doc?: UserTypeDocumentEnum;
  n_doc?: string;
  // sex?: UserSexEnum;
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
  id: string;
}

export interface LocationProps {
  lat: number;
  lng: number;
}
