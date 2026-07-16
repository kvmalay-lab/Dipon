import { drizzle } from 'drizzle-orm/node-postgres';
import fs from 'fs';
const mapping = JSON.parse(fs.readFileSync('image_mapping.json', 'utf-8'));
import { Pool } from 'pg';
import * as schema from './src/db/schema.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function main() {
  console.log('Clearing database tables...');
  
  // Order of deletion to avoid foreign key violation issues if any constraints exist
  await db.delete(schema.projectImages);
  await db.delete(schema.projects);
  await db.delete(schema.divisions);
  await db.delete(schema.applications);
  await db.delete(schema.careers);
  await db.delete(schema.contactInquiries);
  await db.delete(schema.offices);
  await db.delete(schema.countries);
  await db.delete(schema.leaders);
  await db.delete(schema.news);
  await db.delete(schema.clients);
  await db.delete(schema.awards);
  await db.delete(schema.certifications);
  await db.delete(schema.downloads);
  await db.delete(schema.seo);
  await db.delete(schema.homepage);
  await db.delete(schema.settings);
  await db.delete(schema.users);
  await db.delete(schema.roles);

  console.log('Seeding database roles and users...');
  
  const isProduction = process.env.NODE_ENV === 'production';
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (isProduction && !adminPassword) {
    console.error('FATAL ERROR: ADMIN_PASSWORD environment variable must be set in production.');
    process.exit(1);
  }

  const passwordToUse = adminPassword || 'admin123';
  if (!adminPassword) {
    console.warn('WARNING: No ADMIN_PASSWORD environment variable set. Using default password "admin123".');
  }

  // Create admin role
  const roleId = uuidv4();
  await db.insert(schema.roles).values({
    id: roleId,
    name: 'Super Admin',
  });

  // Create admin user
  const passwordHash = await bcrypt.hash(passwordToUse, 10);
  await db.insert(schema.users).values({
    id: uuidv4(),
    firstName: 'System',
    lastName: 'Administrator',
    email: 'admin@dipongroup.com',
    passwordHash,
    roleId: roleId,
  });

  console.log('Seeding countries...');
  const countryMap: Record<string, string> = {
    BD: uuidv4(),
    IN: uuidv4(),
    MY: uuidv4(),
    SG: uuidv4(),
    AE: uuidv4(),
  };

  await db.insert(schema.countries).values([
    { id: countryMap.BD, name: 'Bangladesh', code: 'BD' },
    { id: countryMap.IN, name: 'India', code: 'IN' },
    { id: countryMap.MY, name: 'Malaysia', code: 'MY' },
    { id: countryMap.SG, name: 'Singapore', code: 'SG' },
    { id: countryMap.AE, name: 'United Arab Emirates', code: 'AE' },
  ]);

  console.log('Seeding global offices...');
  await db.insert(schema.offices).values([
    {
      id: uuidv4(),
      name: 'Bangladesh HQ',
      countryId: countryMap.BD,
      address: 'Rangs FC Enclave, Level 3, 4, 10 & 11, Plot #6/A, Road 32, Gulshan, Dhaka 1212',
      phone: '+880-2-9606501115',
      email: 'info@dipongroup.com',
      isHeadquarter: true,
    },
    {
      id: uuidv4(),
      name: 'New Delhi Office',
      countryId: countryMap.IN,
      address: '42, Community Centre, Saket, New Delhi 110017',
      phone: '+91-11-2696-7777',
      email: 'india@dipongroup.com',
      isHeadquarter: false,
    },
    {
      id: uuidv4(),
      name: 'Kuala Lumpur Office',
      countryId: countryMap.MY,
      address: 'Level 15, Menara Binjai, No. 2 Jalan Binjai, 50450 KL',
      phone: '+60 3 2181 1234',
      email: 'malaysia@dipongroup.com',
      isHeadquarter: false,
    },
    {
      id: uuidv4(),
      name: 'Singapore Office',
      countryId: countryMap.SG,
      address: '10 Anson Road, #26-04 International Plaza, Singapore 079903',
      phone: '+65 6220 1234',
      email: 'singapore@dipongroup.com',
      isHeadquarter: false,
    },
    {
      id: uuidv4(),
      name: 'Dubai Office',
      countryId: countryMap.AE,
      address: 'Office 702, Onyx Tower 1, The Greens, Dubai',
      phone: '+971 4 399 1234',
      email: 'uae@dipongroup.com',
      isHeadquarter: false,
    },
  ]);

  console.log('Seeding business divisions...');
  const divisionMap = {
    engineering: uuidv4(),
    it: uuidv4(),
    shipping: uuidv4(),
    investment: uuidv4(),
  };

  await db.insert(schema.divisions).values([
    {
      id: divisionMap.engineering,
      slug: 'engineering',
      title: 'Engineering & Construction',
      description: 'Pipelines, power plants, chemical plants, process plants, and mega industrial works.',
      heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=2835&auto=format&fit=crop',
      overview: 'Since 1970, Dipon Group has been a pioneer in pipeline construction and heavy engineering. We deliver complex infrastructure projects with international scale and technical precision.',
    },
    {
      id: divisionMap.it,
      slug: 'it',
      title: 'IT & ITES',
      description: 'Identity solutions, national public key infrastructure, smart cards, and data centers.',
      heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2834&auto=format&fit=crop',
      overview: 'Our IT division drives digital transformation across governments and enterprises, specializing in secure identity management, national PKI infrastructure, and state-of-the-art data centers.',
    },
    {
      id: divisionMap.shipping,
      slug: 'shipping',
      title: 'Shipping & Logistics',
      description: 'Marine logistics, shipping of bulk construction materials, and salvage operations.',
      heroImage: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2940&auto=format&fit=crop',
      overview: 'With a robust fleet of marine vessels and heavy logistics equipment, we support major offshore and coastal infrastructure projects across South Asia and the Middle East.',
    },
    {
      id: divisionMap.investment,
      slug: 'investment',
      title: 'Investment & Project Development',
      description: 'Infrastructure project development, PPP models, and strategic long-term investments.',
      heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop',
      overview: 'We actively invest in and develop high-impact infrastructure projects, partnering with global financial institutions and governments to deliver sustainable value.',
    },
  ]);

  console.log('Seeding projects...');
  await db.insert(schema.projects).values([
    // Existing engineering projects using mapping for hero images
    {
      id: uuidv4(),
      slug: 'bibiyana-gas-plant',
      title: 'Bibiyana Gas Processing Plant',
      shortDescription: "EPC pipeline and facility construction for Chevron's major gas field.",
      overview: 'Dipon Group successfully executed the mechanical, piping, and structural works for the Bibiyana Gas Expansion Project, ensuring adherence to world-class safety and quality standards.',
      divisionId: divisionMap.engineering,
      status: 'published',
      featured: true,
      heroImage: mapping['/engineering-construction/'],
      thumbnail: mapping['/engineering-construction/'],
    },
    {
      id: uuidv4(),
      slug: 'maheshkhali-anwara-gas-transmission',
      title: 'Maheshkhali-Anwara Gas Transmission',
      shortDescription: 'Laying high-pressure gas grid pipelines across challenging delta terrains.',
      overview: 'Successfully executed cross-country pipeline laying of 30-inch and 42-inch gas transmission lines for GTCL under tight project deadlines and complex soil conditions.',
      divisionId: divisionMap.engineering,
      status: 'published',
      featured: true,
      heroImage: mapping['/engineering-construction/'],
      thumbnail: mapping['/engineering-construction/'],
    },
    {
      id: uuidv4(),
      slug: 'maitree-super-thermal-power-project',
      title: 'Maitree Super Thermal Power Project',
      shortDescription: 'Erection and structural works for the 1320 MW coal-fired power station.',
      overview: 'Completed major civil foundation, mechanical piping erection, and commissioning assistance for the flagship joint-venture power plant in Rampal, Bagerhat.',
      divisionId: divisionMap.engineering,
      status: 'published',
      featured: false,
      heroImage: mapping['/engineering-construction/'],
      thumbnail: mapping['/engineering-construction/'],
    },
    // Existing IT projects
    {
      id: uuidv4(),
      slug: 'national-id-guinea',
      title: 'National ID and Population Management',
      shortDescription: 'End-to-end digital identity solution for the Republic of Guinea.',
      overview: 'A landmark IT project delivering secure biometric enrollment, national registry database, and smart card issuance for millions of citizens under a 15-year concession.',
      divisionId: divisionMap.it,
      status: 'published',
      featured: true,
      heroImage: mapping['/it-ites/'],
      thumbnail: mapping['/it-ites/'],
    },
    {
      id: uuidv4(),
      slug: '100-mw-hfo-power-plant',
      title: '100 MW HFO Power Plant',
      shortDescription: 'EPC dual-fuel power generation site construction in Jamalpur.',
      overview: 'Completed fast-track design, logistics shipping, mechanical assembly, and grid integration of a 100 megawatt heavy fuel oil power plant for Powerpac Mutiara.',
      divisionId: divisionMap.engineering,
      status: 'published',
      featured: false,
      heroImage: mapping['/engineering-construction/'],
      thumbnail: mapping['/engineering-construction/'],
    },
    {
      id: uuidv4(),
      slug: 'e-passport-project',
      title: 'E-Passport Project',
      shortDescription: 'National electronic passport management and biometric authentication systems.',
      overview: 'Integrated automated border control gates, secure chip personalization centers, and biometric registration kiosks across regional passport offices.',
      divisionId: divisionMap.it,
      status: 'published',
      featured: false,
      heroImage: mapping['/it-ites/'],
      thumbnail: mapping['/it-ites/'],
    },
    // New missing projects (display order logical continuation)
    {
      id: uuidv4(),
      slug: 'omera-lpg-terminal',
      title: 'Omera LPG Terminal',
      shortDescription: 'Construction and commissioning of LPG storage and regasification terminal.',
      overview: 'Delivered a state-of-the‑state LPG terminal for Omera Petroleum, enabling safe storage and distribution of LPG across Bangladesh.',
      divisionId: divisionMap.engineering,
      status: 'published',
      featured: false,
      heroImage: mapping['/engineering-construction/'],
      thumbnail: mapping['/engineering-construction/'],
    },
    {
      id: uuidv4(),
      slug: 'main-gas-grid-lines',
      title: 'Main Gas Grid Lines',
      shortDescription: 'Expansion of national high‑pressure gas transmission network.',
      overview: 'Implemented extensive pipeline works to interconnect major gas fields with consumer hubs, enhancing supply reliability.',
      divisionId: divisionMap.engineering,
      status: 'published',
      featured: false,
      heroImage: mapping['/engineering-construction/'],
      thumbnail: mapping['/engineering-construction/'],
    },
    {
      id: uuidv4(),
      slug: 'fishermen-id-card-program',
      title: 'Fishermen ID Card Program',
      shortDescription: 'Digital identity issuance for fishermen communities.',
      overview: 'Developed a mobile‑first ID issuance platform enabling safe access to financial services for coastal fishing populations.',
      divisionId: divisionMap.it,
      status: 'published',
      featured: false,
      heroImage: mapping['/it-ites/'],
      thumbnail: mapping['/it-ites/'],
    },
  ]);

    {
      id: uuidv4(),
      slug: 'bibiyana-gas-plant',
      title: 'Bibiyana Gas Processing Plant',
      shortDescription: 'EPC pipeline and facility construction for Chevron\'s major gas field.',
      overview: 'Dipon Group successfully executed the mechanical, piping, and structural works for the Bibiyana Gas Expansion Project, ensuring adherence to world-class safety and quality standards.',
      divisionId: divisionMap.engineering,
      status: 'published',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=2940&auto=format&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: uuidv4(),
      slug: 'maheshkhali-anwara-gas-transmission',
      title: 'Maheshkhali-Anwara Gas Transmission',
      shortDescription: 'Laying high-pressure gas grid pipelines across challenging delta terrains.',
      overview: 'Successfully executed cross-country pipeline laying of 30-inch and 42-inch gas transmission lines for GTCL under tight project deadlines and complex soil conditions.',
      divisionId: divisionMap.engineering,
      status: 'published',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2940&auto=format&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: uuidv4(),
      slug: 'maitree-super-thermal-power-project',
      title: 'Maitree Super Thermal Power Project',
      shortDescription: 'Erection and structural works for the 1320 MW coal-fired power station.',
      overview: 'Completed major civil foundation, mechanical piping erection, and commissioning assistance for the flagship joint-venture power plant in Rampal, Bagerhat.',
      divisionId: divisionMap.engineering,
      status: 'published',
      featured: false,
      heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2940&auto=format&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: uuidv4(),
      slug: 'national-id-guinea',
      title: 'National ID and Population Management',
      shortDescription: 'End-to-end digital identity solution for the Republic of Guinea.',
      overview: 'A landmark IT project delivering secure biometric enrollment, national registry database, and smart card issuance for millions of citizens under a 15-year concession.',
      divisionId: divisionMap.it,
      status: 'published',
      featured: true,
      heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2940&auto=format&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: uuidv4(),
      slug: '100-mw-hfo-power-plant',
      title: '100 MW HFO Power Plant',
      shortDescription: 'EPC dual-fuel power generation site construction in Jamalpur.',
      overview: 'Completed fast-track design, logistics shipping, mechanical assembly, and grid integration of a 100 megawatt heavy fuel oil power plant for Powerpac Mutiara.',
      divisionId: divisionMap.engineering,
      status: 'published',
      featured: false,
      heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: uuidv4(),
      slug: 'e-passport-project',
      title: 'E-Passport Project',
      shortDescription: 'National electronic passport management and biometric authentication systems.',
      overview: 'Integrated automated border control gates, secure chip personalization centers, and biometric registration kiosks across regional passport offices.',
      divisionId: divisionMap.it,
      status: 'published',
      featured: false,
      heroImage: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2940&auto=format&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=800&auto=format&fit=crop',
    },
  ]);

  console.log('Seeding leadership profiles...');
  await db.insert(schema.leaders).values([
    {
      id: uuidv4(),
      name: 'Mahmud Hasan',
      designation: 'Founder & Chairman',
      department: 'Board',
      biography: 'Founder of Dipon Gas who transformed the pipeline construction business into a multi-sector group of high repute under his leadership.',
      displayOrder: 1,
      featured: true,
    },
    {
      id: uuidv4(),
      name: 'Rashed Mahmud',
      designation: 'Managing Director & CEO',
      department: 'Executive',
      biography: 'Successfully spearheaded and managed to expand the business arena of Dipon Group into a multi-dimensional and multi-faceted business organization thereby accelerating growth to help scale new heights and cross new horizons.',
      displayOrder: 2,
      featured: true,
    },
    {
      id: uuidv4(),
      name: 'Yaseer Mahmud',
      designation: 'Director',
      department: 'Executive',
      biography: 'Led new initiatives of Dipon Group like real estate development and established it as a reliable, trustworthy and committed company in the Bangladesh Real Estate Market.',
      displayOrder: 3,
      featured: true,
    },
    {
      id: uuidv4(),
      name: 'Aarouni Verma',
      designation: 'Governing Body Member',
      department: 'Governing Body',
      biography: 'Graduate from MNIT Jaipur with PG in International Trade and garnered experience with conglomerates like TATA and Reliance in different sectors.',
      displayOrder: 4,
      featured: true,
    },
    {
      id: uuidv4(),
      name: 'Uttam Singh',
      designation: 'Governing Body Member',
      department: 'Governing Body',
      biography: 'Graduate from MNIT Jaipur with PG in Adv Construction Management, former SVP of Wilbur Smith Associates, has vast experience in Energy and Infrastructure Projects.',
      displayOrder: 5,
      featured: true,
    },
    {
      id: uuidv4(),
      name: 'Syed Javed Iqbal',
      designation: 'Governing Body Member',
      department: 'Governing Body',
      biography: 'MBA with vast experience in investment banking, Former Head of investment division of IPDC, Country Head of Khulna Power Company Ltd.',
      displayOrder: 6,
      featured: false,
    },
    {
      id: uuidv4(),
      name: 'Dr. A.K. Balyan',
      designation: 'Independent Director',
      department: 'Advisory Board',
      biography: 'M. Tech from IIT-Delhi, PhD from Germany, Former MD & CEO of Petronet LNG Ltd, Director Incharge – HR, Business Development & Joint Ventures in ONGC Ltd.',
      displayOrder: 7,
      featured: false,
    },
    {
      id: uuidv4(),
      name: 'S. C. Verma',
      designation: 'Independent Director',
      department: 'Advisory Board',
      biography: 'M.Sc & A.I.S.M from IIT Dhanbad, India, Former Regional Director, Dept. of Atomic Energy, India and Adviser to the Chairman, Reliance Industries Limited.',
      displayOrder: 8,
      featured: false,
    },
    {
      id: uuidv4(),
      name: 'Shahidul Abedin',
      designation: 'Advisory Board Member',
      department: 'Advisory Board',
      biography: 'Mechanical Engineer with four decades of experience in the Gas sector as former MD of Bangladesh Gas Field Company Ltd., Bakhrabad Gas System Ltd. and Director of Petrobangla.',
      displayOrder: 9,
      featured: false,
    },
  ]);

  console.log('Seeding downloads...');
  await db.insert(schema.downloads).values([
    {
      id: uuidv4(),
      title: 'Corporate Capability Profile',
      description: 'A comprehensive overview of Dipon Group’s capabilities. Available upon request.',
      fileUrl: null,
      fileType: 'PDF',
      fileSize: '0 MB',
      isPublic: false,
    },
    {
      id: uuidv4(),
      title: 'Engineering Division Profile',
      description: 'Detailed technical capabilities, equipment fleet list, and completed project case studies.',
      fileUrl: null,
      fileType: 'PDF',
      fileSize: '0 MB',
      isPublic: false,
    },
    {
      id: uuidv4(),
      title: 'IT & ITES Solutions Brochure',
      description: 'Overview of our digital identity, smart card, and secure trust services.',
      fileUrl: null,
      fileType: 'PDF',
      fileSize: '0 MB',
      isPublic: false,
    },
  ]);

  console.log('Seeding clients...');
  await db.insert(schema.clients).values([
    { id: uuidv4(), name: 'Chevron Bangladesh', industry: 'Oil & Gas', website: 'https://bangladesh.chevron.com', displayOrder: 1 },
    { id: uuidv4(), name: 'Gas Transmission Company Limited (GTCL)', industry: 'Infrastructure', website: 'https://gtcl.org.bd', displayOrder: 2 },
    { id: uuidv4(), name: 'Government of Guinea', industry: 'IT & ITES', website: '', displayOrder: 3 },
    { id: uuidv4(), name: 'Government of Bangladesh', industry: 'IT & ITES', website: 'https://bangladesh.gov.bd', displayOrder: 4 },
    { id: uuidv4(), name: 'Powerpac Mutiara', industry: 'Power', website: '', displayOrder: 5 },
    { id: uuidv4(), name: 'Petrobangla', industry: 'Oil & Gas', website: 'https://petrobangla.org.bd', displayOrder: 6 },
    // New clients added below
    { id: uuidv4(), name: 'Omera Petroleum', industry: 'Oil & Gas', website: 'https://omerapetroleum.com', displayOrder: 7 },
    { id: uuidv4(), name: 'Titas Gas', industry: 'Oil & Gas', website: 'https://titasgas.com', displayOrder: 8 },
    { id: uuidv4(), name: 'GAIL India', industry: 'Oil & Gas', website: 'https://gailindia.com', displayOrder: 9 },
    // End of new clients
  ]);

  console.log('Seeding awards...');
  await db.insert(schema.awards).values([
    {
      id: uuidv4(),
      title: 'Best Infrastructure Partner',
      organization: 'Ministry of Power & Energy',
      year: 2022,
      description: 'Awarded for outstanding contribution to national pipeline and energy infrastructure development.',
    },
    {
      id: uuidv4(),
      title: 'HSE Excellence Award',
      organization: 'Chevron Bangladesh',
      year: 2021,
      description: 'Recognized for achieving 5 million safe man-hours without any lost-time incidents.',
    },
    {
      id: uuidv4(),
      title: 'Digital Transformation Leader',
      organization: 'ICT Division, Bangladesh',
      year: 2023,
      description: 'Awarded for pioneering secure national identity and e-passport solutions.',
    },
  ]);

  console.log('Seeding certifications...');
  await db.insert(schema.certifications).values([
    {
      id: uuidv4(),
      title: 'ISO 9001:2015',
      issuer: 'Quality Management System',
      description: 'Certified for international standards in quality management, operational efficiency, and continuous improvement.',
    },
    {
      id: uuidv4(),
      title: 'ISO 14001:2015',
      issuer: 'Environmental Management System',
      description: 'Certified for our commitment to minimizing environmental impact and promoting sustainable practices.',
    },
    {
      id: uuidv4(),
      title: 'ISO 45001:2018',
      issuer: 'Occupational Health & Safety',
      description: 'Certified for maintaining world-class safety standards and protecting our global workforce.',
    },
  ]);

  console.log('Seeding news articles...');
  await db.insert(schema.news).values([
    {
      id: uuidv4(),
      slug: 'strategic-partnership-2023',
      title: 'Dipon Group Signs New Strategic Partnership for Infrastructure Development',
      summary: 'DIPON Group has entered into a strategic collaboration agreement to expand its engineering capabilities and execute large-scale PPP projects.',
      content: 'Dipon Group signed a landmark strategic partnership agreement today in Dhaka. The agreement aims to leverage joint resources to construct pipeline assets and civil facilities over South Asia...',
      author: 'Corporate Communications',
      category: 'Press Release',
      featuredImage: 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
      publishDate: new Date('2023-10-12'),
      featured: true,
    },
    {
      id: uuidv4(),
      slug: 'hse-excellence-awards',
      title: 'Dipon Group Celebrates Annual HSE Excellence Awards 2023',
      summary: 'Celebrating safety milestones and honoring project teams that achieved zero incidents while complying with strict ISO standards.',
      content: 'At the annual ceremony, our Managing Director Rashed Mahmud thanked the site crews for achieving zero incidents on the cross-country pipeline networks. He reiterated our absolute commitment to HSE safety standards...',
      author: 'HSE Committee',
      category: 'News',
      featuredImage: 'https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=800&auto=format&fit=crop',
      publishDate: new Date('2023-10-11'),
      featured: true,
    },
    {
      id: uuidv4(),
      slug: 'african-market-expansion',
      title: 'Dipon Group Announces Expansion into Select African Infrastructure Markets',
      summary: 'Leveraging our 55+ years of pipeline and power plant construction experience to support emerging infrastructure networks.',
      content: 'DIPON Group has opened exploratory offices in select African countries to deploy pipeline and identity solutions, bringing our engineering expertise to emerging international markets.',
      author: 'Global BD Desk',
      category: 'Press Release',
      featuredImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
      publishDate: new Date('2023-10-10'),
      featured: false,
    },
  ]);

  console.log('Seeding careers...');
  await db.insert(schema.careers).values([
    {
      id: uuidv4(),
      title: 'Senior Project Engineer',
      department: 'Engineering & Construction',
      location: 'Dhaka, Bangladesh',
      employmentType: 'Full-time',
      experience: '8+ Years',
      description: 'Responsible for leading cross-country pipeline routing, site layouts, contractor scheduling, and ensuring safe field execution.',
      status: 'open',
    },
    {
      id: uuidv4(),
      title: 'Systems Architect',
      department: 'IT & ITES',
      location: 'Kuala Lumpur, Malaysia',
      employmentType: 'Full-time',
      experience: '5+ Years',
      description: 'Design digital identity systems, PKI infrastructure, secure smart card workflows, and manage database clusters.',
      status: 'open',
    },
    {
      id: uuidv4(),
      title: 'Logistics Manager',
      department: 'Shipping & Logistics',
      location: 'Abu Dhabi, UAE',
      employmentType: 'Full-time',
      experience: '6+ Years',
      description: 'Oversee coastal bulk transport operations, heavy machinery logistics, customs clearing, and vessel charter scheduling.',
      status: 'open',
    },
    {
      id: uuidv4(),
      title: 'HSE Officer',
      department: 'Engineering & Construction',
      location: 'Site Based',
      employmentType: 'Contract',
      experience: '3+ Years',
      description: 'Monitor safety standard compliance on-site, conduct hazard assessments, organize toolbox meetings, and prepare HSE reports.',
      status: 'open',
    },
  ]);

  console.log('Seeding SEO meta tags...');
  await db.insert(schema.seo).values([
    { id: uuidv4(), path: '/', title: 'Dipon Group | Excellence Delivered', description: 'Dipon Group is a leading multinational conglomerate established in 1970, delivering excellence across Energy, Engineering, IT, and Infrastructure sectors.', keywords: 'Dipon Group, Energy, Infrastructure, Engineering, IT' },
    { id: uuidv4(), path: '/about', title: 'About Us | Dipon Group', description: 'Established in 1970 with the formation of Dipon Gas Company Ltd, we are known for our Commitment, Quality, and Safety.', keywords: 'About Dipon, corporate overview, vision, mission, history' },
    { id: uuidv4(), path: '/divisions', title: 'Business Divisions | Dipon Group', description: 'Explore our core capabilities across Engineering & Construction, IT & ITES, Shipping & Logistics, and Project Investment.', keywords: 'business divisions, EPC construction, shipping, IT solutions' },
    { id: uuidv4(), path: '/projects', title: 'Project Portfolio | Dipon Group', description: 'Discover our track record of engineering excellence and complex infrastructure projects executed globally.', keywords: 'project portfolio, pipeline project, power plant construction' },
    { id: uuidv4(), path: '/leadership', title: 'Our Leadership | Dipon Group', description: 'Meet the executive team, board of directors, and advisors steering the growth and strategic vision of Dipon Group.', keywords: 'leadership, board directors, Mahmud Hasan, Rashed Mahmud' },
    { id: uuidv4(), path: '/careers', title: 'Careers | Dipon Group', description: 'Build your career with a multinational engineering conglomerate. Explore open roles in project engineering, IT, and logistics.', keywords: 'careers, jobs, hire engineering, logistics openings' },
    { id: uuidv4(), path: '/contact', title: 'Contact Us | Dipon Group', description: 'Connect with our global offices and business development team to discuss your next infrastructure project.', keywords: 'contact us, email, phone, Dhaka HQ, Dubai office' },
    { id: uuidv4(), path: '/media', title: 'Media Centre | Dipon Group', description: 'Get the latest press releases, corporate news, and event announcements directly from the Dipon Group communications desk.', keywords: 'media, news, announcements, press release' },
    { id: uuidv4(), path: '/hse', title: 'HSE Policy | Dipon Group', description: 'Read about our strict occupational safety and health management policies. Our goal is always Zero Harm.', keywords: 'HSE policy, safety standard, ISO 45001' },
    { id: uuidv4(), path: '/csr', title: 'CSR Initiatives | Dipon Group', description: 'Fostering sustainable communities, education support, healthcare assistance, and green ecosystems.', keywords: 'CSR, social responsibility, community support' },
    { id: uuidv4(), path: '/awards', title: 'Awards & Certifications | Dipon Group', description: 'Recognized globally for safety benchmarks, ISO certifications, and engineering execution excellence.', keywords: 'ISO certification, corporate awards, HSE trophy' },
    { id: uuidv4(), path: '/clients', title: 'Our Clients & Partners | Dipon Group', description: 'Trusted by energy departments, government ministries, and international concession developers.', keywords: 'clients, chevron, GTCL, petrobangla, partners' },
    { id: uuidv4(), path: '/downloads', title: 'Downloads & Resources | Dipon Group', description: 'Download our general corporate profiles, brochure files, and division capability statements.', keywords: 'downloads, brochures, PDF capability statement' },
    { id: uuidv4(), path: '/privacy', title: 'Privacy Policy | Dipon Group', description: 'Read about how we collect, process, and safeguard your personal information.', keywords: 'privacy policy, cookie disclosure, GDPR compliance' },
    { id: uuidv4(), path: '/terms', title: 'Terms & Conditions | Dipon Group', description: 'Agreement to terms of website use and intellectual property representations.', keywords: 'terms and conditions, user agreement, website terms' },
  ]);

  console.log('Database seeded successfully.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});