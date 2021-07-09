import styled from "styled-components"
import { useDrag, useDrop, DropTargetMonitor, XYCoord, DragSourceMonitor } from 'react-dnd';
import { ObjectTypes } from "./inner";
import { RefObject, useRef } from "react";

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

export type MoveHandeler = (dragIndex: number, hoverIndex: number, isUpperElementHalf: boolean) => void;

interface ICategoryProps {
    id: number;
    title: string;
    isSelected: boolean;
    index: number;
    onClick: () => void;
    // onDnDHover: (item: ICategoryDrop, monitor: DropTargetMonitor) => void;
    onDnDHover: (draggingIndex: number, dragOverIndex: number, isUpperHalf: boolean) => void;
    setDraggingItem: (id: number | undefined) => void;
}

interface IHaveType {
    type: ObjectTypes;
}

interface ICategoryDrag {
    id: number;
    index: number;
    ref: RefObject<HTMLDivElement>;
}
export interface ICategoryDrop extends IHaveType, ICategoryDrag { }

export interface IDragValues {
    isDragging: boolean;
}

interface IDropValues {
    handlerId:  any;
}

export const Category: React.FC<ICategoryProps> = ({id, title, isSelected, onClick, index, onDnDHover, setDraggingItem}) => {
    
    const ref = useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop({
      accept: ObjectTypes.CATEGORY,
      collect(monitor): IDropValues {
        return {
          handlerId: monitor.getHandlerId()
        };
      },

      hover: (item: ICategoryDrop, monitor: DropTargetMonitor) => {

        const hoverBoundingRect = ref.current?.getBoundingClientRect() as DOMRect;
        const halfHight = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const mousePosition = monitor.getClientOffset();
        const relativeMousePosition = (mousePosition as XYCoord).y - hoverBoundingRect.top;
        const isUpperHalf = relativeMousePosition < halfHight;

        const draggingIndex = item.index;
        const dragOverIndex = index;

        onDnDHover(draggingIndex, dragOverIndex, isUpperHalf);

      },
      drop: (item: ICategoryDrop, monitor: DropTargetMonitor) => {
          setDraggingItem(undefined);
      },
    });

    const makeItem = (monitor: DragSourceMonitor<any>): ICategoryDrag => {
        setDraggingItem(id);
        return {
            id,
            index,
            ref,
        };
    }

    const [{ isDragging }, drag] = useDrag({
        type: ObjectTypes.CATEGORY,
        item: makeItem,
        collect: (monitor: DragSourceMonitor<any>): IDragValues => {
            return {
                isDragging: monitor.isDragging(),
            }
        },
    });

    drag(drop(ref));
    
    return (
        <CategoryContainer
            className={isSelected ? 'category-selected' : ''}
            onClick={onClick}
            ref={ref}
        >
            {`${index} ${title}`}
        </CategoryContainer>
    )
}

export const CategoryPlaceholder: React.FC = () => {
    return (
        <CategoryContainer>Placeholder</CategoryContainer>
    );
}