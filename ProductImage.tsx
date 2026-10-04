"use client";
import { useState } from "react";

export default function ProductImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return <div className={`grid place-items-center bg-neutral-200 p-4 text-center font-display text-lg uppercase text-neutral-500 ${className}`}>{alt}</div>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />;
}
