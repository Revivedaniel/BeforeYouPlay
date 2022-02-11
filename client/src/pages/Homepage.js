import Login from '../components/Login'
import SignUp from '../components/SignUp'
import MovieSlider from '../components/MovieSlider'
import HomePageCenterContent from '../components/HomePageCenterContent'
import Trailers from '../components/Trailers'
import LatestNews from '../components/LatestNews'
import Loading from '../components/Loading'

export default function Homepage({ games }) {
  return (
    <>
      {/* <Loading /> */}
      <Login />
      <SignUp />
      <MovieSlider games={games} />
      <HomePageCenterContent />
      <Trailers />
      <LatestNews />
    </>
  );
}
