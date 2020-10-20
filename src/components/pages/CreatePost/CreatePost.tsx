import Button from '../../ui/Button/Button';
import Container from '../../ui/Container/Container';
import Error from '../../ui/Error/Error';
import FormGroup from '../../ui/FormGroup/FormGroup';
import Input from '../../ui/Input/Input';
import React from 'react';
import Textarea from '../../ui/Textarea/Textarea';
import Title from '../../ui/Title/Title';
import { createArticle } from '../../../services/articleService/articleService';
import { createPostType } from './CreatePost.type';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';

const CreatePost: React.FC = () => {
  const { register, handleSubmit, errors, reset } = useForm<createPostType>({
    mode: 'onTouched',
  });

  const history = useHistory();

  const [mutate, { isLoading }] = useMutation(createArticle, {
    onSuccess(response) {
      history.push(`/article/${response.slug}`);
    },
    onError(e) {
      console.log(e);
    },
  });

  const onSubmit = (data: createPostType): void => {
    if (data.tagList) {
      data.tagList = (data.tagList as string).split(' ');
    }
    mutate(data);
    reset();
  };

  return (
    <Container className="container__form">
      <Title title="Create Post" />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Input
            register={register({
              required: 'Required field',
            })}
            type="text"
            name="title"
            placeholder="Article title"
          />
          {errors.title && <Error error={errors.title} />}
        </FormGroup>

        <FormGroup>
          <Input
            register={register({
              required: 'Required field',
            })}
            type="text"
            name="description"
            placeholder="What's this article about?"
          />
          {errors.description && <Error error={errors.description} />}
        </FormGroup>

        <FormGroup>
          <Textarea
            register={register({
              required: 'Required field',
            })}
            name="body"
            placeholder="Write your article (in markdown)"
          ></Textarea>
          {errors.body && <Error style={{ top: '75px' }} error={errors.body} />}
        </FormGroup>

        <FormGroup>
          <Input
            register={register()}
            type="text"
            name="tagList"
            placeholder="Enter tags"
          />
        </FormGroup>
        <Button disabled={isLoading} submit>
          Create Post
        </Button>
      </form>
    </Container>
  );
};

export default CreatePost;
