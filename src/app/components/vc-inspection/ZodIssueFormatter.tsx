import { isZodError } from '@inspector/calculatedAttributes/types';

/**
 * Turns an error into a presentable format.
 */
export default function ZodIssueFormatter({ error }: { error: Error }) {
  if (isZodError(error)) {
    return (
      <>
        {error.issues.map((issue, i1) => {
          if (issue.code === 'invalid_union') {
            const errors = Array.from(new Set(issue.unionErrors))
              .flatMap((i) => Array.from(new Set(i.issues)))
              .map((unionIssue, i2) => {
                const key = `${i1}-${i2}`;
                if (unionIssue.code === 'invalid_type') {
                  return (
                    <p key={key}>
                      Expected &apos;{unionIssue.expected}&apos;, but got &apos;{unionIssue.received}&apos; at{' '}
                      {unionIssue.path.join(' -> ')}
                    </p>
                  );
                }
                return (
                  <p key={key}>
                    {unionIssue.path.join(' -> ')}: {unionIssue.message}
                  </p>
                );
              });
            return errors;
          }
          return (
            <p key={i1}>
              {issue.path.join(' -> ')}: {issue.message}
            </p>
          );
        })}
      </>
    );
  }
  return <p>{error.message}</p>;
}
