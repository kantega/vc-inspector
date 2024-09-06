import Markdown from 'react-markdown';
import markdownFile from './introduction.md';
import H1 from '../typography/H1';
import H2 from '../typography/H2';
import H3 from '../typography/H3';
import H4 from '../typography/H4';
import H5 from '../typography/H5';
import H6 from '../typography/H6';
import P from '../typography/P';
import kantegaLogo from '@/public/credentialsIntro.png';
import Image from 'next/image';

/**
 * A page dedicated to teach eIDAS 2.0 and the
 * Verifiable Credential standard in its many formats.
 */
export default function Introduction() {
  return (
    <main className="flex max-w-[1280px] flex-col gap-8 ">
      <div className="relative isolate flex h-72 flex-row-reverse">
        <Image src={kantegaLogo} alt="Kantega Logo" className="absolute -bottom-48 left-0 -z-10" width={500} />
        <div className="flex w-1/2 flex-col gap-4">
          <H2 className="mb-6 text-white">Introduction</H2>
          <P variant="body" className="text-white">
            {`Have you stumbled upon a verifiable credential and thought, "What in the world is this thing?" Or perhaps
          you're deep in the trenches, crafting your own verifiable credential and need to make sure it checks all the
          right boxes and plays nice with the standards? 
          `}
          </P>
          <P variant="body" className="text-white">
            {`
          Well then, Poirot is the tool for you! (Yes, we named it after
          the detective  and yes, it's just as good at solving credential mysteries!)`}
          </P>
        </div>
      </div>

      <Markdown
        className="z-20 flex flex-col gap-8 rounded-xl bg-white p-20 pb-96"
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
