'use client'
import React, { createContext, useState, useContext } from 'react';
import elementsTree from './elementsTree.json';
import { v4 as uuidv4 } from 'uuid'; 

const TreeContext = createContext();

export const TreeProvider = ({ children }) => {
  const [selection, setSelection] = useState('1001');
  const [tree, setTree] = useState(elementsTree);

  const deleteElement = (id, node = tree) => {
    if (node.id === id) {
      return null;
    }
    node.childrens = node.childrens.map(child => deleteElement(id, child)).filter(n => n);
    return { ...node };
  }

  const createElement = (id, node = tree) => {
    if (node.id === id) {
      const newElement = {
        id: uuidv4(),
        tag: "div",
        css: "",
        childrens: []
      };
      node.childrens = [...node.childrens, newElement];
    } else {
      node.childrens = node.childrens.map(child => createElement(id, child));
    }
    return { ...node };
  }

  const updateCss = (id, css, node = tree) => {
    if (node.id === id) {
      node.css = css;
    } else {
      node.childrens = node.childrens.map(child => updateCss(id, css, child));
    }
    return { ...node };
  }

  const updateContent = (id, content, node = tree) => {
    if (node.id === id) {
      node.content = content;
    } else {
      node.childrens = node.childrens.map(child => updateContent(id, content, child));
    }
    return { ...node };
  }

  const updateTag = (id, tag, node = tree) => {
    if (node.id === id) {
      node.tag = tag;
    } else {
      node.childrens = node.childrens.map(child => updateTag(id, tag, child));
    }
    return { ...node };
  }

  const deleteElementAndUpdate = (id) => {
    setTree(prevTree => deleteElement(id, prevTree));
  }

  const createElementAndUpdate = (id) => {
    setTree(prevTree => createElement(id, prevTree));
  }

  const updateCssAndUpdate = (id, css) => {
    setTree(prevTree => updateCss(id, css, prevTree));
  }

  const updateContentAndUpdate = (id, content) => {
    setTree(prevTree => updateContent(id, content, prevTree));
  }

  const updateTagAndUpdate = (id, tag) => {
    setTree(prevTree => updateTag(id, tag, prevTree));
  }

  return (
    <TreeContext.Provider value={{ 
      selection, 
      setSelection, 
      tree, 
      setTree, 
      deleteElement: deleteElementAndUpdate, 
      createElement: createElementAndUpdate,
      updateCss: updateCssAndUpdate,
      updateContent: updateContentAndUpdate,
      updateTag: updateTagAndUpdate
    }}>
      {children}
    </TreeContext.Provider>
  );
}

export const useTree = () => {
  const context = useContext(TreeContext);
  if (context === undefined) {
    throw new Error('useTree must be used within a TreeProvider');
  }
  return context;
}
