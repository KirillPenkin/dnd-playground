import styled from "styled-components"
import { ICategory } from "../types";
import { useDrag, useDrop, DropTargetMonitor, XYCoord } from 'react-dnd';
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

interface ICategoryProps {
    id: number;
    title: string;
    isSelected: boolean;
    index: number;
    onClick: () => void;
    onMove: (dragIndex: number, hoverIndex: number) => void;
}

interface IHaveType {
    type: ObjectTypes;
}

interface ICategoryDrag {
    id: number;
    index: number;
}
interface ICategoryDrop extends IHaveType {
    id: number;
    index: number;
}

export const Category: React.FC<ICategoryProps> = ({id, title, isSelected, onClick, index, onMove}) => {
    
    const getHoverPosition = (
        ref: RefObject<HTMLDivElement>,
        monitor: DropTargetMonitor) => {
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect() as DOMRect;
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

        return {
            hoverMiddleY,
            hoverClientY,
        }
    }

    const ref = useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop({
      accept: ObjectTypes.CATEGORY,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId()
        };
      },

      hover(item: ICategoryDrop, monitor: DropTargetMonitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }

        const { hoverClientY, hoverMiddleY } = getHoverPosition(ref, monitor);

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        const IsDrugDown = dragIndex < hoverIndex && hoverClientY < hoverMiddleY;
        if (IsDrugDown) {
          return;
        }

        // Dragging upwards
        const isDrugUp = dragIndex > hoverIndex && hoverClientY > hoverMiddleY;
        if (isDrugUp) {
          return;
        }

        // Time to actually perform the action
        onMove(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      }
    });

    const [{ isDragging }, drag] = useDrag({
        type: ObjectTypes.CATEGORY,
        item: (): ICategoryDrag => {
          return { id, index };
        },
        collect: (monitor: any) => ({
          isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));
    
    return (
        <CategoryContainer
            className={isSelected ? 'category-selected' : ''}
            onClick={onClick}
            ref={ref}
        >
            {title}
        </CategoryContainer>
    )
}
