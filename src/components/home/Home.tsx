import Hero from './Hero';
import Brands from './Brands';
import About from './About';
import Sectors from './Sectors';
import SolarCalculator from './SolarCalculator';
import Products from './Products';
import WhyChooseUs from './WhyChooseUs';
import AppShowcase from './AppShowcase';
import Process from './Process';
import Projects from './Projects';

import Pricing from './Pricing';
import SustainabilityMetrics from './SustainabilityMetrics';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import QuoteForm from './QuoteForm';

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Brands />
      <About />
      <Sectors />
      <SolarCalculator />
      <Products />
      <WhyChooseUs />
      <AppShowcase />
      <Process />
      <Projects />
      <Pricing />
      <SustainabilityMetrics />
      <Testimonials />
      <FAQ />
      <QuoteForm />
    </main>
  );
}
