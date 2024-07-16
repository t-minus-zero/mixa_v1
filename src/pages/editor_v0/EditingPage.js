'use client'
import React from 'react';
import { useTree } from './TreeContext';
import TreeVisualizer from './TreeVisualizer';
import HTMLVisualizer from './ComponentPreview';
import CssEditor from './CssEditor';
import styles from './EditingPage.module.css'; // import styles from a CSS module
import DownloadButton from './DownloadTree';

function EditingPage() {
  const { tree } = useTree();

  return (
    <div className={styles.container}>
        <div className={styles.section}>
            <TreeVisualizer node={tree} />
        </div>
        <div className={styles.section}>
            <HTMLVisualizer />
            <DownloadButton />
        </div>
        <div className={styles.section}>
            <CssEditor />
        </div>
    </div>
  );
}

export default EditingPage;
