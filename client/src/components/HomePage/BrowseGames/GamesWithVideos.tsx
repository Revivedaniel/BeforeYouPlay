import { QUERY_GAMES_WITH_VIDEOS } from "../../../utils/queries";
import ScrollLoadGames from "../../shared/ScrollLoadGames";

export default function GamesWithVideos(): JSX.Element {
    return (
        <>
            <ScrollLoadGames query={QUERY_GAMES_WITH_VIDEOS}/>
        </>
    )
}