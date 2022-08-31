import MovieSlider from "../components/MovieSlider";
import HomePageCenterContent from "../components/HomePageCenterContent";
export default function Homepage({ games, gameTitle, setGameTitle }) {
  return (
    <>
      {/* <Loading /> */}
      {/* <Login />
      <SignUp /> */}
      <MovieSlider games={games} setGameTitle={setGameTitle} />
      <HomePageCenterContent games={games} />
      {/* <Trailers />
      <LatestNews /> */}
    </>
  );
}
