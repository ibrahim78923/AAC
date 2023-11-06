const HTMLRenderer = ({ content }: any) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);

export default HTMLRenderer;
