import type { NextPage } from "next";
import React, { Fragment } from "react";
import LoginForm from "../../components/forms/loginForm";
import SectionTitle from "../../components/sectionTitle";
import Head from "next/head";

const Login: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>RED Prode - Inicio de sesión</title>
        <meta name="description" content="Página de inicio de sesión de RED Prode" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SectionTitle
        title={'Bienvenido a RED Prode'}
        subtitle={'Iniciá sesión'}
      />
      <LoginForm 
        testId={'login-form'}
      />
    </Fragment>
  );
};

export default Login;
