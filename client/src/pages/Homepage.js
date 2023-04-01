import { useNavigate } from "react-router-dom";
import BrowseGames from "../components/HomePage/BrowseGames/BrowseGames";
import FeaturedGame from "../components/HomePage/FeaturesGame";
import css from "./Homepage.module.css";

export default function Homepage() {
  // const handleNextPage = () => {
  //   fetchMore({
  //     variables: { page: data.games.page + 1 },
  //     updateQuery: (prevResult, { fetchMoreResult }) => {
  //       return {
  //         games: {
  //           ...fetchMoreResult.games,
  //           games: [...prevResult.games.games, ...fetchMoreResult.games.games],
  //         },
  //       };
  //     },
  //   });
  // };

  return (
    <div className={css.div}>
      <FeaturedGame />
      <BrowseGames />
    </div>
  );
}
