import React, { FormEvent, Fragment } from 'react';
import { Regex } from '../../constants/enums';
import WithForm, { WithFormProps } from '../../hoc/withForm';
import Button from '../button';
import FormButtonContainer from './formButtonContainer';
import Form from './form';
import TextInput from './formTextInput';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { trpc } from '../../utils/trpc';
import ToastType from '../../types/ToastType';
import useStore from '../../state/store';

const DEFAULT_TEST_ID = 'user-profile-form';

type UserProfileFormProps = {
  testId?: string,
  csrfToken?: string,
}

const UserProfileForm = ({
  testId,
  form,
  csrfToken,
}: UserProfileFormProps & WithFormProps) => {
  const { data: session } = useSession()
  const pushToast = useStore((state) => state.pushToast)

  // const setDni = trpc.useMutation('user.setDni', {
  //   onSuccess: () => pushToast({
  //     title: 'Actualización de datos',
  //     text: 'DNI actualizado con éxito',
  //     type: ToastType.success
  //   }),
  //   onError: (error) => pushToast({
  //     title: 'Actualización de datos',
  //     text: error?.message || 'Error al actualizar DNI',
  //     type: ToastType.error
  //   })
  // })

  const fadeDuration = 250;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // setDni.mutate({id: session?.user?.id || '', dni: form.valueOf('dni')})
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
          testId={testId || DEFAULT_TEST_ID}
          onSubmit={submit}
          onReset={form.reset}
          isCard={false}
        >
          <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
          <Fade bottom duration={fadeDuration} delay={150}>
            <TextInput 
              label={'DNI'}
              name={'dni'}
              placeholder={'Ingresá tu DNI sin puntos ni espacios'}
              form={form}
              regexList={[Regex.dni]}
              required={true}
              testId={'dni-textinput'}
              
            />
          </Fade>
          <Fade bottom duration={fadeDuration} delay={250}>
            <FormButtonContainer
              testId={'button-container'}
            >
              <Button 
                label={'Guardar cambios'}
                type={'submit'}
                disabled={form.isSubmitDisabled()}
              />
            </FormButtonContainer>
          </Fade>
        </Form>
      </Zoom>
    </Fragment>
  );
};

export default WithForm(UserProfileForm);
