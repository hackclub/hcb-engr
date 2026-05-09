import Link from "./Link";

const BASE_URL = "https://blog.hcb.hackclub.com/posts";

export default function PullRequestLink({ slug }) {
  const href = `${BASE_URL}/${slug}`;

  return (
    <>
      <Link children={"Read more..."} href={href} />
    </>
  );
}
