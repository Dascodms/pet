import { FieldError } from 'react-hook-form';

export type TextareaProps = {
  rows?: number;
  placeholder: string;
  value?: string;
  onChange?: (e: React.FormEvent<EventTarget>) => void;
  register?: any;
  name?: string;
  error?: FieldError;
  classes?: string;
};
