import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import GridContainer from "../../../components/gridContainer";
import OptionCard from "../../../components/optionCard";
import SectionTitle from "../../../components/sectionTitle";
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import useStore from "../../../state/store";
import Role from "../../../types/Role";
import { useRouter } from "next/router";
import Tooltip from "../../../components/tooltip";

const AdminDashboard: NextPage = () => {
  const router = useRouter();
  const links = useStore((state) => state.linksMenu)

  const getRenderedLinks = () => (
    links
      .filter((link) => link?.forRoles?.includes(Role.admin))
      .map((link, index) => (
        link.tooltip
          ? <Tooltip text={link.tooltip}>
            <OptionCard disabled={!link.enabled} key={`link-${index}`} icon={link.icon || faCircle} caption={link.name} onClick={() => router.push(link.href)}/>
          </Tooltip>
          : <OptionCard disabled={!link.enabled} key={`link-${index}`} icon={link.icon || faCircle} caption={link.name} onClick={() => router.push(link.href)}/>
      ))
  )
  
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

      <GridContainer>
        {getRenderedLinks()}
      </GridContainer>
    </Fragment>
  );
};

export default AdminDashboard;
