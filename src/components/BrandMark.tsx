import Image from "next/image";

interface BrandMarkProps {
  className?: string;
  decorative?: boolean;
}

export function BrandMark({ className = "", decorative = false }: BrandMarkProps) {
  return (
    <Image
      src="/assets/kp-monogram.png"
      width={980}
      height={1050}
      alt={decorative ? "" : "Intertwined K and P monogram"}
      className={className}
    />
  );
}
