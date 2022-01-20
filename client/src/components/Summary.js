import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Summary({ summary = "" }) {
  const [maxHeight, setMaxHeight] = useState("200px");
  const [extended, setExtended] = useState(false);

  const toggleSummary = (event) => {
    if (extended) {
      setMaxHeight("200px");
      setExtended(false);
    } else {
      setMaxHeight("1000px");
      setExtended(true);
    }
  };
  return (
    <>
      <Container
        name={summary.length > 950 && !extended ? "longSummary" : "summary"}
        style={{ maxHeight: maxHeight }}
        onClick={toggleSummary}
        data-extended={extended}
      >
        {summary}
      </Container>
      <span>Read More</span>
    </>
  );
}
const Container = styled.div`
  &[data-extended="true"] {
    mask-image: "";
    cursor: pointer;
  }
  &[name="longSummary"] {
    mask-image: linear-gradient(180deg, #000 60%, transparent);
    cursor: pointer;
  }
  width: 100%;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 23px;
  line-height: 27px;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
`;
