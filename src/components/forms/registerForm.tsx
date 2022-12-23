import React, { FormEvent, Fragment, ReactElement, useEffect, useRef, useState } from 'react';
import { Regex } from '../../constants/enums';
import WithForm, { Field, WithFormProps } from '../../hoc/withForm';
import Button from '../button';
import FormButtonContainer from './formButtonContainer';
import Form from './form';
import TextInput from './formTextInput';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { ClientSafeProvider, getCsrfToken, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import Head from 'next/head';
import Link from 'next/link';

const DEFAULT_TEST_ID = 'login-form';

type RegisterFormProps = {
  testId: string,
  csrfToken?: string,
}

const RegisterForm = ({
  testId,
  form,
  csrfToken,
}: RegisterFormProps & WithFormProps) => {

  const fadeDuration = 250;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    signIn('emailProvider')
  }

  return (
    <Fragment>
      <Head>
        <title>Alta de usuario</title>
        <meta name="description" content="Página de alta de usuarios de Prode RED" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Zoom delay={100} duration={fadeDuration}>
        <Form
          method={'POST'}
          testId={testId || DEFAULT_TEST_ID}
          onSubmit={submit}
          onReset={form.reset}
          isCard={true}
        >
          <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
          <Fade bottom duration={fadeDuration} delay={150}>
            <TextInput 
              label={'Email'}
              name={'email'}
              placeholder={'Escribí tu mail'}
              form={form}
              regexList={[Regex.email]}
              required={true}
              testId={'email-textinput'}
              
            />
          </Fade>
          <Fade bottom duration={fadeDuration} delay={200}>
            <TextInput 
              label={'Contraseña'}
              name={'password'}
              type={'password'}
              placeholder={'Escribí tu contraseña'}
              form={form}
              required={true}
              matchesFields={['passwordConfirm']}
              testId={'password-textinput'}
            />
          </Fade>
          <Fade bottom duration={fadeDuration} delay={250}>
            <TextInput 
              label={'Confirmar contraseña'}
              name={'passwordConfirm'}
              type={'password'}
              placeholder={'Volvé a escribir tu contraseña'}
              form={form}
              required={true}
              matchesFields={['password']}
              testId={'password-confirm-textinput'}
            />
          </Fade>
          <Fade bottom duration={fadeDuration} delay={300}>
            <FormButtonContainer
              testId={'button-container'}
            >
              <Button 
                label={'Vaciar'}
                type={'reset'}
                disabled={!form.isDirty()}
              />
              <Button 
                label={'Abrir cuenta'}
                type={'submit'}
                disabled={form.isSubmitDisabled()}
              />
            </FormButtonContainer>
          </Fade>
          <Fade bottom duration={fadeDuration} delay={300}>
            <div className="flex justify-center mt-6 text-sm">
              <span><Link href='/auth/login'>Ya tengo una cuenta</Link></span>
            </div>
          </Fade>
        </Form>
      </Zoom>
    </Fragment>
  );
};

export default WithForm(RegisterForm);