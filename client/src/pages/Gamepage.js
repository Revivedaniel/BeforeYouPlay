import { GameInfo } from "../components/GameInfo";
import { GameReviews } from "../components/GameReviews";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";

//import the query here
import { QUERY_SINGLE_GAME } from "../utils/queries";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function Gamepage() {
  const { slug } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_GAME, {
    variables: { slug: slug },
  });

  const game = data?.game || {};

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <MainContainer>
      <h1>This is the Gamepage</h1>
      <GameInfo game={game} />
      <GameReviews game={game} />
    </MainContainer>
  );
}
