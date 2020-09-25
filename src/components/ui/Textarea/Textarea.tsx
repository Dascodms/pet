import './Textarea.scss';

import React from 'react';
import { TextareaProps } from './Textarea.type';

const Textarea: React.FC<TextareaProps> = ({
  rows,
  placeholder,
  value,
  onChange,
}): JSX.Element => (
  <textarea
    value={value}
    onChange={onChange}
    rows={rows}
    placeholder={placeholder}
    className="textarea"
  ></textarea>
);

export default Textarea;
