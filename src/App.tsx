import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/home/Home';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-white">
      {/* Header Navigation */}
      <Header />

      {/* Main Home Page Sections */}
      <Home />

      {/* Footer Details */}
      <Footer />
    </div>
  );
}

export default App;
