export default function GamepageShareButtons() {
  return (
    <div class="social-btn">
      <a href="/" onClick={function(e) { e.preventDefault();}} class="parent-btn">
        {/* <i class="ion-heart"></i> Add to Favorite */}
      </a>
      <div class="">
        <a href="/" onClick={function(e) { e.preventDefault();}} class="parent-btn">
          {/* <i class="ion-android-share-alt"></i>share */}
        </a>
        <div class="hvr-item">
          <a href="/" onClick={function(e) { e.preventDefault();}} class="hvr-grow">
            {/* <i class="ion-social-facebook"></i> */}
          </a>
          <a href="/" onClick={function(e) { e.preventDefault();}} class="hvr-grow">
            {/* <i class="ion-social-twitter"></i> */}
          </a>
          <a href="/" onClick={function(e) { e.preventDefault();}} class="hvr-grow">
            {/* <i class="ion-social-googleplus"></i> */}
          </a>
          <a href="/" onClick={function(e) { e.preventDefault();}} class="hvr-grow">
            {/* <i class="ion-social-youtube"></i> */}
          </a>
        </div>
      </div>
    </div>
  );
}
