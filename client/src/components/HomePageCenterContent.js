import MainCenterContent from './MainCenterContent'

export default function HomePageCenterContent({ games }) {
  return (
    <div className="movie-items">
        <div className="container">
          <div className="row ipad-width">
            <MainCenterContent games={games} />
            {/* <MainRightContent /> */}
          </div>
        </div>
    </div>
  )
}