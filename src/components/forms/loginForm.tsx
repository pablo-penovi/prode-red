import React, { FormEvent } from 'react';
import { Regex } from '../../constants/enums';
import WithForm, { WithFormProps } from '../../hoc/withForm';
import Button from '../button';
import FormButtonContainer from './formButtonContainer';
import Form from './form';
import TextInput from './formTextInput';
import { ClientSafeProvider, getCsrfToken, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

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

  const submit = (event: FormEvent<HTMLFormElement>) => {
    signIn('emailProvider')
  }

  return (
    <Form
      method={'POST'}
      testId={testId || DEFAULT_TEST_ID}
      onSubmit={submit}
      onReset={form.reset}
      isCard={true}
    >
      <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
      <TextInput 
        label={'Email'}
        name={'email'}
        placeholder={'Escribí tu mail'}
        field={form.get('email')}
        onChange={form.onChange}
        regexList={[Regex.email]}
        required={true}
        registerField={form.registerField}
        testId={'email-textinput'}
      />
      <TextInput 
        label={'Contraseña'}
        name={'password'}
        placeholder={'Escribí tu contraseña'}
        field={form.get('password')}
        onChange={form.onChange}
        required={true}
        masked={true}
        registerField={form.registerField}
        testId={'password-textinput'}
      />
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
      <div className="flex justify-center mt-6 text-sm">
        <span><a href='/register'>Abrir una nueva cuenta</a></span>
      </div>
    </Form>
  );
};

export default WithForm(LoginForm);