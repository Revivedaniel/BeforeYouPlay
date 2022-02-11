import MainCenterContent from './MainCenterContent'
import MainRightContent from './MainRightContent'

export default function HomePageCenterContent() {
  return (
    <div className="movie-items">
        <div className="container">
          <div className="row ipad-width">
            <MainCenterContent />
            <MainRightContent />
          </div>
        </div>
    </div>
  )
}