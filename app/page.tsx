export default function HomePage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="px-5 md:px-8">

          {/* Hero Section */}
          <section className="mb-16 md:mb-24 max-w-3xl">
            {/* Apply font-heading with new typography classes */}
            <h1 className="font-heading text-h1 mb-10">
              Need a freelancer who has<br />
              designed it,<br />
              built it,<br />
              and <span className="text-gold">delivered it?</span>
            </h1>
            {/* Apply font-sans with new paragraph typography classes */}
            <p className="font-sans text-p1 mb-4">My name is Jane Fletcher.</p>
            <p className="font-sans text-p1 mb-4">
              I bring product, design, strategy and delivery skills to teams.
            </p>
            <p className="font-sans text-p1 mb-8">
              With 15+ years in digital across government, healthcare, finance and defence, I understand what matters and ensure everyone is aligned and <span className="text-gold">thrives</span>.
            </p>
          </section>

          {/* Areas of Expertise Section (Placeholder based on mockup) */}
          <section className="mb-16 md:mb-24">
            <h2 className="font-heading text-h3 mb-6 pb-2" style={{ lineHeight: '1em' }}>Areas of Expertise</h2>
            {/* TODO: Populate with actual expertise items */}
            <ul className="font-sans text-p1 list-none space-y-2">
              <li>Digital transformation</li>
              <li>AI strategy</li>
              <li>Product management</li>
              <li>Agile delivery</li>
            </ul>
          </section>

          {/* Project Management Philosophy Section (Layout based on mobile mockup) */}
          <section className="mb-16 md:mb-24 md:flex md:gap-12">
            <div className="mb-4 md:mb-0 md:w-1/3">
              <h2 className="font-heading text-h3 mb-2" style={{ lineHeight: '1em' }}>Project Management Philosophy</h2>
              <hr className="border-gold w-16 border-t-2 mb-4 md:mb-0" />
            </div>
            <div className="md:w-2/3">
              <p className="font-sans text-p1">
                I don't have one — by which I mean, I am concerned with the success of the project and the team, not with the use of a particular workflow to get there.
                I work with stakeholders to design a process that makes sense for the organisation and supports its goals — and I check in regularly to see how it's performing.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
