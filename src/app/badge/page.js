"use client";

import SvgRender from "@/components/SvgRender";
import { useEffect, useState } from "react";

export default function Badge() {
  const [svg, setSvg] = useState();
  const owner = "aaa";
  const name = "bbb";

  const getBadge = async () => {
    const res = await fetch(`/api/badge?owner=${owner}&name=${name}`);
    // const data = await res.json();
    setSvg(res.body);
    console.log(res.body);
  };

  useEffect(() => {
    getBadge();
  }, []);

  return <div>{svg && <SvgRender svg={svg} owner={owner} name={name} />}</div>;
}
