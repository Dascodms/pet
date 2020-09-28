import '../../../assets/scss/form.scss';

import React, { useEffect } from 'react';

import Button from '../../ui/Button/Button';
import Container from '../../ui/Container/Container';
import Input from '../../ui/Input/Input';
import Title from '../../ui/Titile/Title';
import { useForm } from 'react-hook-form';

type FormData = {
  username: string;
  email: string;
  password: string;
};

const SignUp = (): JSX.Element => {
  const { register, handleSubmit, errors, reset } = useForm<FormData>({
    mode: 'onTouched',
  });

  const onSubmit = (data: FormData): void => {
    reset();
  };

  useEffect(() => {
    console.log(errors);
  });
  return (
    <Container classes="container__form">
      <Title title="Sign Up" />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register({
            required: 'Required field',
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: 'Only english letters',
            },
          })}
          type="text"
          name="username"
          placeholder="Username"
          classes="input__form"
          error={errors.username}
        />
        <Input
          register={register({
            required: 'Required field',
            pattern: {
              value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
              message: 'Incorrect email',
            },
          })}
          type="email"
          name="email"
          placeholder="name@example.com"
          classes="input__form"
          error={errors.email}
        />
        <Input
          register={register({
            required: 'Required field',
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                'Minimum 8 characters, at least one uppercase letter, one lowercase letter and one number',
            },
          })}
          type="password"
          name="password"
          placeholder="Password"
          classes="input__form"
          error={errors.password}
        />
        <Button flexEnd submit>
          Sign up
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;
