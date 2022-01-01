import { Fragment } from "react";

import { BLOCCHI_TESTO_IMMAGINE, SLIDER } from "../graphql/queries/index";

import BloccoTestoImmagine from "../components/landing/blocco-testo-immagine";
import Slider from "../components/landing/slider";
import RegisterLoginForm from "../components/landing/form";

import { queryClient } from "../apollo/utils";

export default function Home({ blocksData, sliderData, isLoggedIn }) {
  return isLoggedIn ? (
    <Fragment>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
      <h2>ciao</h2>
    </Fragment>
  ) : (
    <Fragment>
      <BloccoTestoImmagine data={blocksData[0]} />
      <Slider
        topColor={blocksData[0].backgroundColor}
        bottomColor={blocksData[1].backgroundColor}
        data={sliderData}
      />
      <BloccoTestoImmagine data={blocksData[1]} />
      <RegisterLoginForm />
    </Fragment>
  );
}

export async function getStaticProps() {
  const blocksData = await queryClient({ query: BLOCCHI_TESTO_IMMAGINE });
  const sliderData = await queryClient({ query: SLIDER });

  return {
    props: {
      blocksData: blocksData.data.landing.data.attributes.blocchiTestoImmagine,
      sliderData: sliderData.data.landing.data.attributes.slider,
    },
  };
}
