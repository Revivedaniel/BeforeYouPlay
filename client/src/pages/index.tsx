import BrowseGames from "../components/HomePage/BrowseGames/BrowseGames";
import FeaturedGame from "../components/HomePage/FeaturesGame";
import css from "./Homepage.module.css";
import { QUERY_FEATURED_GAME } from "../utils/queries";
import { createApolloClientSSR } from "@/lib/apolloClient";

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
      <div className={css.div}>
        <FeaturedGame featuredGame={props.featuredGame} />
        <BrowseGames />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const apolloClient = createApolloClientSSR();

  const { data } = await apolloClient.query({
    query: QUERY_FEATURED_GAME,
  });
  console.log(data);

  return {
    props: {
      featuredGame: data.featuredGame,
    },
  };
}