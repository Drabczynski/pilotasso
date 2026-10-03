import Reveal from './Reveal';
import { Eyebrow, Lead } from './Section';

/** Last line over the video, just before the white page takes over. */
export default function ClosingMessage() {
  return (
    <div className="relative isolate ml-auto max-w-lg text-right text-legible">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-40 -inset-y-28 -z-10 bg-[radial-gradient(closest-side,rgba(4,8,16,0.7)_0%,rgba(4,8,16,0.5)_45%,transparent_100%)]"
      />
      <Reveal from="right">
        <Eyebrow>Construit avec le terrain</Eyebrow>
      </Reveal>
      <Reveal from="right" delay={120} className="mt-5">
        <p className="text-3xl font-semibold leading-[1.08] tracking-display text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
          Moins de fichiers.
          <br />
          Plus de temps pour
          <br />
          <span className="text-lime-300">votre mission.</span>
        </p>
      </Reveal>
      <Reveal from="right" delay={240} className="mt-5">
        <Lead>
          Le temps gagné revient à ce qui compte :
          <br />
          <span className="font-medium text-lime-300">vos bénévoles, vos projets, vos publics.</span>
        </Lead>
      </Reveal>
    </div>
  );
}
