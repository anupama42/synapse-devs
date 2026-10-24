export interface Person {
  name: string;
  role: string;
  bio: string;
  photo?: string;
}

export const aboutContent = {
  heading: 'Anupama & Shreya',
  story:
    'Anupama & Shreya have more than five years of experience in the IT industry. We work as one team on projects that need website development — from first brief to a live site you can click. Same stack, same backlog, no split of “who owns what.”',
  note: 'Fixed packages or a scoped quote — we confirm the shape of work before we write a line.',
  photo: '',
  photoAlt: '',
  people: [
    {
      name: 'Anupama',
      role: 'Software engineer',
      bio: 'Anupama is one half of SynapseDevs. She and Shreya share the same stack and the same backlog: interfaces, APIs, data, and launch. Every project is treated as a live demo of craft — real deployments, not mockups.',
    },
    {
      name: 'Shreya Singh',
      role: 'Software engineer',
      bio: 'Shreya Singh is the other half of SynapseDevs. She and Anupama work as one delivery unit — one conversation, one quality bar, mixed across the product rather than split by specialty. Together they take briefs through to something you can click.',
    },
  ] as Person[],
};
