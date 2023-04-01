import { QUERY_ALL_GAME_TITLES } from "../../../utils/queries";
import ScrollLoadGames from "../../shared/ScrollLoadGames";

export default function AllGames() {
  return (
    <>
      <ScrollLoadGames query={QUERY_ALL_GAME_TITLES}/>
    </>
  );
}
