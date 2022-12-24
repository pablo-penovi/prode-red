import React, { FormEvent, Fragment, MouseEvent } from 'react';
import { Regex } from '../../constants/enums';
import WithForm, { WithFormProps } from '../../hoc/withForm';
import Button from '../button';
import FormButtonContainer from './formButtonContainer';
import Form from './form';
import TextInput from './formTextInput';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';

const DEFAULT_TEST_ID = 'login-form';

type LoginFormProps = {
  testId: string,
  csrfToken?: string,
}

const LoginForm = ({
  testId,
  form,
  csrfToken,
}: LoginFormProps & WithFormProps) => {

  const fadeDuration = 250;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signIn('discord')
  }

  const loginWithGoogle = (event: MouseEvent<HTMLButtonElement>) => {
    signIn('google')
  }

  const loginWithDiscord = (event: MouseEvent<HTMLButtonElement>) => {
    signIn('discord')
  }

  return (
    <Fragment>
      <Head>
        <title>Inicio de sesión</title>
        <meta name="description" content="Página de inicio de sesión de Prode RED" />
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
              testId={'password-textinput'}
            />
          </Fade>
          <Fade bottom duration={fadeDuration} delay={250}>
            <FormButtonContainer
              testId={'button-container'}
            >
              <Button 
                label={'Vaciar'}
                type={'reset'}
                disabled={!form.isDirty()}
              />
              <Button 
                label={'Iniciar sesión'}
                type={'submit'}
                disabled={form.isSubmitDisabled()}
              />
            </FormButtonContainer>
          </Fade>
          <Fade bottom duration={fadeDuration} delay={300}>
            <div className="flex justify-center mt-6 text-sm">
              <span><Link href='/auth/register'>Abrir una nueva cuenta</Link></span>
            </div>
            <Button 
              label={'Iniciar sesión con Google'}
              onClick={loginWithGoogle}
            />
            <Button 
              label={'Iniciar sesión con Discord'}
              onClick={loginWithDiscord}
            />
          </Fade>
        </Form>
      </Zoom>
    </Fragment>
  );
};

export default WithForm(LoginForm);