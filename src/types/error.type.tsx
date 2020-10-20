export type ErrorType = {
  errors: {
    [key: string]: [string];
  };
};

export type ErrorRollback = () => void;
