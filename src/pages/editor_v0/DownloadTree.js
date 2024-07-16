import React from 'react';
import { useTree } from './TreeContext';
import styles from './TreeVisualizer.module.css';

const DownloadButton = () => {
  const { tree } = useTree();

  const downloadTree = () => {
    const data = JSON.stringify(tree, null, 2);
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'tree.json';
    link.href = url;
    link.click();
  }

  return (
    <button onClick={downloadTree} className={styles.downloadButton}>
      Download Tree
    </button>
  );
};

export default DownloadButton;
