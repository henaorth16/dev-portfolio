"use client";

import React, { useState, useEffect } from "react";

export default function ContactForm() {
  const [budget, setBudget] = useState("Not specified");
  const [contactSettings, setContactSettings] = useState({ email: "davemak4621@gmail.com", budget_options: "Not specified, 5K-10K, 10K-20K, 20K-50K, 50K+" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    fetch('/api/contact-settings')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setContactSettings(data);
          // Set initial budget to the first option
          const options = data.budget_options.split(",").map((s: string) => s.trim());
          if (options.length > 0) setBudget(options[0]);
        }
      })
      .catch(console.error);
  }, []);

  const budgetOptionsList = contactSettings.budget_options.split(",").map(s => s.trim()).filter(Boolean);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("");

    if (!validateEmail(formData.email)) {
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          subject: formData.subject,
          budget: budget,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatusMessage("Message sent successfully!");
        setFormData({ name: "", company: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(result.error || "Failed to send message.");
      }
    } catch (error) {
      console.error("FAILED...", error);
      setStatusMessage("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto py-1 px-4">
      {/* Header */}
      <div className="text-center mb-7 space-y-2">
        <p className="text-muted-foreground text-sm font-light">Contact me at</p>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
          {contactSettings.email}
        </h2>
        <p className="text-muted-foreground text-sm font-light">or fill out the form</p>
      </div>

      {/* Form Container */}
      <div className="w-full bg-white border border-gray-100 rounded-2xl p-10 md:p-16">
        <form className="space-y-12" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Name */}
            <div className="space-y-3">
              <label htmlFor="name" className="text-foreground">
                Name*
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border-b border-gray-200 py-2 placeholder:text-gray-400 placeholder:font-light focus:border-foreground outline-none transition-colors bg-transparent text-lg"
                required
              />
            </div>
            {/* Company / Project */}
            <div className="space-y-3">
              <label htmlFor="company" className="text-foreground">
                Company / Project
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company or Project Name"
                className="w-full border-b border-gray-200 py-2 placeholder:text-gray-400 placeholder:font-light focus:border-foreground outline-none transition-colors bg-transparent text-lg"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label htmlFor="email" className="text-foreground">
              Email*
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full border-b border-gray-200 py-2 placeholder:text-gray-400 placeholder:font-light focus:border-foreground outline-none transition-colors bg-transparent text-lg"
              required
            />
          </div>

          {/* Subject */}
          <div className="space-y-3">
            <label htmlFor="subject" className="text-foreground">
              Subject*
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What do you need?"
              className="w-full border-b border-gray-200 py-2 placeholder:text-gray-400 placeholder:font-light focus:border-foreground outline-none transition-colors bg-transparent text-lg"
              required
            />
          </div>

          {/* Budget */}
          <div className="space-y-5">
            <label className="text-foreground">Budget</label>
            <div className="flex flex-wrap gap-3">
              {budgetOptionsList.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setBudget(option)}
                  className={`px-6 py-2.5 text-sm rounded-md border transition-all duration-200 ${
                    budget === option
                      ? "bg-[#e5e5e5] border-gray-300 text-foreground font-medium"
                      : "bg-white border-gray-300 text-gray-500 hover:border-gray-400"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <label htmlFor="message" className="text-foreground">
              Message*
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your needs here."
              rows={8}
              className="w-full border border-gray-300 rounded-lg p-5 placeholder:text-gray-400 placeholder:font-light focus:border-foreground outline-none transition-colors bg-transparent resize-none text-lg"
              required
            />
          </div>

          {statusMessage && (
            <div className={`text-sm font-medium ${statusMessage.includes("success") ? "text-green-600" : "text-red-500"}`}>
              {statusMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#111111] text-white py-5 rounded-lg text-lg font-medium hover:bg-black transition-all mt-4 active:scale-[0.99] ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
