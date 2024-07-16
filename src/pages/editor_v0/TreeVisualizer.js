'use client'
import React, { useReducer } from 'react';
import NodeComponent from './NodeComponent';
import { useTree } from './TreeContext';
import styles from './TreeVisualizer.module.css';

function visibilityReducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return {...state, [action.id]: !state[action.id]};
    default:
      return state;
  }
}

const TreeVisualizer = ({ node, level = 0 }) => {

  const [visibilityState, dispatch] = useReducer(visibilityReducer, false);

  const flattenTree = (node, level = 0) => {
    let flattenedTree = [
      <NodeComponent key={node.id} node={node} level={level + 1} dispatch={dispatch} visibilityState={visibilityState} />
    ];
  
    // Check visibilityState before rendering children
    if (visibilityState[node.id] === true) {
      node.childrens.forEach(childNode => {
        flattenedTree = [...flattenedTree, ...flattenTree(childNode, level + 1)];
      });
    }
  
    return flattenedTree;
  }

  return (
    <div className={styles.treeContainer}>
      {flattenTree(node)}
    </div>
  );
}

export default TreeVisualizer;




