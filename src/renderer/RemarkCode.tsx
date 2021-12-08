import React, { useEffect, useState } from 'react';
import runmode, { getLanguage } from './runmode';

type Tokens = {
  text: string;
  style: string | null;
}[];

const RemarkCode: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
> = (props) => {
  const [spans, setSpans] = useState<Tokens>([]);
  const { className, children } = props;
  const langName = (className || '').substr(9);

  useEffect(() => {
    getLanguage(langName)
      .then((language) => {
        // eslint-disable-next-line promise/always-return
        if (language) {
          const body =
            props.children instanceof Array ? props.children[0] : null;
          const tokens: Tokens = [];
          runmode(
            body as string,
            language,
            (
              text: string,
              style: string | null,
              _from: number,
              _to: number
            ) => {
              tokens.push({ text, style });
            }
          );
          setSpans(tokens);
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  if (spans.length > 0) {
    return (
      <code>
        {spans.map((span, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <span key={i} className={span.style || ''}>
            {span.text}
          </span>
        ))}
      </code>
    );
  }
  return <code>{children}</code>;
};

export default RemarkCode;
