export default function HomePage() {
  return (
    <div className="py-12 md:py-20">
      <div className="layout-container">
        <div className="content-padding">

          {/* Hero Section */}
          <section className="mb-20 max-w-3xl">
            {/* Apply font-heading with new typography classes */}
            <h1 className="font-heading text-2xl sm:text-3xl md:text-h1 mb-12 leading-relaxed">
              <span className="block">Need a contractor who has</span>
              <span className="block">designed it,</span>
              <span className="block">built it,</span>
              <span className="block">and <span className="text-gold">delivered it?</span></span>
            </h1>
            {/* Apply font-sans with new paragraph typography classes */}
            <p className="font-sans text-p1 mb-7">My name is Jane Fletcher.</p>
            <p className="font-sans text-p1 mb-7">
              I build digital products and services that actually work.
            </p>
            <p className="font-sans text-p1 mb-7">
              15+ years working across government, healthcare and finance has taught me how to cut through complexity and deliver what matters.
            </p>
            <p className="font-sans text-p1 mb-20">
              I move quickly with small teams while also navigating complex programmes and stakeholder environments. Results-focused, not process-bound.
            </p>
          </section>

          {/* Areas of Focus Section (single column + differentiator) */}
          <section className="mb-20">
            <h2 className="font-heading text-2xl mb-10 pb-2" style={{ lineHeight: '1em' }}>Areas of Focus</h2>
            <div className="mt-10 space-y-6 mb-16">
              <div className="font-sans text-p1">
                <h3 className="font-heading text-lg mb-5 text-gold">Service design</h3>
                <p>Connecting real user needs with organisational capabilities to create things people actually use.</p>
              </div>
              <div className="font-sans text-p1">
                <h3 className="font-heading text-lg mb-5 text-gold">Digital transformation</h3>
                <p>Delivering change that sticks, not slide decks that gather dust.</p>
              </div>
              <div className="font-sans text-p1">
                <h3 className="font-heading text-lg mb-5 text-gold">AI strategy & governance</h3>
                <p>Practical, ethical approaches to AI that work for both people and organisations.</p>
              </div>
              <div className="font-sans text-p1">
                <h3 className="font-heading text-lg mb-5 text-gold">Product development</h3>
                <p>From concept to launch - and the crucial bits between.</p>
              </div>
            </div>
            <div className="font-sans text-p1 border-l-2 border-gold pl-6 py-12 my-20 max-w-3xl">
              <p>
                What sets me apart is my hands-on experience across the entire product lifecycle.<br />
                I've personally designed, built, and shipped the solutions I advise on.<br />
                This practical approach means you get expertise that's been tested in the real world, not just in theory.
              </p>
            </div>
          </section>

          {/* How I Work Section (2-column layout) */}
          <section className="mb-20 md:flex md:gap-16">
            <div className="mb-6 md:mb-0 md:w-1/3">
              <h2 className="font-heading text-2xl mb-2" style={{ lineHeight: '1em' }}>How I Work</h2>
            </div>
            <div className="md:w-2/3">
              <ul className="font-sans text-p1 space-y-4">
                <li>I'm set up to work in the UK (outside IR35) but equally happy travelling anywhere for an interesting challenge.</li>
                <li>Fully experienced working 100% remote, with proven tools and practices to collaborate effectively at a distance.</li>
                <li>I engage through targeted contracts with clear deliverables, bringing hands-on delivery rather than just recommendations.</li>
                <li>I adapt to your team structure and ways of working - whether that's agile sprints or more traditional project management.</li>
              </ul>
            </div>
          </section>

          {/* Work Philosophy Section (2-column layout) */}
          <section className="mb-20 md:flex md:gap-16">
            <div className="mb-6 md:mb-0 md:w-1/3">
              <h2 className="font-heading text-2xl mb-2" style={{ lineHeight: '1em' }}>Work Philosophy</h2>
            </div>
            <div className="md:w-2/3">
              <ul className="font-sans text-p1 space-y-4">
                <li>I care about results, not processes.</li>
                <li>Clear goals, common sense, regular check-ins, and visible progress.</li>
                <li>No pointless meetings, excessive documentation, or overengineered solutions.</li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-24">
            <h2 className="font-heading text-2xl mb-12">Want to build something that works?</h2>
            <div>
              <a href="/contact" className="inline-block border border-[#b77f0f] hover:bg-[#b77f0f] text-white font-sans text-btn px-6 py-3 transition-colors duration-300 font-medium">
                Get in touch
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
