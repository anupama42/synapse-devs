require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

function loadSeed() {
  const id = require.resolve('./data/seed');
  delete require.cache[id];
  return require('./data/seed');
}

let seed = loadSeed();
const { sendContactEmail, CONTACT_EMAIL } = require('./mailer');
const { Project, Message } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/synapsedevs';

app.use(cors({
  origin: 'https://synapse-devs.netlify.app',
  credentials: true // only if you're using cookies/auth; omit if not
}));
app.use(express.json());
app.use('/live', express.static(path.join(__dirname, '../public/live')));

let mongoReady = false;
let memoryProjects = seed.projects.map((p, i) => ({ ...p, _id: String(i + 1) }));
const memoryMessages = [];

async function connectMongo() {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2500 });
    mongoReady = true;
    const count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany(seed.projects);
    }
    console.log('MongoDB connected:', MONGODB_URI);
  } catch (err) {
    mongoReady = false;
    console.warn('MongoDB unavailable — using in-memory seed so the site still runs.');
    console.warn(err.message);
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mongo: mongoReady, brand: 'SynapseDevs' });
});

app.get('/api/site', (_req, res) => {
  seed = loadSeed();
  res.json({
    site: seed.site,
    team: seed.team,
    services: seed.services,
    skills: seed.skills,
    showTestimonials: seed.site.showTestimonials,
  });
});

app.get('/api/projects', async (_req, res) => {
  try {
    if (mongoReady) {
      const projects = await Project.find().sort({ order: 1 }).lean();
      return res.json(projects);
    }
    res.json([...memoryProjects].sort((a, b) => a.order - b.order));
  } catch (err) {
    res.status(500).json({ error: 'Could not load projects' });
  }
});

app.get('/api/projects/:slug', async (req, res) => {
  try {
    const project = mongoReady
      ? await Project.findOne({ slug: req.params.slug }).lean()
      : memoryProjects.find((p) => p.slug === req.params.slug);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Could not load project' });
  }
});

app.post('/api/contact', async (req, res) => {
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').trim();
  const message = String(req.body.message || '').trim();
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email, like name@gmail.com.' });
  }
  try {
    if (mongoReady) {
      await Message.create({ name, email, message });
    } else {
      memoryMessages.push({ name, email, message, createdAt: new Date() });
    }
    const delivery = await sendContactEmail({ name, email, message });
    res.status(201).json({
      ok: true,
      emailedTo: CONTACT_EMAIL,
      via: delivery.via,
      needsActivation: Boolean(delivery.needsActivation),
    });
  } catch (err) {
    console.error('Contact delivery failed:', err.message);
    res.status(502).json({
      error: 'Message was not emailed. Try again, or write synapsedevs94@gmail.com directly.',
    });
  }
});

app.listen(PORT, async () => {
  await connectMongo();
  console.log(`SynapseDevs API on http://localhost:${PORT}`);
});
