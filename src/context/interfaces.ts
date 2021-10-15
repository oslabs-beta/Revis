export interface User {
  user_id?: number;
  username: string;
  password?: string;
  email?: string | null;
  session?: string;
}

export interface HomePageProps {
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  previousPage?: () => () => void;
}
export interface MetricsProps {
  keys: string;
  values: string;
}
export interface UserProvider {
  userState: User;
  userDispatch: Function;
}
