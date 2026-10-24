export interface Testimonial {
  name: string;
  business: string;
  city: string;
  quote: string;
  photo?: string;
  beforeAfter?: string;
  whatsappScreenshot?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Ajeet Kumar',
    business: '',
    city: '',
    quote:
      'I took their service to build the website for my shop. They listened to what I actually needed, and the work was good. People can open the site on their phone and message me from there.',
  },
  {
    name: 'Shobha Mishra',
    business: '',
    city: '',
    quote:
      'I gave them my own photos and they made the flyers. The work was good, it look neat on Instagram and I posted it the same evening.',
  },
  {
    name: 'Jyoti Prasad',
    business: '',
    city: '',
    quote:
      'I took the ad service for a sale week. The designs were easy to read and the work was good. We got more messages than we usually do from a post.',
  },
  {
    name: 'Poonam Singh',
    business: '',
    city: '',
    quote:
      'They build our website and also set the pages so customers can see the work and call us. Work was good. My sister checked it on her phone and said it is simple.',
  },
];
