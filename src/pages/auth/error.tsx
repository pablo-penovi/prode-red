import type { NextPage } from "next";
import React, { Fragment } from "react";
import SectionTitle from "../../components/sectionTitle";

const ErrorPage: NextPage = () => {
  return (
    <Fragment>
      <SectionTitle
        title={'Error'}
        subtitle={'Usuario no autorizado'}
      />
    </Fragment>
  );
};

export default ErrorPage;
