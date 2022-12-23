import type { NextPage } from "next";
import React, { Fragment } from "react";
import RegisterForm from "../../components/forms/registerForm";
import SectionTitle from "../../components/sectionTitle";

const Register: NextPage = () => {
  return (
    <Fragment>
      <SectionTitle
        title={'Bienvenido a Prode RED'}
        subtitle={'Abrí una cuenta para jugar'}
      />
      <RegisterForm 
        testId={'login-form'}
      />
    </Fragment>
  );
};

export default Register;
