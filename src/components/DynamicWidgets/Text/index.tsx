import { PageTitledHeader } from '@/components/PageTitledHeader';
import { TruncateText } from '@/components/TruncateText';
import { HtmlRenderer } from '@/components/DataDisplay/HtmlRenderer';

export const Text = (props: any) => {
  const { title, description } = props;
  return (
    <>
      <PageTitledHeader
        title={<TruncateText text={title} />}
        titleVariant="h5"
      />
      {!!description ? <HtmlRenderer description={description} /> : '---'}
    </>
  );
};

export default Text;
