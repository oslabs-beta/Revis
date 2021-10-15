export interface User {
  user_id?: number;
  username: string;
  password?: string;
  email?: string | null;
  session?: string;
}

export interface MetricsProps {
  keys: string;
  values: string;
}
export interface UserProvider {
  userState: User;
  userDispatch: Function;
}
