import BetaDemo from './components/BetaDemo';
import ClosingMessage from './components/ClosingMessage';
import DarkZone from './components/DarkZone';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Pillars from './components/Pillars';
import Positioning from './components/Positioning';
import Problem from './components/Problem';
import ScrollVideo, { VIDEO_END_ID } from './components/ScrollVideo';
import SectionOne from './components/SectionOne';
import SectionTwo from './components/SectionTwo';
import Testimonial from './components/Testimonial';

export default function App() {
  return (
    <div className="relative">
      <ScrollVideo />
      <div className="relative z-10">
        <Navbar />
        <main>
          {/* Dark zone over the scroll video: few messages, timed to the footage */}
          <DarkZone hero={<SectionOne />} messages={[<SectionTwo />, <ClosingMessage />]} />

          {/* White page sliding over the end of the video */}
          <div
            id={VIDEO_END_ID}
            className="relative rounded-t-[2rem] bg-paper text-ink shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.6)] sm:rounded-t-[3rem]"
            style={{
              backgroundImage: 'radial-gradient(rgba(11,27,51,0.07) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          >
            <Problem />
            <Pillars />
            <Positioning />
            <Testimonial />
            <BetaDemo />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
