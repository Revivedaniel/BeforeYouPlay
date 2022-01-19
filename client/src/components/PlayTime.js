import styled from "styled-components";

const Container = styled.div`
  width: 333px;
  height: 232px;
  display: flex;
  flex-direction: column;
  div {
    height: 33.33%;
    font-size: 36px;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid black;
    span {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 36px;
      display: flex;
      align-items: center;
      text-align: center;
    }
  }
`;
export default function PlayTime({ playTime }) {
  return (
    <Container>
      <div>
        <span>Main Story</span>
        <span>{playTime?.averageMainStory ? `${playTime?.averageMainStory}hr` : "-"}</span>
      </div>
      <div>
        <span>
          Main Story +<br />
          Side Missions
        </span>
        <span>{playTime?.averageMainStoryPlus ? `${playTime?.averageMainStoryPlus}hr` : "-"}</span>
      </div>
      <div>
        <span>Complete</span>
        <span>{playTime?.averageCompletionist ? `${playTime?.averageCompletionist}hr` : "-"}</span>
      </div>
    </Container>
  );
}
