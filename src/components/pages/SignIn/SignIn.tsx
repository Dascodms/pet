import '../../../assets/scss/form.scss';

import { MutationFunction, QueryResult, useMutation } from 'react-query';
import { TOKEN_NAME, post } from '../../../api';

import Button from '../../ui/Button/Button';
import Container from '../../ui/Container/Container';
import Input from '../../ui/Input/Input';
import React from 'react';
import Title from '../../ui/Titile/Title';
import { User } from '../../../hooks/useUser';
import { useAuth } from '../../Contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

type FormData = {
  email: string;
  password: string;
};

async function signIn(data: FormData): Promise<User> {
  const response = await post<{ user: User }>('/users/login', {
    user: data,
  });
  console.log(response);
  return response.user;
}

const SingIn = (): JSX.Element => {
  const history = useHistory();
  const { setUser } = useAuth();
  const { register, handleSubmit, errors, reset } = useForm<FormData>({
    mode: 'onTouched',
  });

  const [mutate, { error, isLoading }] = useMutation(signIn, {
    onSuccess(response) {
      setUser(response);
      localStorage.setItem(TOKEN_NAME, JSON.stringify(response.token));
      history.push('/');
    },
  });

  const onSubmit = (data: FormData): void => {
    mutate(data);
    reset();
  };
  return (
    <Container classes="container__form">
      <Title title="Sign In" />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register({
            required: 'Required field',
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
          })}
          type="password"
          name="password"
          placeholder="Password"
          classes="input__form"
          error={errors.password}
        />
        <Button
          disabled={isLoading}
          classes="button__form"
          value="Sign in"
          type="submit"
        />
        {error ? <div>Error!</div> : null}
      </form>
    </Container>
  );
};

export default SingIn;
