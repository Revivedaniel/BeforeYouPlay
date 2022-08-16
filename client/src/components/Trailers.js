export default function Trailers() {
  return (
    <div className="trailers">
        <div className="container">
          <div className="row ipad-width">
            <div className="col-md-12">
              <div className="title-hd">
                <h2>in theater</h2>
                <a href="/" onClick={function(e) { e.preventDefault();}} className="viewall">View all <i className="ion-ios-arrow-right"></i></a>
              </div>
              <div className="videos">
                <div className="slider-for-2 video-ft">
                  <div>
                    <iframe className="item-video" src="" data-src="https://www.youtube.com/embed/1Q8fG0TtVAY" title="1"></iframe>
                  </div>
                  <div>
                    <iframe className="item-video" src="" data-src="https://www.youtube.com/embed/w0qQkSuWOS8" title="2"></iframe>
                  </div>
                  <div>
                    <iframe className="item-video" src="" data-src="https://www.youtube.com/embed/44LdLqgOpjo" title="3"></iframe>
                  </div>
                  <div>
                    <iframe className="item-video" src="" data-src="https://www.youtube.com/embed/gbug3zTm3Ws" title="4"></iframe>
                  </div>
                  <div>
                    <iframe className="item-video" src="" data-src="https://www.youtube.com/embed/e3Nl_TCQXuw" title="5"></iframe>
                  </div>
                  <div>
                    <iframe className="item-video" src="" data-src="https://www.youtube.com/embed/NxhEZG0k9_w" title="6"></iframe>
                  </div>


                </div>
                <div className="slider-nav-2 thumb-ft">
                  <div className="item">
                    <div className="trailer-img">
                      <img src="images/uploads/trailer7.jpg" alt="trailer7" width="4096" height="2737" />
                    </div>
                    <div className="trailer-infor">
                      <h4 className="desc">Wonder Woman</h4>
                      <p>2:30</p>
                    </div>
                  </div>
                  <div className="item">
                    <div className="trailer-img">
                      <img src="images/uploads/trailer2.jpg" alt="trailer2" width="350" height="200" />
                    </div>
                    <div className="trailer-infor">
                      <h4 className="desc">Oblivion: Official Teaser Trailer</h4>
                      <p>2:37</p>
                    </div>
                  </div>
                  <div className="item">
                    <div className="trailer-img">
                      <img src="images/uploads/trailer6.jpg" alt="trailer6" />
                    </div>
                    <div className="trailer-infor">
                      <h4 className="desc">Exclusive Interview:  Skull Island</h4>
                      <p>2:44</p>
                    </div>
                  </div>
                  <div className="item">
                    <div className="trailer-img">
                      <img src="images/uploads/trailer3.png" alt="trailer3" width="100" height="56" />
                    </div>
                    <div className="trailer-infor">
                      <h4 className="desc">Logan: Director James Mangold Interview</h4>
                      <p>2:43</p>
                    </div>
                  </div>
                  <div className="item">
                    <div className="trailer-img">
                      <img src="images/uploads/trailer4.png" alt="trailer4" width="100" height="56" />
                    </div>
                    <div className="trailer-infor">
                      <h4 className="desc">Beauty and the Beast: Official Teaser Trailer 2</h4>
                      <p>2: 32</p>
                    </div>
                  </div>
                  <div className="item">
                    <div className="trailer-img">
                      <img src="images/uploads/trailer5.jpg" alt="trailer5" width="360" height="189" />
                    </div>
                    <div className="trailer-infor">
                      <h4 className="desc">Fast&Furious 8</h4>
                      <p>3:11</p>
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