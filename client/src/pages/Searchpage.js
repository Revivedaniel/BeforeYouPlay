import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GameList } from "../components/GameList";
import Pagination from "../components/Pagination";
import { perPage } from "../config";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { QUERY_SEARCH_GAME } from "../utils/queries";
import SearchCard from "../components/partials/SearchCard";
import FourOhFour from "../components/404.js";

const SearchPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 2rem;
    margin-top: 2rem;
  }
`;

export function Searchpage() {
  // Get the pathname from router
  const location = useLocation();
  // Get search and page from the pathname
  let { search, page } = useParams();
  if (page === undefined) {
    page = 1;
  } else {
    page = parseInt(page);
  }
  const { loading, data, error } = useQuery(QUERY_SEARCH_GAME, {
    variables: { search: search, page: page },
  });
  const { games, count } = data?.searchGame || { games: [], count: 1 };

  if (error) {
    return <FourOhFour />;
  }

  return loading ? (
    <>
      <div className="hero common-hero">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="hero-ct">
                <h1> Search Results - {search}</h1>
                <ul className="breadcumb">
                  <li className="active">
                    <a href="/">Home</a>
                  </li>
                  <li>
                    {" "}
                    <span className="ion-ios-arrow-right"></span> Search{" "}
                    {search}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "600px" }} className="page-single movie_list">
        <div className="container">
          <div className="row ipad-width2">
            <div className="col-md-8 col-sm-12 col-xs-12">
              <h1 style={{ color: "white" }}>Loading...</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="hero common-hero">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="hero-ct">
                <h1> Search Results - {search}</h1>
                <ul className="breadcumb">
                  <li className="active">
                    <a href="/">Home</a>
                  </li>
                  <li>
                    {" "}
                    <span className="ion-ios-arrow-right"></span> Search{" "}
                    {search}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-single movie_list">
        <div className="container">
          <div className="row ipad-width2">
            <div className="col-md-8 col-sm-12 col-xs-12">
              <Pagination
                page={page}
                count={count}
                route={`/search/${search}`}
              />
              {games?.map((game, i) => {
                return <SearchCard game={game} key={i} />;
              })}
              {games?.length === 0 ? (
                <h2
                  style={{
                    marginBottom: "30px",
                    fontFamily: "'Dosis', sans-serif",
                    fontSize: "36px",
                    color: "#ffffff",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    marginLeft: "100px"
                  }}
                >
                  No results found for {search}
                </h2>
              ) : null}
              <Pagination
                page={page}
                count={count}
                route={`/search/${search}`}
              />
            </div>

            {/* <div className="col-md-4 col-sm-12 col-xs-12">
              <div className="sidebar">
                <div className="searh-form">
                  <h4 className="sb-title">Search for movie</h4>
                  <form className="form-style-1" action="#">
                    <div className="row">
                      <div className="col-md-12 form-it">
                        <label>Movie name</label>
                        <input type="text" placeholder="Enter keywords" />
                      </div>
                      <div className="col-md-12 form-it">
                        <label>Genres & Subgenres</label>
                        <div className="group-ip">
                          <select
                            name="skills"
                            multiple=""
                            className="ui fluid dropdown"
                          >
                            <option value="">Enter to filter genres</option>
                            <option value="Action1">Action 1</option>
                            <option value="Action2">Action 2</option>
                            <option value="Action3">Action 3</option>
                            <option value="Action4">Action 4</option>
                            <option value="Action5">Action 5</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-12 form-it">
                        <label>Rating Range</label>

                        <select>
                          <option value="range">
                            -- Select the rating range below --
                          </option>
                          <option value="saab">
                            -- Select the rating range below --
                          </option>
                          <option value="saab">
                            -- Select the rating range below --
                          </option>
                          <option value="saab">
                            -- Select the rating range below --
                          </option>
                        </select>
                      </div>
                      <div className="col-md-12 form-it">
                        <label>Release Year</label>
                        <div className="row">
                          <div className="col-md-6">
                            <select>
                              <option value="range">From</option>
                              <option value="number">10</option>
                              <option value="number">20</option>
                              <option value="number">30</option>
                            </select>
                          </div>
                          <div className="col-md-6">
                            <select>
                              <option value="range">To</option>
                              <option value="number">20</option>
                              <option value="number">30</option>
                              <option value="number">40</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <input
                          className="submit"
                          type="submit"
                          value="submit"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="ads">
                  <img src="images/uploads/ads1.png" alt="" />
                </div>
                <div className="sb-facebook sb-it">
                  <h4 className="sb-title">Find us on Facebook</h4>
                  <iframe
                    src=""
                    data-src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fhaintheme%2F%3Ffref%3Dts&tabs=timeline&width=340&height=315px&small_header=true&adapt_container_width=false&hide_cover=false&show_facepile=true&appId"
                    height="315"
                    style={{
                      width: "100%",
                      border: "none",
                      overflow: "hidden",
                    }}
                  ></iframe>
                </div>
                <div className="sb-twitter sb-it">
                  <h4 className="sb-title">Tweet to us</h4>
                  <div className="slick-tw">
                    <div className="tweet item" id="599202861751410688"></div>
                    <div className="tweet item" id="297462728598122498"></div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
