import React from 'react';

interface Props {
  doc: string;
}

const Preview: React.FC<Props> = (props) => {
  const { doc } = props;
  console.log(doc);

  return <div className="preview-wrapper">preview</div>;
};

export default Preview;
