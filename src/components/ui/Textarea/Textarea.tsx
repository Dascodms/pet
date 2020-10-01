import './Textarea.scss';

import React from 'react';
import { TextareaProps } from './Textarea.type';

const Textarea: React.FC<TextareaProps> = ({
  rows,
  placeholder,
  value,
  onChange,
  name,
  error,
  register,
  classes,
}): JSX.Element => (
  <>
    {name ? (
      <div className={`textarea ${classes ? classes : ''}`}>
        <label>
          <textarea
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
