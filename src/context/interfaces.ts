export interface User {
  user_id?: number;
  username: string;
  password: string;
  email?: string | null;
  session?: string;
}

interface Dog {
  name: string
  age: number
}
