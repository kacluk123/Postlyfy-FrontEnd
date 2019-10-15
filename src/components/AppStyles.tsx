import styled from "styled-components";

export const App = styled.div.attrs({
  className: "App"
})`
  display: grid;
  grid-template-rows: 50px auto;
  background: var(--dark);
`;

export const AppContent = styled.div.attrs({
  className: "AppContent"
})`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
