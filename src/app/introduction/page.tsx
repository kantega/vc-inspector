import Markdown from 'react-markdown';
import markdownFile from './introduction.md';
import H1 from '../typography/H1';
import H2 from '../typography/H2';
import H3 from '../typography/H3';
import H4 from '../typography/H4';
import H5 from '../typography/H5';
import H6 from '../typography/H6';
import P from '../typography/P';

/**
 * A page dedicated to teach eIDAS 2.0 and the
 * Verifiable Credential standard in its many formats.
 */
export default function Introduction() {
  return (
    <main className="flex max-w-[1280px] flex-col gap-8 px-40 py-96 ">
      <Markdown
        components={{
          // Map `h1` (`# heading`) to use `h2`s.
          h1(props) {
            const { node, ...rest } = props;
            return <H1 {...rest} />;
          },
          h2(props) {
            const { node, ...rest } = props;
            return <H2 {...rest} />;
          },
          h3(props) {
            const { node, ...rest } = props;
            return <H3 {...rest} />;
          },
          h4(props) {
            const { node, ...rest } = props;
            return <H4 {...rest} />;
          },
          h5(props) {
            const { node, ...rest } = props;
            return <H5 {...rest} />;
          },
          h6(props) {
            const { node, ...rest } = props;
            return <H6 {...rest} />;
          },
          p(props) {
            const { node, ...rest } = props;
            return <P variant="body-bold" {...rest} />;
          },

          // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
          em(props) {
            const { node, ...rest } = props;
            return <i style={{ color: 'red' }} {...rest} />;
          },
        }}
      >
        {markdownFile}
      </Markdown>
    </main>
  );
}
