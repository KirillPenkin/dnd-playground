import React from 'react';
import { categories, content } from './data';
import { Category } from './components/category';
import { Content } from './components/content';
import { useState } from 'react';
import { IContent } from './types';
import { DragDropContext, DropResult, ResponderProvided, Droppable, DragStart } from 'react-beautiful-dnd';
import { AppContainer, CategoriesContainer, ContentContainer } from './components/inner'

const categoriesDroppableId = 'categories';
const contentDroppableId = 'content';

export const App = () => {

  const [selected, setSelected] = useState<number | undefined>(undefined);
  const [selectedContent, setSelectedContent] = useState<number[]>([]);

  const selectedCategory = categories.find((category) => category.id === selected);
  const selectedCategoryContent = selectedCategory ? selectedCategory.content.map((contentId) => content.find((item) => item.id === contentId)) as IContent[] : [];

  const selectCategory = (id: number) => {
    const idChanged = id !== selected;
    if (idChanged) {
      setSelectedContent([])
      setSelected(id)
    }
  }

  const selectContent = (id: number) => {
    const isAlreadySelected = selectedContent.includes(id);
    if (!isAlreadySelected) {
      setSelectedContent([...selectedContent, id]);
    } else {
      setSelectedContent(selectedContent.filter((item) => item !== id))
    }
  }

  const [isCombination, setCombination] = useState(false);

  const onDragEnd = (result: DropResult, responder: ResponderProvided) => {
    console.log(result);
    setCombination(false);
  }

  const onDragStart = (initial: DragStart, provided: ResponderProvided) => {
    const {droppableId} = initial.source;
    const isCombination = contentDroppableId === droppableId;
    setCombination(isCombination);
    console.log(isCombination);
  }
  
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}>
      <AppContainer>
        <Droppable droppableId={categoriesDroppableId} isCombineEnabled={isCombination} >
          {(provided) => {
            return (
              <CategoriesContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {categories.map(({id, title}, index) => {
                  const isSelected = id === selected;
                  const draggableId = `category-${id}`;
                  return (
                    <Category
                      id={id}
                      key={id}
                      title={title}
                      isSelected={isSelected}
                      index={index}
                      onClick={() => selectCategory(id)}
                      draggableId={draggableId}
                      isCombination={isCombination}
                    />)
                })}
                {provided.placeholder}
              </CategoriesContainer>
            )
          }}
        </Droppable>

        <Droppable droppableId={contentDroppableId}>
          {(provided) => {
            return (
              <ContentContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {selectedCategoryContent.map(({id, title}, index) => {
                  const draggableId = `content-${id}`;
                  return (
                    <Content
                      key={id}
                      title={title}
                      id={id}
                      isSelected={selectedContent.includes(id)}
                      onClick={() => selectContent(id)}
                      index={index}
                      draggableId={draggableId}
                    />)
                })}
                {provided.placeholder}
              </ContentContainer>
            )
          }}
        </Droppable>
      </AppContainer>
    </DragDropContext>
  );
}

export default App;
