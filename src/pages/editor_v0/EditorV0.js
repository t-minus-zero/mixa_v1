'use client'
import React from 'react';
import { TreeProvider } from './TreeContext';
import EditingPage from './EditingPage';

function EditorV0() {

  return (
    <TreeProvider>
        <EditingPage />
    </TreeProvider>
  );
}

export default EditorV0;
