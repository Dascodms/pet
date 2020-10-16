import React, { FC, useEffect } from 'react';
import {
  getCurrentUser,
  updateUser,
} from '../../../services/userService/userService';
import { useMutation, useQuery } from 'react-query';

import Button from '../../ui/Button/Button';
import Container from '../../ui/Container/Container';
import Input from '../../ui/Input/Input';
import Textarea from '../../ui/Textarea/Textarea';
import Title from '../../ui/Title/Title';
import { useForm } from 'react-hook-form';

type UpdateSettings = {
  email: string;
  bio: string;
  image: string;
  password: string;
  username: string;
};

const Settings: FC = () => {
  const { register, handleSubmit, errors, reset } = useForm<UpdateSettings>({
    mode: 'onTouched',
  });
  const { data, error } = useQuery('user', getCurrentUser, {
    refetchOnWindowFocus: false,
  });

  const [mutate, { isLoading }] = useMutation(updateUser, {});

  const onSubmit = (data: UpdateSettings): void => {
    mutate(data);
  };

  useEffect(() => {
    if (data) {
      reset({
        email: data.email,
        image: data.image,
        username: data.username,
        bio: data.bio,
      });
    }
  }, [data]);

  if (!data) return null;

  return (
    <Container className="container__form">
      <Title title="Update settings" />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register({
            pattern: {
              value: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/,
              message: 'Incorrect url adress',
            },
          })}
          disabled={isLoading}
          type="text"
          name="image"
          placeholder="Url of profile picture"
          className="input__form"
          error={errors.image}
        />
        <Input
          register={register({
            required: 'Required field',
          })}
          disabled={isLoading}
          type="text"
          name="username"
          placeholder="Username"
          className="input__form"
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
          disabled={isLoading}
          type="text"
          name="email"
          placeholder="Email"
          className="input__form"
          error={errors.email}
        />
        <Textarea
          register={register()}
          disabled={isLoading}
          name="bio"
          placeholder="Bio"
          error={errors.bio}
          className="textarea__form"
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
          disabled={isLoading}
          type="password"
          name="password"
          placeholder="Password"
          className="input__form"
          error={errors.password}
        />
        <Button disabled={isLoading} submit>
          Update Settings
        </Button>
      </form>
    </Container>
  );
};

export default Settings;
