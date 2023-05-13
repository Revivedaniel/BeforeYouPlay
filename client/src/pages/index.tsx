import BrowseGames from "../components/HomePage/BrowseGames/BrowseGames";
import FeaturedGame from "../components/HomePage/FeaturesGame";
import css from "./Homepage.module.css";
import { QUERY_FEATURED_GAME } from "../utils/queries";
import { createApolloClientSSR } from "@/lib/apolloClient";
import Head from "next/head";

interface HomeProps {
  featuredGame: {
    title: string;
    imageName: string;
    shortDescription: string;
  };
}

export default function Home(props: HomeProps): JSX.Element {
  return (
    <>
    <Head>
      <title>Before You Play: Discover, Search & Get Game Recommendations.</title>
      <meta name="description" content="Explore Before You Play to discover new games, search your favorites, and get personalized game recommendations. Find all the information you need before you play!" />
      <meta name="keywords" content="video games, game reviews, game ratings, game recommendations, Before You Play" />
      <meta property="og:title" content="Before You Play: Discover, Search & Get Game Recommendations." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.beforeyouplay.info" />
      <meta property="og:image" content="https://vgiapitest.blob.core.windows.net/game-images/logo1.webp" />
      <meta property="og:description" content="Explore Before You Play to discover new games, search your favorites, and get personalized game recommendations. Find all the information you need before you play!" />
    </Head>
      <div className={css.div}>
        <FeaturedGame featuredGame={props.featuredGame} />
        <BrowseGames />
      </div>
    </>
  );
}
 
// This function gets called at build time
// The homepage will revalidate every 24 hours
export async function getStaticProps() {
  const apolloClient = createApolloClientSSR();

  const { data } = await apolloClient.query({
    query: QUERY_FEATURED_GAME,
  });

  return {
    props: {
      featuredGame: data.featuredGame,
    },
    revalidate: 186400,
  };
}