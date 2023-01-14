import type { NextPage } from "next";
import Head from "next/head";
import { Fragment, RefObject } from "react";
import SectionTitle from "../../../components/sectionTitle";
import { trpc } from "../../../utils/trpc";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const AdminDashboard: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "motherfucker" }]);

  return (
    <Fragment>
      <Head>
        <title>Administración</title>
        <meta name="description" content="Dashboard de administración de Prode RED" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SectionTitle
        title={'Administración'}
        subtitle={'Gestioná equipos, ligas y cronograma de partidos'}
      />

      <div className="grid gap-8 my-3 px-6 text-center md:grid-cols-2">
        <TechnologyCard
          name="NextJS"
          description="The React framework for production"
          documentation="https://nextjs.org/"
        />
        <TechnologyCard
          name="TypeScript"
          description="Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale"
          documentation="https://www.typescriptlang.org/"
        />
        <TechnologyCard
          name="TailwindCSS"
          description="Rapidly build modern websites without ever leaving your HTML"
          documentation="https://tailwindcss.com/"
        />
        <TechnologyCard
          name="tRPC"
          description="End-to-end typesafe APIs made easy"
          documentation="https://trpc.io/"
        />
      </div>
      <div className="pt-6 text-2xl text-shallow-water-600 flex justify-center items-center w-full">
        {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
      </div>
    </Fragment>
  );
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="mt-3 text-sm underline text-matt-blue-700 decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};

export default AdminDashboard;
