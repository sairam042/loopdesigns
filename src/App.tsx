import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import Services from './components/home/Services';
import LetsConnect from './components/home/LetsConnect';
// 3D Experience Component
import Cinematic3D from './components/home/Cinematic3D';
import CreativeProcess from './components/home/CreativeProcess';
import ContactForm from './components/home/ContactForm';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="bg-background min-h-screen text-primary font-sans selection:bg-accent selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Cinematic3D />
        <LetsConnect />
        <CreativeProcess />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
