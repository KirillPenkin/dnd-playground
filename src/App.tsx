import React from 'react';
import styled from 'styled-components';
import { categories, content } from './data';
import { Category } from './components/category';
import { Content } from './components/content';
import { useState } from 'react';
import { IContent } from './types';
import { AppContainer, CategoriesContainer, ContentContainer } from './components/inner';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
  
  return (
    <DndProvider backend={HTML5Backend}>
      <AppContainer>
        <CategoriesContainer>
          {categories.map(({id, title}, index) => {
            const isSelected = id === selected;
            return <Category id={id} key={id} title={title} isSelected={isSelected} onClick={() => selectCategory(id)} index={index} onMove={() => undefined} />
          })}
        </CategoriesContainer>
        <ContentContainer>
          {selectedCategoryContent.map(({id, title}) => {
            return <Content key={id} title={title} id={id} isSelected={selectedContent.includes(id)} onClick={() => selectContent(id)} />
          })}
        </ContentContainer>
      </AppContainer>
    </DndProvider>
  );
}

export default App;
