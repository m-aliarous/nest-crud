import UserType from 'src/user/enums/userType';

declare module 'express-session' {
  interface SessionData {
    user: {
      userId: number;
      email: string;
      roles: [UserType];
    };
  }
}

declare module 'express' {
  interface Request {
    user: {
      userId: number;
      email: string;
      roles: [UserType];
    };
  }
}
