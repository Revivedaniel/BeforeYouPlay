import MainCenterContent from './MainCenterContent'
import MainRightContent from './MainRightContent'

export default function HomePageCenterContent({ games }) {
  return (
    <div className="movie-items">
        <div className="container">
          <div className="row ipad-width">
            <MainCenterContent games={games} />
            <MainRightContent />
          </div>
        </div>
    </div>
  )
}