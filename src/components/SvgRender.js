"use client";

import Image from "next/image";

export default function SvgRender({ svg, owner, name }) {
  const base64 = btoa(unescape(encodeURIComponent(svg)));
  return (
    <Image
      src={`data:image/svg+xml;base64,${base64}`}
      alt={`Badge repo rating for ${owner}/${name}`}
      width={300}
      height={100}
    />
  );
}
