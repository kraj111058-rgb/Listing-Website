export interface ListingFaqItem {
  id: string;
  listingId: string;
  question: string;
  answer: string;
  createdAt: string;
  isActive?: boolean;
}

export const initialListingFaqs: ListingFaqItem[] = [
  {
    id: "faq-1",
    listingId: "lst-1",
    question: "What are the check-in and check-out timings at Royal Palace?",
    answer:
      "Standard check-in is from 2:00 PM onwards, and check-out is until 11:00 AM. Early check-in and late check-out are subject to availability upon request.",
    createdAt: "15 Jan 2026",
    isActive: true,
  },
  {
    id: "faq-2",
    listingId: "lst-1",
    question: "Is private valet parking available for resort guests?",
    answer:
      "Yes, complimentary 24/7 valet parking is provided inside the palace grounds for all resident and dining guests with EV charging stations.",
    createdAt: "18 Jan 2026",
    isActive: true,
  },
  {
    id: "faq-3",
    listingId: "lst-1",
    question: "Do you arrange airport pick-up and drop transfers?",
    answer:
      "Yes, we offer luxury sedan and SUV airport transfers from Jaipur International Airport (JAI). You can request this during booking or contact our concierge 24 hours prior.",
    createdAt: "22 Jan 2026",
    isActive: true,
  },
  {
    id: "faq-4",
    listingId: "lst-1",
    question: "Are pets allowed in the resort suites?",
    answer:
      "We welcome pets in designated garden villas and ground-floor suites. Please notify our reservations desk in advance so we can prepare pet amenities.",
    createdAt: "02 Feb 2026",
    isActive: false,
  },
  {
    id: "faq-5",
    listingId: "lst-2",
    question: "Do I need a prior appointment to consult a specialist doctor?",
    answer:
      "Prior appointment is recommended to avoid waiting times. However, walk-in patients and emergency consultations are attended 24/7 at our triage counter.",
    createdAt: "10 Feb 2026",
    isActive: true,
  },
  {
    id: "faq-6",
    listingId: "lst-2",
    question: "Are digital pathology and radiology reports available online?",
    answer:
      "Yes, test reports are uploaded within 4–6 hours on our patient portal and dispatched via WhatsApp and email automatically.",
    createdAt: "12 Feb 2026",
    isActive: true,
  },
];
