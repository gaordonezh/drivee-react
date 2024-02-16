import { UserRolesEnum } from '@/store/user/user.enum';

export const JWT_SECRET_SEED = 'my_secret_seed';
export const USER_SESSION_KEY = 'TNbvWQCKnQSDiSDyoQpqIxovg';
export const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
export const PHONE_PATTERN = /^\d{9}$/;
export const N_DOC_PATTERN = /^\d{8,12}$/;
export const staticGoogleData = {
  roles: [UserRolesEnum.USER],
  secret: JWT_SECRET_SEED,
  provider: 'Google',
};
