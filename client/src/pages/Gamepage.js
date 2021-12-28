import { GameInfo } from "../components/GameInfo";
import { GameReviews } from "../components/GameReviews";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

//import the query here
import { QUERY_SINGLE_GAME } from "../utils/queries";

export function Gamepage() {
  const { slug } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_GAME, {
    variables: { slug: slug },
  });

  const game = data?.game || {};

  if(loading) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <h1>This is the Gamepage</h1>
      <GameInfo game={game}/>
      <GameReviews game={game}/>
    </>
  );
}
