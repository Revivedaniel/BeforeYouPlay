import styled from "styled-components";

const Container = styled.span`
  display: flex;
  height: inherit;
  align-items: center;
  span {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 52px;
    line-height: 61px;
    display: flex;
    align-items: center;
    text-align: center;
  }
  span[name="average-user-rating"] {
    width: 489px;
    height: 119px;
  }
`;

export default function AverageUserRating({averageUserRating = null}) {
    return (
        <Container>
            <span name="average-user-rating">Average User Rating</span>
            <span>{averageUserRating ? `${averageUserRating}/10` : "-"}</span>
          </Container>
    )
}