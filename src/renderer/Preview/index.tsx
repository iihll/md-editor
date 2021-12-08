import React from 'react';
import { unified } from 'unified';
import { defaultSchema } from 'hast-util-sanitize';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkReact from 'remark-react';
import RemarkCode from '../RemarkCode';
import './index.css';

interface Props {
  doc: string;
}

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), 'className'],
  },
};

const Preview: React.FC<Props> = (props) => {
  const { doc } = props;
  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkReact, {
      createElement: React.createElement,
      sanitize: schema,
      remarkReactComponents: {
        code: RemarkCode,
      },
    })
    .processSync(doc).result;

  return <div className="preview markdown-body">{md}</div>;
};

export default Preview;
