import type { NextPage } from "next";
import React, { Fragment } from "react";
import LoginForm from "../../../components/forms/loginForm";
import SectionTitle from "../../../components/sectionTitle";

const Home: NextPage = () => {
  return (
    <Fragment>
      <SectionTitle
        title={'Bienvenido a Prode RED'}
        subtitle={'Iniciá sesión o abrí una nueva cuenta'}
      />
      <LoginForm 
        testId={'login-form'}
      />
    </Fragment>
  );
};

export default Home;
