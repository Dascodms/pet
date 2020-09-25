import { FieldError } from 'react-hook-form';

export type ButtonProps = {
  type: string;
  value: string;
  classes?: string;
  disabled?: boolean;
  onClick?: () => void;
};
