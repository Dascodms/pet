import './EditArticleModal.scss';

import React, { FC, useEffect } from 'react';
import { queryCache, useMutation } from 'react-query';

import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import Textarea from '../../ui/Textarea/Textarea';
import Title from '../../ui/Title/Title';
import { VscClose } from 'react-icons/vsc';
import { editArticle } from '../../../services/articleService/articleService';
import { useForm } from 'react-hook-form';

type Props = {
  setShow: (value: boolean) => void;
  title: string;
  description: string;
  body: string;
  slug: string;
};

type PutType = {
  title: string;
  description: string;
  body: string;
};

const EditArticleModal: FC<Props> = ({
  setShow,
  title,
  body,
  description,
  slug,
}): JSX.Element => {
  const { register, handleSubmit, errors, reset } = useForm<PutType>({
    mode: 'onTouched',
  });

  const [mutate, { isLoading }] = useMutation(editArticle, {
    onSuccess() {
      queryCache.refetchQueries(['article', slug]);
    },
    onError(e) {
      console.log(e);
    },
  });

  const onSubmit = (data: PutType): void => {
    mutate({ data, slug });
  };

  useEffect(() => {
    reset({
      title,
      body,
      description,
    });
  }, []);

  return (
    <>
      <div onClick={() => setShow(false)} className="modal__background"></div>
      <div className="modal">
        <VscClose
          onClick={() => setShow(false)}
          className="modal__close"
          color="red"
          size="1.2em"
          cursor="pointer"
        />
        <Title title="Edit Article"></Title>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Title"
            register={register({
              required: 'Required field',
            })}
            type="text"
            name="title"
            placeholder="Article title"
            className="input__form"
            error={errors.title}
          />

          <Input
            label="Description"
            register={register({
              required: 'Required field',
            })}
            type="text"
            name="description"
            placeholder="What's this article about?"
            className="input__form"
            error={errors.description}
          />

          <Textarea
            label="Body"
            register={register({
              required: 'Required field',
            })}
            name="body"
            placeholder="Write your article (in markdown)"
            error={errors.body}
            className="textarea__form"
          ></Textarea>

          <Button disabled={isLoading} flexEnd submit>
            Edit Article
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditArticleModal;
