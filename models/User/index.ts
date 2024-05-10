export interface User {
  status: USER_STATUS;
  role: USER_ROLE;
  phoneNumber?: string;
  email: string;
  username?: string;
  uid: string;
  business?: string;
  picture?: string;

  name: string;
  displayName: string;
  provider: string;

  metadata?: {
    creationTime: string;
  };
}

export enum USER_ROLE {
  GUEST = 'guest',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

export enum USER_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
