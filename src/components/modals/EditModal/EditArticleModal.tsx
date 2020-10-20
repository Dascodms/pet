import '../../../assets/scss/modal.scss';

import React, { FC, useEffect } from 'react';
import { queryCache, useMutation } from 'react-query';

import Backdrop from '../../ui/Backdrop/Backdrop';
import Button from '../../ui/Button/Button';
import Error from '../../ui/Error/Error';
import FormGroup from '../../ui/FormGroup/FormGroup';
import Input from '../../ui/Input/Input';
import Modal from '../Modal/Modal';
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
}) => {
  const { register, handleSubmit, errors, reset } = useForm<PutType>({
    mode: 'onTouched',
  });

  const [mutate, { isLoading }] = useMutation(editArticle, {
    onSuccess() {
      queryCache.refetchQueries(['article', slug]);
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
      <Backdrop setShow={setShow} />
      <Modal>
        <VscClose
          onClick={() => setShow(false)}
          className="modal__close"
          color="red"
          size="1.2em"
          cursor="pointer"
        />
        <Title title="Edit Article"></Title>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <FormGroup className="form-group--edit-modal">
            <label>
              Title
              <Input
                register={register({
                  required: 'Required field',
                })}
                type="text"
                name="title"
                placeholder="Article title"
              />
            </label>
            {errors.title && (
              <Error style={{ top: '75px' }} error={errors.title} />
            )}
          </FormGroup>

          <FormGroup className="form-group--edit-modal">
            <label>
              Description
              <Input
                register={register({
                  required: 'Required field',
                })}
                type="text"
                name="description"
                placeholder="What's this article about?"
              />
            </label>
            {errors.description && (
              <Error style={{ top: '75px' }} error={errors.description} />
            )}
          </FormGroup>

          <FormGroup className="form-group--edit-modal">
            <label>
              Body
              <Textarea
                register={register({
                  required: 'Required field',
                })}
                name="body"
                placeholder="Write your article (in markdown)"
              ></Textarea>
            </label>

            {errors.body && (
              <Error style={{ top: '90px' }} error={errors.body} />
            )}
          </FormGroup>

          <Button disabled={isLoading} submit>
            Edit Article
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default EditArticleModal;
