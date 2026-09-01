import type { MDXComponents } from "mdx/types";

export const komponenMdx: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="tampil mt-16 text-anak first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display mt-10 text-lg font-bold tracking-[0.01em] text-tinta uppercase">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mt-5 max-w-2xl">{children}</p>,
  ul: ({ children }) => <ul className="mt-5 max-w-2xl space-y-3">{children}</ul>,
  li: ({ children }) => (
    <li className="flex gap-5">
      <span aria-hidden className="mt-[0.7em] h-1 w-4 shrink-0 bg-biru" />
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-tinta">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a href={href} className="pelan text-biru underline underline-offset-4 hover:text-tinta">
      {children}
    </a>
  ),
};
