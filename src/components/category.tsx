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
    isCombination: boolean;
    onClick: () => void;
}

const combinationStyle = {
    transform: 'translate(0px, 0px)',
}

export const Category: React.FC<ICategoryProps> = ({id, title, isSelected, onClick, index, draggableId, isCombination}) => {
    console.log(isCombination);
    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided) => {
                const {draggableProps, dragHandleProps} = provided;

                if (isCombination && draggableProps.style?.transform) {
                    draggableProps.style.transform = 'translate(0px, 0px)';
                }
                
                return (
                    <CategoryContainer
                        className={isSelected ? 'category-selected' : ''}
                        onClick={onClick}
                        {...draggableProps}
                        {...dragHandleProps}
                        ref={provided.innerRef}
                        // style={isCombination ? combinationStyle : {}}
                    >
                        {title}
                    </CategoryContainer>
                )
            }}
        </Draggable>
        
    )
}
