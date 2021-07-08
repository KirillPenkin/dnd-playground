import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CategoriesContainer = styled.div`
  width: 30%;
  height: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 70%;
  height: 100%;
`;

export enum ObjectTypes {
  CATEGORY = 'CATEGORY',
  CONTENT = 'CONTENT',
}