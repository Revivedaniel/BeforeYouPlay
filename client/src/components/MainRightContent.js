export default function MainRightContent() {
  return (
    <div className="col-md-4">
              <div className="sidebar">
                <div className="ads">
                  <img src="images/uploads/ads1.png" alt="" width="336" height="296" />
                </div>
                <div className="celebrities">
                  <h4 className="sb-title">Spotlight Celebrities</h4>
                  <div className="celeb-item">
                    <a href="/" onClick={function(e) { e.preventDefault();}}><img src="images/uploads/ava1.jpg" alt="" width="70" height="70" /></a>
                    <div className="celeb-author">
                      <h6><a href="/" onClick={function(e) { e.preventDefault();}}>Samuel N. Jack</a></h6>
                      <span>Actor</span>
                    </div>
                  </div>
                  <div className="celeb-item">
                    <a href="/" onClick={function(e) { e.preventDefault();}}><img src="images/uploads/ava2.jpg" alt="" width="70" height="70" /></a>
                    <div className="celeb-author">
                      <h6><a href="/" onClick={function(e) { e.preventDefault();}}>Benjamin Carroll</a></h6>
                      <span>Actor</span>
                    </div>
                  </div>
                  <div className="celeb-item">
                    <a href="/" onClick={function(e) { e.preventDefault();}}><img src="images/uploads/ava3.jpg" alt="" width="70" height="70" /></a>
                    <div className="celeb-author">
                      <h6><a href="/" onClick={function(e) { e.preventDefault();}}>Beverly Griffin</a></h6>
                      <span>Actor</span>
                    </div>
                  </div>
                  <div className="celeb-item">
                    <a href="/" onClick={function(e) { e.preventDefault();}}><img src="images/uploads/ava4.jpg" alt="" width="70" height="70" /></a>
                    <div className="celeb-author">
                      <h6><a href="/" onClick={function(e) { e.preventDefault();}}>Justin Weaver</a></h6>
                      <span>Actor</span>
                    </div>
                  </div>
                  <a href="/" onClick={function(e) { e.preventDefault();}} className="btn">See all celebrities<i className="ion-ios-arrow-right"></i></a>
                </div>
              </div>
            </div>
  )
}