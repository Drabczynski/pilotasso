import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ScrollVideo from './components/ScrollVideo';
import SectionFour from './components/SectionFour';
import SectionOne from './components/SectionOne';
import SectionThree from './components/SectionThree';
import SectionTwo from './components/SectionTwo';

export default function App() {
  return (
    <div className="relative">
      <ScrollVideo />
      <div className="relative z-10">
        <Navbar />
        <main>
          <SectionOne />
          {/* Breathing room so the scroll video has distance to play between sections */}
          <div className="h-[40vh]" aria-hidden />
          <SectionTwo />
          <div className="h-[30vh]" aria-hidden />
          <SectionThree />
          <div className="h-[30vh]" aria-hidden />
          <SectionFour />
        </main>
        <Footer />
      </div>
    </div>
  );
}
