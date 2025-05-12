export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-12 text-white bg-black">
      <h1 className="text-4xl font-semibold mb-6">
        Need a freelancer who has<br />
        designed it,<br />
        built it,<br />
        and <span className="text-yellow-600">delivered it?</span>
      </h1>
      <p className="mb-4">My name is Jane Fletcher.</p>
      <p className="mb-4">
        I bring product, design, strategy and delivery skills to teams.
      </p>
      <p className="mb-8">
        With 15+ years in digital across government, healthcare, finance and defence, I understand what matters and ensure everyone is aligned and <span className="text-yellow-600">thrives</span>.
      </p>
      <section className="mb-16">
        <h2 className="italic text-xl mb-2">Project Management Philosophy</h2>
        <p className="max-w-xl">
          I don’t have one — by which I mean, I am concerned with the success of the project and the team, not with the use of a particular workflow to get there.
          I work with stakeholders to design a process that makes sense for the organisation and supports its goals — and I check in regularly to see how it's performing.
        </p>
      </section>
      <footer className="bg-white text-black p-6 mt-12">
        <p>
          If you think I’d be a good fit for your team, <a href="/contact" className="text-yellow-600 underline">drop me a line</a>.
        </p>
      </footer>
    </main>
  );
}
