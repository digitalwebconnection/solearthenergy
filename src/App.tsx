import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/home/Home';

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <div className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-white">
        {/* Header Navigation */}
        <Header />

        {/* Main Home Page Sections */}
        <Home />

        {/* Footer Details */}
        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
