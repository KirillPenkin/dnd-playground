import styled from "styled-components"
import { Draggable } from 'react-beautiful-dnd';

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
    index: number;
    draggableId: string;
    onClick: () => void;
}

export const Category: React.FC<ICategoryProps> = ({id, title, isSelected, onClick, index, draggableId}) => {
    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided) => {
                return (
                    <CategoryContainer
                        className={isSelected ? 'category-selected' : ''}
                        onClick={onClick}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {title}
                    </CategoryContainer>
                )
            }}
        </Draggable>
        
    )
}
