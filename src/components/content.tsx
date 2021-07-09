import { useRef } from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";
import styled from "styled-components"
import { ICategory, IContent } from "../types";
import { IDragValues } from "./category";
import { ObjectTypes } from "./inner";

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

export const ContentPlaceholder = styled.div`
    width: 80%;
    height: 44px;
`;

export interface IContentProps {
    id: number;
    title: string;
    isSelected: boolean;
    index: number;
    onClick: () => void;
}

export const Content: React.FC<IContentProps> = ({id, title, isSelected, onClick, index}) => {
    const ref = useRef<HTMLDivElement>(null);
    const makeItem = () => {
        return {
            id,
            index,
            ref,
        }
    }
    const [{ isDragging }, drag] = useDrag({
        type: ObjectTypes.CONTENT,
        item: makeItem,
        collect: (monitor: DragSourceMonitor<any>): IDragValues => {
            return {
                isDragging: monitor.isDragging(),
            }
        },
    });
    drag(ref);
    return (
        <ContentContainer
            ref={ref}
            className={isSelected ? 'content-selected' : ''}
            onClick={onClick}
        >
            {title}
        </ContentContainer>
    )
}
