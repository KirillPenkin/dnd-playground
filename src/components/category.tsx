import styled from "styled-components"
import { ICategory } from "../types";

const CategoryContainer = styled.div`
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid grey;
    border-radius: 5px;
    margin: 5px;

    &:hover {
        background-color: lightcoral;
    }

    &.category-selected {
        background-color: lightblue;
    }
`;

interface ICategoryProps {
    id: number;
    title: string;
    isSelected: boolean;
    onClick: () => void;
}

export const Category: React.FC<ICategoryProps> = ({id, title, isSelected, onClick}) => {
    return (
        <CategoryContainer className={isSelected ? 'category-selected' : ''} onClick={onClick}>{title}</CategoryContainer>
    )
}
