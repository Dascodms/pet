import './Textarea.scss';

import React, { FC } from 'react';

import { FieldError } from 'react-hook-form';

type Props = {
  rows?: number;
  placeholder: string;
  value?: string;
  onChange?: (e: React.FormEvent<EventTarget>) => void;
  register?: any;
  name?: string;
  error?: FieldError;
  className?: string;
  label?: string;
  disabled?: boolean;
};

const Textarea: FC<Props> = ({
  rows,
  placeholder,
  value,
  onChange,
  name,
  error,
  register,
  className = '',
  label = '',
  disabled,
}): JSX.Element => (
  <>
    {name ? (
      <div className={`textarea ${className}`}>
        <label>
          {label}
          <textarea
            disabled={disabled}
            className="textarea__element"
            ref={register}
            placeholder={placeholder}
            name={name}
          />
        </label>
        {error && <div className="textarea__error">{error.message}</div>}
      </div>
    ) : (
      <textarea
        disabled={disabled}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="textarea"
      ></textarea>
    )}
  </>
);

export default Textarea;
