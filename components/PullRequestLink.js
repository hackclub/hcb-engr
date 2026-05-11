import Link from "./Link";

const REPO_URL = "https://github.com/hackclub/hcb/pull";

export default function PullRequestLink({ number }) {
  const href = `${REPO_URL}/${number}`;

  return (
    <>
      <span>(</span><Link children={`#${number}`} href={href} /><span>)</span>
    </>
  );
}
