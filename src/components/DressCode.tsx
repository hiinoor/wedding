import Image from "next/image";
import { OrnamentDivider } from "@/components/OrnamentDivider";
import { Reveal } from "@/components/Reveal";
import { wedding } from "@/data/wedding";

export function DressCode() {
  return (
    <section id="dress-code" className="dress-code" aria-labelledby="dress-code-title">
      <div className="dress-code__intro">
        <div className="site-container dress-code__intro-layout">
          <Reveal className="dress-code__intro-copy">
            <p className="eyebrow">What to wear</p>
            <h2 id="dress-code-title">{wedding.dressCodeTitle}</h2>
            <p>{wedding.dressCodeIntro}</p>
            <OrnamentDivider />
          </Reveal>
        </div>
      </div>

      <div className="dress-code__looks">
        {wedding.dressCodes.map((code, index) => (
          <article className={`dress-look dress-look--${code.id}`} aria-labelledby={`look-${code.id}`} key={code.id}>
            <div className="site-container dress-look__layout">
              <Reveal className="dress-look__visual" variant="image" direction={index % 2 === 0 ? "left" : "right"}>
                <figure className="dress-look__photo">
                  <Image
                    src={code.photo.src}
                    alt={code.photo.alt}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1100px) 52vw, 47vw"
                    quality={code.id === "engagement" ? 90 : 75}
                    style={{ objectPosition: code.photo.objectPosition }}
                  />
                </figure>
              </Reveal>
              <Reveal className="dress-look__copy" direction={index % 2 === 0 ? "right" : "left"} delay={0.12}>
                <p className="dress-look__index"><span>{String(index + 1).padStart(2, "0")}</span><span>{code.event}</span></p>
                <h3 id={`look-${code.id}`}>{code.mood}</h3>
                <p className="dress-look__description">{code.description}</p>
                <Reveal className="dress-look__rule" variant="line" delay={0.3} />
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
