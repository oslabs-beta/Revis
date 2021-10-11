export type Metrics = [{}];

export type Server = {
  name: string;
  ip: string;
  port: string;
  username: string;
};

export type Action = {
  type: string;
  message: string;
};
