import { Composition } from 'remotion';
import { Promo, PROMO_DURATION, PROMO_FPS } from './Promo';
import '@fontsource-variable/inter/opsz.css';
import '../src/index.css';
import './promo.css';

export function Root() {
  return (
    <Composition
      id="Promo"
      component={Promo}
      durationInFrames={PROMO_DURATION}
      fps={PROMO_FPS}
      width={1920}
      height={1080}
    />
  );
}
