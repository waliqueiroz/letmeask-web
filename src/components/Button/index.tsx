/* eslint-disable react/jsx-props-no-spreading */
import { ButtonHTMLAttributes } from 'react';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

export const Button: React.FC<ButtonProps> = ({ isOutlined = false, ...props }) => (
  <button
    type="button"
    className={`button ${isOutlined ? 'outlined' : ''}`}
    {...props}
  />
);
