import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import useStore from "../../state/store";
import ToastType from "../../types/ToastType";
import SectionTitle from "../../components/sectionTitle";
import UserProfileForm from "../../components/forms/userProfileForm";

const Profile: NextPage = () => {
  const { data: session, status } = useSession()
  const pushToast = useStore((state) => state.pushToast)

  const setDni = trpc.useMutation('user.setDni', {
    onSuccess: () => pushToast({
      title: 'Actualización de datos',
      text: 'DNI actualizado con éxito',
      type: ToastType.success
    }),
    onError: (error) => pushToast({
      title: 'Actualización de datos',
      text: error?.message || 'Error al actualizar DNI',
      type: ToastType.error
    })
  })

  return (
    <>
      <Head>
        <title>RED Prode - Perfil</title>
        <meta name="description" content="Opciones relativas al perfil del usuario" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        <SectionTitle
          title={'Perfil de usuario'}
          subtitle={'Configurá tu perfil'}
        />
        <UserProfileForm />
      </main>
    </>
  );
};

export default Profile;
