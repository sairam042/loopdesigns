import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
// import ClientMarquee from './components/home/ClientMarquee';
import ProcessFlow from './components/home/ProcessFlow';
import Logofolio from './components/home/Logofolio';
import Services from './components/home/Services';
import LetsConnect from './components/home/LetsConnect';
import CreativeProcess from './components/home/CreativeProcess';
import ContactForm from './components/home/ContactForm';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="font-sans antialiased text-white bg-background selection:bg-white selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <ProcessFlow />
        <Logofolio />
        <Services />
        <LetsConnect />
        <CreativeProcess />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
