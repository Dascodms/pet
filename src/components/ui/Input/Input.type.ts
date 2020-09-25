import { FieldError } from 'react-hook-form';

export type InputProps = {
  type: string;
  name: string;
  placeholder: string;
  register: any;
  classes?: string;
  error: FieldError;
};
