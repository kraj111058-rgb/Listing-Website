"use client";

import { InputWithLabel, SelectWithLabel, TextareaWithLabel } from "@/components/common";
import { Button } from "@/components/ui/button";
import { contactFormSchema, type ContactFormValues } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

const subjectOptions = [
  { value: "General Inquiry", label: "General Inquiry" },
  { value: "Listing Support", label: "Listing Support" },
  { value: "Technical Issue", label: "Technical Issue" },
  { value: "Business Partnership", label: "Business Partnership" },
  { value: "Advertising & Sponsorship", label: "Advertising & Sponsorship" },
  { value: "Other", label: "Other" },
];

export function ContactForm() {

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (_data: ContactFormValues) => {
    // Simulate network submission
    await new Promise((resolve) => setTimeout(resolve, 800));
    reset();
  };

  return (
    <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
        Send us a message
      </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <InputWithLabel
                  id="name"
                  label="Your Name"
                  placeholder="Rahul Sharma"
                  error={errors.name?.message}
                  disabled={isSubmitting}
                  {...field}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputWithLabel
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="rahul@email.com"
                  error={errors.email?.message}
                  disabled={isSubmitting}
                  {...field}
                />
              )}
            />
          </div>

          {/* Row 2: Mobile Phone Number */}
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="contact-phone"
                type="tel"
                label="Mobile Number"
                placeholder="98765 43210"
                error={errors.phone?.message}
                disabled={isSubmitting}
                {...field}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(value);
                }}
              />
            )}
          />

          {/* Row 3: Subject Dropdown */}
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <SelectWithLabel
                id="subject"
                label="Subject"
                placeholder="Select a topic"
                value={field.value}
                onValueChange={field.onChange}
                options={subjectOptions}
                error={errors.subject?.message}
              />
            )}
          />

          {/* Row 3: Message */}
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextareaWithLabel
                id="message"
                label="Message"
                rows={5}
                placeholder="Describe your query in detail..."
                error={errors.message?.message}
                {...field}
              />
            )}
          />

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 hover:shadow-lg hover:-translate-y-0.5 h-11"
            >
              <Send size={16} />
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            </Button>
          </div>
        </form>
    </div>
  );
}
