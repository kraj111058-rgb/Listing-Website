export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  about?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  categorySlug: string;
  author: BlogAuthor;
  date: string;
  image: string;
  tags: string[];
  views: number;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

export const blogCategories: BlogCategory[] = [
  { name: "All", slug: "all", count: 8 },
  { name: "Local SEO", slug: "local-seo", count: 3 },
  { name: "Directory Guides", slug: "directory-guides", count: 2 },
  { name: "Business Growth", slug: "business-growth", count: 1 },
  { name: "Marketing & Branding", slug: "marketing-branding", count: 1 },
  { name: "Success Stories", slug: "success-stories", count: 1 },
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    slug: "how-free-business-listing-boosts-local-seo-india-2026",
    title: "How Free Business Listing Boosts Your Local SEO in India (2026 Guide)",
    excerpt: "Discover how high-authority directory listings improve search rankings, drive authentic local customers, and provide high-quality do-follow backlinks.",
    content: [
      "In today's hyper-competitive digital landscape, getting discovered by local consumers in India is crucial for sustained growth. Whether you operate a clinic in Mumbai, a tech agency in Bangalore, or a boutique in Jaipur, having a robust local search presence is often the difference between overflowing footfall and empty premises.",
      "Business directories serve as high-authority citation sources that search engines like Google use to verify your brand's existence, physical location, and operational credibility. When multiple reputable directories corroborate your Name, Address, and Phone number (NAP), search engines reward your website with higher local pack rankings.",
      "Beyond raw citations, verified listings on platforms like IndianListingBucket grant businesses valuable do-follow backlinks. These links boost your domain rating, funneling organic link equity to your main website and signaling strong topical authority.",
      "To maximize your listing ROI: ensure your business category is laser-focused, upload high-resolution store and logo photos, list comprehensive operational hours, and encourage satisfied customers to leave genuine 5-star ratings and reviews."
    ],
    category: "Local SEO",
    categorySlug: "local-seo",
    author: {
      name: "Rajesh Kumar",
      role: "Head of SEO & Growth",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      about: "Digital marketing strategist with over 8 years of experience helping local businesses across India scale their organic visibility, Google rankings, and high-converting citation profiles.",
    },
    date: "Oct 05, 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    tags: ["Local SEO", "Backlinks", "Google Ranking", "Directory Listing"],
    views: 3420,
  },
  {
    id: "blog-2",
    slug: "top-10-business-listing-sites-india-free-backlinks",
    title: "Top 10 High DA Business Listing Sites in India for Free Backlinks",
    excerpt: "A curated checklist of high-domain-authority directories to submit your business profile, build clean do-follow backlinks, and boost local rankings.",
    content: [
      "Building high-quality backlinks is one of the hardest challenges for small business owners in India. Luckily, reputable local business directories offer an organic and completely white-hat way to earn authoritative backlinks while simultaneously reaching ready-to-buy consumers.",
      "When curating directory sites for submissions, focus on platforms with high domain authority, minimal spam scores, fast indexing times, and active human moderation. Submitting to low-quality, automated link farms can actually penalize your rankings.",
      "IndianListingBucket tops the list by offering free verified business profiles, dedicated category and city pages, instant OTP onboarding, and do-follow profile links that index seamlessly in Google search.",
      "Follow a systematic schedule: claim 2 to 3 quality directory listings each week rather than submitting everywhere in a single afternoon. Natural, steady citation acquisition looks far more authentic to search engine crawlers."
    ],
    category: "Directory Guides",
    categorySlug: "directory-guides",
    author: {
      name: "Pooja Sharma",
      role: "Content Marketing Lead",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      about: "Content marketing lead specializing in organic growth, high-converting copy, and directory distribution strategies for Indian MSMEs.",
    },
    date: "Oct 03, 2026",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80",
    tags: ["Backlinks", "Directory Guides", "SEO Checklist"],
    views: 2890,
  },
  {
    id: "blog-3",
    slug: "google-business-profile-vs-directory-listing-why-you-need-both",
    title: "Google Business Profile vs Directory Listing: Why You Need Both",
    excerpt: "Why relying solely on Google Maps leaves money on the table, and how multi-platform citations create an unbeatable local moat.",
    content: [
      "Many founders believe that creating a Google Business Profile (GBP) is all they need for local visibility. While GBP is essential, relying solely on a single platform puts your entire business at the mercy of sudden algorithm changes or unexpected suspensions.",
      "Google's ranking algorithm doesn't evaluate your business in isolation. It scours third-party business directories, review portals, and industry hubs to confirm whether the business information on your GBP is corroborated elsewhere on the internet.",
      "Consumers also research providers through diverse channels. Prospective clients browsing specialized categories on IndianListingBucket are frequently in high-intent research mode, comparing ratings, services, and locations before making a phone call.",
      "By combining an active GBP with verified directory listings, you create a synchronized web presence that captures leads across multiple touchpoints and signals undeniable authenticity to search engines."
    ],
    category: "Local SEO",
    categorySlug: "local-seo",
    author: {
      name: "Amit Verma",
      role: "Digital Strategist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      about: "Digital strategist helping brands maximize their local presence and lead generation across search engines, business directories, and social platforms.",
    },
    date: "Sep 28, 2026",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    tags: ["Google Business Profile", "Local SEO", "Multi-Platform"],
    views: 1940,
  },
  {
    id: "blog-4",
    slug: "nap-consistency-secret-to-ranking-number-one-local-search",
    title: "NAP Consistency: The Secret to Ranking #1 in Local Search",
    excerpt: "Name, Address, and Phone number mismatches confuse search engines. Here's how to audit and fix your local citations step-by-step.",
    content: [
      "NAP stands for Name, Address, and Phone number. In the world of local search engine optimization, NAP consistency is the bedrock upon which all local rankings are built.",
      "Imagine if your company is listed as 'Tech Solutions Pvt Ltd' on Google, but 'TechSolutions Solutions' on a directory, with differing suite numbers or alternate contact numbers. Algorithms get confused about whether these represent one entity or separate branches.",
      "When search algorithms detect discrepancies, their confidence in your business's data drops, causing your listing to slip out of the coveted top 3 map pack positions.",
      "Conduct a biannual citation audit: standardize your official business spelling, choose a primary landline or mobile contact, and keep suite or road names consistent across every platform where your company is listed."
    ],
    category: "Local SEO",
    categorySlug: "local-seo",
    author: {
      name: "Rajesh Kumar",
      role: "Head of SEO & Growth",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      about: "Digital marketing strategist with over 8 years of experience helping local businesses across India scale their organic visibility, Google rankings, and high-converting citation profiles.",
    },
    date: "Sep 25, 2026",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
    tags: ["NAP Consistency", "Local SEO", "Audit Guide"],
    views: 1620,
  },
  {
    id: "blog-5",
    slug: "5-common-mistakes-businesses-make-online-listing-submission",
    title: "5 Common Mistakes Businesses Make When Submitting Online Listings",
    excerpt: "From incomplete descriptions to missing business hours, avoid these frequent submission pitfalls that delay verification and hurt conversions.",
    content: [
      "Listing your business online is one of the highest-leverage, zero-cost marketing activities available. Yet over 60% of business submissions fail to reach their full potential due to simple, avoidable oversights.",
      "Mistake 1: Leaving descriptions thin or generic. A 20-word generic summary fails to target primary keywords that customers search for.",
      "Mistake 2: Missing high-res imagery. Profiles with clear storefront images, team photos, and brand logos receive over 3.5x more clicks than profiles with blank placeholders.",
      "Mistake 3: Wrong category assignment. Categorizing a dental clinic under generic 'Business Services' rather than 'Health & Beauty > Dental Clinic' deprives you of relevant local search queries.",
      "Mistake 4: Neglecting operational hours. Customers need to know when you're open. Leaving hours blank leads to frustrated calls and lost sales.",
      "Mistake 5: Failing to claim ownership. Always complete the verification step via OTP so you retain full control over your business details and review responses."
    ],
    category: "Directory Guides",
    categorySlug: "directory-guides",
    author: {
      name: "Neha Patel",
      role: "Community & Onboarding Specialist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      about: "Onboarding specialist focused on helping small business owners get verified quickly, audit local citations, and leverage directory listings.",
    },
    date: "Sep 20, 2026",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
    tags: ["Best Practices", "Listing Tips", "Verification"],
    views: 2150,
  },
  {
    id: "blog-6",
    slug: "jaipur-boutique-case-study-300-percent-footfall-growth",
    title: "How a Local Jaipur Boutique Increased Footfall by 300% via Directory Listings",
    excerpt: "Real-world case study: How a small apparel store leveraged local directory visibility and customer reviews to drive massive in-store traffic.",
    content: [
      "When Meera opened 'Royal Heritage Silks' in C-Scheme, Jaipur, she faced severe competition from legacy cloth merchants in the city's old bazaars. Traditional billboard advertising was far outside her monthly budget.",
      "Instead of expensive offline print media, Meera focused entirely on hyper-local digital visibility. She claimed free profiles on IndianListingBucket, uploaded stunning photography of handloom sarees, and added exact landmark directions.",
      "Within 90 days, tourists and wedding shoppers searching for 'authentic handloom silk boutique in Jaipur' were finding her listing on page 1. With over 40 genuine verified reviews, trust soared.",
      "Result: An estimated 300% surge in monthly footfall and over 120 direct phone calls inquiring about custom tailoring services, all achieved with zero paid ad spend."
    ],
    category: "Success Stories",
    categorySlug: "success-stories",
    author: {
      name: "Vikram Singhania",
      role: "MSME Success Manager",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      about: "MSME growth advisor dedicated to helping retail brands and local service providers scale footfall and revenue with zero-cost marketing strategies.",
    },
    date: "Sep 15, 2026",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80",
    tags: ["Case Study", "Success Stories", "MSME Growth"],
    views: 2780,
  },
  {
    id: "blog-7",
    slug: "how-to-get-more-customer-reviews-and-turn-leads-into-buyers",
    title: "How to Get More Inquiries and Customer Reviews for Your Business",
    excerpt: "Actionable frameworks to turn directory visitors into paying clients and earn authentic 5-star customer reviews consistently.",
    content: [
      "Customer reviews are the digital equivalent of word-of-mouth recommendations. In fact, 88% of Indian consumers read online reviews before contacting a local service provider or visiting a retail venue.",
      "The simplest way to get reviews is also the most overlooked: just ask at the moment of peak customer satisfaction. When a customer compliments your service or finishes a successful transaction, prompt them with a quick direct link to your listing.",
      "Responding to reviews is equally critical. Always thank customers for positive feedback, and address critical reviews politely and constructively with a resolution offer. Prospective customers judge your professionalism based on how you handle feedback.",
      "Add a WhatsApp quick-chat button or direct call button to your listing profile so interested prospects can contact your sales representative in a single tap."
    ],
    category: "Business Growth",
    categorySlug: "business-growth",
    author: {
      name: "Pooja Sharma",
      role: "Content Marketing Lead",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      about: "Content marketing lead specializing in organic growth, high-converting copy, and directory distribution strategies for Indian MSMEs.",
    },
    date: "Sep 10, 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
    tags: ["Customer Reviews", "Lead Generation", "Business Growth"],
    views: 1840,
  },
  {
    id: "blog-8",
    slug: "digital-marketing-budget-free-strategies-indian-msmes-2026",
    title: "Digital Marketing on a Budget: Free Strategies for Indian MSMEs in 2026",
    excerpt: "Practical, cost-effective digital marketing tactics every Indian small business owner can implement today without high ad spend.",
    content: [
      "Starting and scaling an MSME in India requires strategic budget allocation. While venture-backed enterprises can spend lakhs on pay-per-click advertising, small business owners need cost-effective organic strategies with compounding returns.",
      "Strategy 1: Free directory syndication. Submitting your verified profile to reputable regional and national directories ensures you capture long-tail search traffic permanently without recurring media spend.",
      "Strategy 2: Content marketing and local FAQs. Answering common questions your target clients ask establishes your firm as a subject matter authority.",
      "Strategy 3: Google Maps optimization and geo-tagged media. Regularly uploading photos from your job sites or storefront reinforces your geographic relevance in Google algorithms.",
      "Strategy 4: Strategic local partnerships. Cross-promoting with complementary local non-competing businesses (such as an interior designer teaming up with a tile vendor) multiplies your customer base instantly."
    ],
    category: "Marketing & Branding",
    categorySlug: "marketing-branding",
    author: {
      name: "Amit Verma",
      role: "Digital Strategist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      about: "Digital strategist helping brands maximize their local presence and lead generation across search engines, business directories, and social platforms.",
    },
    date: "Sep 05, 2026",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    tags: ["MSME", "Digital Marketing", "Budget Growth"],
    views: 3110,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const normalized = decodeURIComponent(slug).toLowerCase().trim();
  return blogPosts.find((p) => p.slug.toLowerCase() === normalized || p.slug === slug);
}

export function getRelatedBlogPosts(currentSlug: string, categorySlug: string, limit = 3): BlogPost[] {
  const related = blogPosts.filter(
    (p) => p.slug !== currentSlug && p.categorySlug === categorySlug
  );
  if (related.length < limit) {
    const extra = blogPosts.filter(
      (p) => p.slug !== currentSlug && !related.some((r) => r.id === p.id)
    );
    return [...related, ...extra].slice(0, limit);
  }
  return related.slice(0, limit);
}

