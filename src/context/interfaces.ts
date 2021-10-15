export interface User {
  user_id?: number;
  username: string;
  password: string;
  email?: string | null;
  session?: string;
}

export interface HomePageProps {
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  previousPage?: () => () => void;
}