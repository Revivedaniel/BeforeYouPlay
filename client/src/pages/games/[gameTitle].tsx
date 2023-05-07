import css from "./Gamepage.module.css";
import GameImage from "../../components/Gamepage/GameImage";
import Video from "../../components/Gamepage/Video";
import InfoTabs from "../../components/Gamepage/InfoTabs";
import { QUERY_SINGLE_GAME } from "../../utils/queries";
import { Game } from "@/components/Gamepage/Game.model";
import { createApolloClientSSR } from "@/lib/apolloClient";
import { GetServerSidePropsContext } from 'next';
import Head from "next/head";


interface VideoData {
  videoUrl: string;
}

interface QueryData {
  game: Game;
  video: VideoData;
  errors?: string
}

interface GamePageProps {
  game: Game;
  video: VideoData;
}

export default function Gamepage(props: GamePageProps): JSX.Element {
  // const router = useRouter();
  // const { gameTitle } = router.query as { gameTitle: string };
  // const [game, setGame] = useState<Game | null>(null);
  // const [video, setVideo] = useState<string | null>(props.video?.videoUrl || null);
  // const [loadingStatement, setLoadingStatement] = useState<string>("Loading...");
  // const { loading, data, error } = useQuery<QueryData>(QUERY_SINGLE_GAME, {
  //   variables: { title: gameTitle },
  //   onCompleted: (data) => {
  //     if (data?.errors) {
  //     } else {
  //       setGame(data.game);
  //       setVideo(data.video.videoUrl);
  //     }
  //   },
  // });

  

  // if (error) {
  //   return <FourOhFour />;
  // } else if (loading || props.game === null) {
  //   const timeout = setTimeout(() => {
  //     setLoadingStatement("Generating Game...");
  //   }, 5000);
  //   return (
  //     <div className={css.div}>
  //     <GameImage />
  //     <div className={css.mainContent}>
  //       <h1>{loadingStatement}</h1>
  //       <InfoTabs />
  //     </div>
  //   </div>
  //   );
  // }

  return (
    // <div className={css.div} style={{backgroundImage: `url(https://vgiapitest.blob.core.windows.net/game-images/${game.imageName}.webp)`}}>
    <>
    <Head>
      <title>{props.game.title} - Review, Platforms, and Details | Before You Play.</title>
      <meta name="description" content={`Learn everything about ${props.game.title}, including its storyline, gameplay, and reviews. Make an informed decision before you play, only at Before You Play.`} />
      <meta name="keywords" content={`${props.game.title}, video games, game reviews, game ratings, game recommendations, Before You Play`} />
      <meta property="og:title" content={`${props.game.title} - Review, Platforms, and Details | Before You Play.`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://www.beforeyouplay.info/games/${props.game.title}`} />
      <meta property="og:image" content={`https://vgiapitest.blob.core.windows.net/game-images/${props.game.imageName}.webp`} />
      <meta property="og:description" content={`Learn everything about ${props.game.title}, including its storyline, gameplay, and reviews. Make an informed decision before you play, only at Before You Play.`} />
    </Head>
    <div className={css.div}>
      <GameImage game={props.game} />
      <div className={css.mainContent}>
        <h1>{props.game.title}</h1>
        {props.video?.videoUrl && <Video video={props.video?.videoUrl} />}
        <InfoTabs game={props.game} />
      </div>
    </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const apolloClient = createApolloClientSSR();
  const { gameTitle } = context.query;
  const { data } = await apolloClient.query({
    query: QUERY_SINGLE_GAME,
    variables: { title: gameTitle }
  });
  console.log(data);

  return {
    props: {
      game: data.game,
      video: data.video,
    },
  };
}
