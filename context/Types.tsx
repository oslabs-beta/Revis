export type Metrics = [{}];

export type CurrentServer = {
  endpoint: string;
  password: string;
  port: string | number;
  sessionToken?: string;
};

export type Server = {
  name: string;
  ip: string;
  port: string;
  username: string;
  endpoint: string;
  password: string;
  currentServer?: CurrentServer;
};

export type Action = {
  type: string;
  message: string;
};
