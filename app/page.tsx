import Navbar from "./components/Navbar"
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import WhyUs from './components/sections/WhyUs'
import Testimonials from './components/sections/Testimonials'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
