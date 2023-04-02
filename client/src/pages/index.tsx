import BrowseGames from "../components/HomePage/BrowseGames/BrowseGames";
import FeaturedGame from "../components/HomePage/FeaturesGame";
import css from "./Homepage.module.css";

export default function Home() {
  return (
    <>
      <div className={css.div}>
        <FeaturedGame />
        <BrowseGames />
      </div>
    </>
  );
}
