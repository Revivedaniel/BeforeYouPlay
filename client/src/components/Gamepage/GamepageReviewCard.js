export default function GamepageGameCard({ review }) {

  return (
    <div classname="mv-user-review-item">
      <div classname="user-infor">
        <img src="images/uploads/userava1.jpg" alt="" />
        <div>
          <div
            className="no-star"
            style={{ color: "#f5b50a", fontSize: "var(--font-color-light)" }}
          >
            {new Array(review.stars).fill(0).map((_, i) => {
              return i === review.stars -1 ? <i className="ion-android-star last" key={i}></i> : <i className="ion-android-star" key={i}></i>
            })}            
          </div>
          <p classname="time">
            by <a href="#"> {review.username}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
