import './style.scss';

import React, { FC } from 'react';

type Props = {
  rows?: number;
  placeholder: string;
  value?: string;
  onChange?: (e: React.FormEvent<EventTarget>) => void;
  register?: any;
  name?: string;
  className?: string;
  disabled?: boolean;
};

const Textarea: FC<Props> = ({
  rows,
  placeholder,
  value,
  onChange,
  name,
  register,
  className = '',
  disabled,
}): JSX.Element => (
  <>
    {name ? (
      <textarea
        disabled={disabled}
        className={`textarea ${className}`}
        ref={register}
        placeholder={placeholder}
        name={name}
      />
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
