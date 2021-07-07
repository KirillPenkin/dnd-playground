import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components"
import { ICategory, IContent } from "../types";

const ContentContainer = styled.div`
    width: 80%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid green;
    border-radius: 5px;
    margin: 5px;

    &.content-selected {
        background-color: lightgreen;
    }

    &:hover {
        background-color: lightskyblue;
    }
`;

export interface IContentProps {
    id: number;
    title: string;
    isSelected: boolean;
    index: number;
    onClick: () => void;
}

export const Content: React.FC<IContentProps> = ({id, title, isSelected, onClick, index}) => {
    return (
        <Draggable draggableId={`content-${id}`} index={index} >
            {(provided) => {
                return (
                    <ContentContainer
                        className={isSelected ? 'content-selected' : ''}
                        onClick={onClick}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >{title}
                    </ContentContainer>
                )
            }}
        </Draggable>
    )
}
