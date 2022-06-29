import { Row } from "components/lib";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

export const PageHeader = styled(Row)`
  flex-direction: row;
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

export const PageHeaderLeft = styled(Row)``;
export const PageHeaderRight = styled.div``;

export const Main = styled.main`
  height: calc(100vh - 6rem);
`;
