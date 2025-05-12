'use client';

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen px-6 py-12 text-white bg-black">
      <h1 className="text-4xl font-semibold mb-6">
        Let me know how I can <span className="text-yellow-600">help</span>.
      </h1>
      <form
        action="https://formspree.io/f/YOUR_FORM_ID"
        method="POST"
        className="space-y-6 max-w-2xl"
      >
        <div className="flex gap-4">
          <input name="firstName" placeholder="First Name" required className="flex-1 p-2 bg-black border-b border-gray-500" onChange={handleChange} />
          <input name="lastName" placeholder="Last Name" required className="flex-1 p-2 bg-black border-b border-gray-500" onChange={handleChange} />
        </div>
        <input name="email" placeholder="Email" type="email" required className="w-full p-2 bg-black border-b border-gray-500" onChange={handleChange} />
        <input name="subject" placeholder="Subject" required className="w-full p-2 bg-black border-b border-gray-500" onChange={handleChange} />
        <textarea name="message" placeholder="Message" required rows={4} className="w-full p-2 bg-black border-b border-gray-500" onChange={handleChange}></textarea>
        <button type="submit" className="border border-yellow-600 text-yellow-600 px-6 py-2">Send</button>
      </form>
    </main>
  );
}
