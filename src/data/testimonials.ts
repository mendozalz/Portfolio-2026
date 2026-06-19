export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  companyUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'nick',
    quote:
      "The sandbox SDK is a core part of our infrastructure at Iterate. It's made giving our agents a 'computer' really easy to do, saving us weeks of effort. The team has been very responsive and helpful when dealing with us throughout the implementation process.",
    name: 'Nick Blow',
    role: 'Founding Engineer',
    company: 'Iterate',
  },
  {
    id: 'seve',
    quote:
      'The developer experience is well-thought-out and built on layers of nice abstractions you can override as needed.',
    name: 'Seve Ibarluzea',
    role: 'Co-Founder',
    company: 'tscircuit.com',
    companyUrl: 'https://tscircuit.com',
  },
  {
    id: 'dominic',
    quote:
      'Sandbox SDK let us to remove ~12k lines of orchestration code and significantly improved our sandbox startup times. The APIs + docs are best-in-class and their team has been an absolute joy to work with.',
    name: 'Dominic Whyte',
    role: 'Co-Founder',
    company: 'Zite',
  },
];
