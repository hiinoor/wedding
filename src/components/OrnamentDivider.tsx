import Image from "next/image";

export function OrnamentDivider() {
  return (
    <div className="ornament-divider" aria-hidden="true">
      <span />
      <Image src="/assets/kp-flower.png" width={230} height={365} alt="" />
      <span />
    </div>
  );
}
