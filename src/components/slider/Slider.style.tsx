import styled from '@emotion/styled';

type SliderStyledTypes = {
  width?: string;
};
export const SliderStyled = styled.div<SliderStyledTypes>`
  width: ${(props) => (props?.width ? props?.width : '100%')};
`;

export const SliderListStyled = styled.ul`
  margin: 5px 0;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 0;

  border-radius: 15px;
  background-color: ${({ theme }) => theme.palette?.bg.mainContent || '#e4e4e4'};
  width: 100%;

  > :hover {
    border-radius: 15px;
    border: 1px solid ${({ theme }) => theme.palette?.bg.highlight || '#6db6ff'};
    box-shadow: inset 0 0 5px ${({ theme }) => theme.palette?.bg.highlight || '#6db6ff'};
  }

  overflow: hidden;

  div {
    height: 30px;
    background-color: ${({ theme }) => theme.palette?.bg.highlight || '#6db6ff'};
    box-shadow: 0 0 10px ${({ theme }) => theme.palette?.bg.highlight || '#6db6ff'};
    user-select: none;

    position: absolute;
    border-radius: 15px;
    z-index: 5;
    left: 100px;
    transition: left 0.2s cubic-bezier(0.175, 0.885, 0.32, 1);
  }
  transition: left 0.2s cubic-bezier(0.175, 0.885, 0.32, 1);
`;

type SliderItemStyledTypes = {
  isSelected: boolean;
};
export const SliderItemStyled = styled.li<SliderItemStyledTypes>`
  border: 1px solid transparent;
  position: relative;
  z-index: 10;
  user-select: none;
  height: 30px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0;
  border-radius: 15px;
  color: ${({ theme }) => theme.palette?.color.text || '#262728'};

  background-color: ${(props) =>
    props.isSelected ? props.theme.palette?.bg.highlight : 'transparent'};
`;
