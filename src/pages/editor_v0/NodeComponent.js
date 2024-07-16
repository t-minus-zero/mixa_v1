'use client'
import React, { useState } from 'react';
import { useTree } from './TreeContext';
import styles from './TreeVisualizer.module.css';

const NodeComponent = ({ node, level = 0, children, dispatch, visibilityState }) => {
  const { selection, setSelection, deleteElement, createElement, updateTag } = useTree();
  const [editing, setEditing] = useState(false);
  const [tag, setTag] = useState(node.tag);

  return (
    <div key={node.id} style={{marginLeft: `${level * 10}px`}} className={`${styles.elementContainer} ${selection === node.id ? styles.selected : ''}`}
      onClick={(e) => { 
        e.stopPropagation(); 
        setSelection(node.id); 
      }}
      onMouseOver={(e) => { e.stopPropagation(); }}
    >
      <div className={styles.leftGroup}>
        <button
            onClick={() => dispatch({type: 'toggle', id: node.id})}
            className={styles.toggleButton}
            style={{ visibility: node.childrens.length > 0 ? 'visible' : 'hidden' }}
        >
        {visibilityState[node.id] === true ? '▼' : '►'}
        </button>        
        {editing ? (
          <input value={tag} onChange={(e) => setTag(e.target.value)} onBlur={() => { updateTag(node.id, tag); setEditing(false); }} />
        ) : (
          <div onDoubleClick={() => setEditing(true)}>
            {node.tag}
          </div>
        )}
      </div>
      <div className={styles.rightGroup}>
        <button onClick={() => createElement(node.id)} className={styles.addButton}>+</button>
        <button onClick={() => deleteElement(node.id)} className={styles.deleteButton}>x</button>
      </div>
      {visibilityState && children}
    </div>
  );
}

export default NodeComponent;
