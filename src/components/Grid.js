import React from 'react';
import GridLayout from 'react-grid-layout';

const Grid = ({ children }) => {
  const layout = [
    { i: 'a', x: 0, y: 0, w: 6, h: 2 },
    { i: 'b', x: 6, y: 0, w: 6, h: 2 },
  ];

  return (
    <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
      {children}
    </GridLayout>
  );
};

export default Grid;
