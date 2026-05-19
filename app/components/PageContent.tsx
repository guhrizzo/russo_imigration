'use client'

import Navbar from "./Navbar"
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import WhyUs from './sections/WhyUs'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './Footer'
import WhatsAppFloat from './WhatsAppFloat'
import Faq from "./sections/Faq"
import NotaryPublic from "./sections/NotaryPublic"


export default function PageContent() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <WhyUs />
      <Services />
      <Testimonials />
      {/*
      <NotaryPublic />
      */}
      <Faq />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
