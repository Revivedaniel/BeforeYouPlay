export default function LatestNews() {
  return (
    <div className="latestnew">
        <div className="container">
          <div className="row ipad-width">
            <div className="col-md-8">
              <div className="ads">
                <img src="images/uploads/ads2.png" alt="" width="728" height="106" />
              </div>
              <div className="title-hd">
                <h2>Latest news</h2>
              </div>
              <div className="tabs">
                <ul className="tab-links-3">
                  <li className="active"><a href="#tab31">#Movies </a></li>
                  <li><a href="#tab32"> #TV Shows </a></li>
                  <li><a href="#tab33">  # Celebs</a></li>
                </ul>
                <div className="tab-content">
                  <div id="tab31" className="tab active">
                    <div className="row">
                      <div className="blog-item-style-1">
                        <img src="images/uploads/blog-it1.jpg" alt="" width="170" height="250" />
                        <div class="blog-it-infor">
                          <h3><a href="/" onClick={function(e) { e.preventDefault();}}>Brie Larson to play first female white house candidate Victoria Woodull in Amazon film</a></h3>
                          <span class="time">13 hours ago</span>
                          <p>Exclusive: <span>Amazon Studios </span>has acquired Victoria Woodhull, with Oscar winning Room star <span>Brie Larson</span> polsed to produce, and play the first female candidate for the presidency of the United States.Amazon bought it in a pitch package deal.<span> Ben Kopit</span>, who wrote the Warner Bros film <span>Libertine</span> that has...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="tab32" className="tab">
                    <div className="row">
                      <div className="blog-item-style-1">
                        <img src="images/uploads/blog-it2.jpg" alt="" width="170" height="250" />
                        <div class="blog-it-infor">
                          <h3><a href="/" onClick={function(e) { e.preventDefault();}}>Tab 2</a></h3>
                          <span class="time">13 hours ago</span>
                          <p>Exclusive: <span>Amazon Studios </span>has acquired Victoria Woodhull, with Oscar winning Room star <span>Brie Larson</span> polsed to produce, and play the first female candidate for the presidency of the United States.Amazon bought it in a pitch package deal.<span> Ben Kopit</span>, who wrote the Warner Bros film <span>Libertine</span> that has...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="tab33" className="tab">
                    <div className="row">
                      <div className="blog-item-style-1">
                        <img src="images/uploads/blog-it1.jpg" alt="" width="170" height="250" />
                        <div class="blog-it-infor">
                          <h3><a href="/" onClick={function(e) { e.preventDefault();}}>Tab 3</a></h3>
                          <span class="time">13 hours ago</span>
                          <p>Exclusive: <span>Amazon Studios </span>has acquired Victoria Woodhull, with Oscar winning Room star <span>Brie Larson</span> polsed to produce, and play the first female candidate for the presidency of the United States.Amazon bought it in a pitch package deal.<span> Ben Kopit</span>, who wrote the Warner Bros film <span>Libertine</span> that has...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="morenew">
                <div className="title-hd">
                  <h3>More news on Blockbuster</h3>
                  <a href="/" onClick={function(e) { e.preventDefault();}} className="viewall">See all Movies news<i className="ion-ios-arrow-right"></i></a>
                </div>
                <div className="more-items">
                  <div className="left">
                    <div className="more-it">
                      <h6><a href="/" onClick={function(e) { e.preventDefault();}}>Michael Shannon Frontrunner to play Cable in “Deadpool 2”</a></h6>
                      <span className="time">13 hours ago</span>
                    </div>
                    <div className="more-it">
                      <h6><a href="/" onClick={function(e) { e.preventDefault();}}>French cannibal horror “Raw” inspires L.A. theater to hand out “Barf Bags”</a></h6>

                      <span className="time">13 hours ago</span>
                    </div>
                  </div>
                  <div className="right">
                    <div className="more-it">
                      <h6><a href="/" onClick={function(e) { e.preventDefault();}}>Laura Dern in talks to join Justin Kelly’s biopic “JT Leroy”</a></h6>
                      <span className="time">13 hours ago</span>
                    </div>
                    <div className="more-it">
                      <h6><a href="/" onClick={function(e) { e.preventDefault();}}>China punishes more than 300 cinemas for box office cheating</a></h6>
                      <span className="time">13 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="sidebar">
                <div className="sb-facebook sb-it">
                  <h4 className="sb-title">Find us on Facebook</h4>
                  <iframe title = "facebookIframe" src="" data-src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fhaintheme%2F%3Ffref%3Dts&tabs=timeline&width=300&height=315px&small_header=true&adapt_container_width=false&hide_cover=false&show_facepile=true&appId" width="300" height="315" style={{ border: "none", overflow: "hidden" }} ></iframe>
                </div>
                <div className="sb-twitter sb-it">
                  <h4 className="sb-title">Tweet to us</h4>
                  <div className="slick-tw">
                    <div className="tweet item" id="599202861751410688">
                    </div>
                    <div className="tweet item" id="297462728598122498">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}