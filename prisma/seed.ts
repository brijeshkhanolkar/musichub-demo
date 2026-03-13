import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@musichub.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@musichub.com',
      password: adminPassword,
      role: 'ADMIN',
      phone: '+1 555-0100',
      address: '123 Admin St',
      city: 'New York',
      zip: '10001',
    },
  });

  // Create demo user
  const userPassword = await bcrypt.hash('user123', 12);
  await prisma.user.upsert({
    where: { email: 'user@musichub.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'user@musichub.com',
      password: userPassword,
      role: 'USER',
      phone: '+1 555-0200',
      address: '456 Music Ave',
      city: 'Los Angeles',
      zip: '90001',
    },
  });

  // Seed Musicians
  const musicians = [
    {
      name: 'Marcus Sterling',
      genre: 'Jazz',
      instrument: 'Saxophone',
      bio: 'Award-winning jazz saxophonist with over 15 years of experience performing at prestigious venues worldwide. Known for smooth, soulful performances that captivate audiences of all sizes.',
      pricePerEvent: 500,
      image: '/musicians/jazz-sax.jpg',
      rating: 4.9,
      experience: 15,
      location: 'New York, NY',
    },
    {
      name: 'Elena Voss',
      genre: 'Classical',
      instrument: 'Violin',
      bio: 'Classically trained violinist from the Juilliard School. Has performed with the New York Philharmonic and specializes in wedding ceremonies and corporate events.',
      pricePerEvent: 650,
      image: '/musicians/classical-violin.jpg',
      rating: 4.8,
      experience: 12,
      location: 'Boston, MA',
    },
    {
      name: 'Jake Thunder',
      genre: 'Rock',
      instrument: 'Electric Guitar',
      bio: 'High-energy rock guitarist who brings the house down at every event. Former lead guitarist of The Voltage and experienced in both live bands and solo performances.',
      pricePerEvent: 400,
      image: '/musicians/rock-guitar.jpg',
      rating: 4.7,
      experience: 10,
      location: 'Los Angeles, CA',
    },
    {
      name: 'Sophia Chen',
      genre: 'Pop',
      instrument: 'Vocals',
      bio: 'Versatile pop vocalist with a powerful range. Covers top hits from all decades and brings an electric atmosphere to weddings, parties, and corporate events.',
      pricePerEvent: 550,
      image: '/musicians/pop-vocals.jpg',
      rating: 4.9,
      experience: 8,
      location: 'Miami, FL',
    },
    {
      name: 'Robert Blues',
      genre: 'Blues',
      instrument: 'Harmonica & Guitar',
      bio: 'Authentic blues artist with a raw, powerful sound. Robert has toured across the Mississippi Delta and brings genuine blues experience to every performance.',
      pricePerEvent: 350,
      image: '/musicians/blues-harmonica.jpg',
      rating: 4.6,
      experience: 20,
      location: 'Chicago, IL',
    },
    {
      name: 'Aria Moonlight',
      genre: 'Folk',
      instrument: 'Acoustic Guitar & Vocals',
      bio: 'Enchanting folk singer-songwriter who creates an intimate, magical atmosphere. Perfect for outdoor events, festivals, and cozy venue performances.',
      pricePerEvent: 300,
      image: '/musicians/folk-acoustic.jpg',
      rating: 4.8,
      experience: 7,
      location: 'Portland, OR',
    },
    {
      name: 'DJ Maxwell',
      genre: 'Electronic',
      instrument: 'DJ / Producer',
      bio: 'Professional DJ and music producer with residencies at top clubs. Specializes in weddings, corporate events, and private parties with custom playlists.',
      pricePerEvent: 450,
      image: '/musicians/dj-electronic.jpg',
      rating: 4.7,
      experience: 9,
      location: 'Las Vegas, NV',
    },
    {
      name: 'Carlos Fuego',
      genre: 'Latin',
      instrument: 'Classical Guitar & Vocals',
      bio: 'Passionate Latin musician bringing the fire of flamenco and salsa to every event. Carlos creates an unforgettable cultural experience with authentic Latin rhythms.',
      pricePerEvent: 475,
      image: '/musicians/latin-guitar.jpg',
      rating: 4.8,
      experience: 14,
      location: 'San Antonio, TX',
    },
    {
      name: 'Nina Ivory',
      genre: 'Jazz',
      instrument: 'Piano',
      bio: 'Elegant jazz pianist who sets the perfect mood for upscale events. Nina\'s repertoire spans classic standards to contemporary jazz arrangements.',
      pricePerEvent: 525,
      image: '/musicians/jazz-piano.jpg',
      rating: 4.9,
      experience: 11,
      location: 'San Francisco, CA',
    },
    {
      name: 'The Rhythm Collective',
      genre: 'Rock',
      instrument: 'Full Band',
      bio: 'High-energy 5-piece rock band that delivers unforgettable performances. From classic rock anthems to modern hits, they keep the crowd dancing all night.',
      pricePerEvent: 1200,
      image: '/musicians/rock-band.jpg',
      rating: 4.8,
      experience: 8,
      location: 'Nashville, TN',
    },
    {
      name: 'Maestro Giovanni',
      genre: 'Classical',
      instrument: 'Cello',
      bio: 'Italian-trained cellist offering breathtaking solo and ensemble performances. Giovanni brings elegance and emotional depth to weddings and formal events.',
      pricePerEvent: 700,
      image: '/musicians/classical-cello.jpg',
      rating: 5.0,
      experience: 18,
      location: 'Philadelphia, PA',
    },
    {
      name: 'Melody Grace',
      genre: 'Pop',
      instrument: 'Piano & Vocals',
      bio: 'Chart-topping pop pianist and singer who creates magical moments. Melody specializes in creating custom arrangements for special occasions.',
      pricePerEvent: 600,
      image: '/musicians/pop-piano.jpg',
      rating: 4.7,
      experience: 6,
      location: 'Austin, TX',
    },
  ];

  for (const musician of musicians) {
    await prisma.musician.create({ data: musician });
  }

  // Seed Rental Items
  const rentalItems = [
    {
      name: 'Fender Stratocaster',
      category: 'Guitars',
      description: 'The iconic Fender Stratocaster in sunburst finish. Perfect for rock, blues, and pop. Features a maple neck, three single-coil pickups, and tremolo bridge.',
      pricePerDay: 35,
      image: '/instruments/fender-strat.jpg',
      brand: 'Fender',
      condition: 'Excellent',
    },
    {
      name: 'Yamaha C40 Classical Guitar',
      category: 'Guitars',
      description: 'Beautiful nylon-string classical guitar ideal for beginners and intermediate players. Warm, rich tone perfect for classical, flamenco, and folk music.',
      pricePerDay: 15,
      image: '/instruments/yamaha-classical.jpg',
      brand: 'Yamaha',
      condition: 'Good',
    },
    {
      name: 'Steinway Model B Grand Piano',
      category: 'Pianos',
      description: 'The legendary Steinway grand piano. 6\'10" concert-quality instrument with unmatched tone and touch. Includes delivery and tuning setup.',
      pricePerDay: 150,
      image: '/instruments/steinway-grand.jpg',
      brand: 'Steinway & Sons',
      condition: 'Excellent',
    },
    {
      name: 'Yamaha P-125 Digital Piano',
      category: 'Pianos',
      description: 'Portable digital piano with 88 weighted keys and GHS action. Built-in speakers, multiple voices, and USB connectivity. Perfect for events and practice.',
      pricePerDay: 40,
      image: '/instruments/yamaha-digital.jpg',
      brand: 'Yamaha',
      condition: 'Excellent',
    },
    {
      name: 'Pearl Export Drum Kit',
      category: 'Drums',
      description: 'Complete 5-piece drum kit with hardware and cymbals. Professional-quality shells with poplar/mahogany construction. Includes throne and stick bag.',
      pricePerDay: 55,
      image: '/instruments/pearl-drums.jpg',
      brand: 'Pearl',
      condition: 'Good',
    },
    {
      name: 'Stradivarius Replica Violin',
      category: 'Strings',
      description: 'Handcrafted Stradivarius replica with exceptional tonal quality. Spruce top, maple back and sides. Includes case, bow, and rosin.',
      pricePerDay: 45,
      image: '/instruments/violin.jpg',
      brand: 'Cremona',
      condition: 'Excellent',
    },
    {
      name: 'Selmer Paris Alto Saxophone',
      category: 'Wind',
      description: 'Professional-grade alto saxophone with rich, warm tone. Lacquered brass body with hand-engraved bell. Includes case and mouthpiece.',
      pricePerDay: 50,
      image: '/instruments/selmer-sax.jpg',
      brand: 'Selmer',
      condition: 'Excellent',
    },
    {
      name: 'Gibson Les Paul Standard',
      category: 'Guitars',
      description: 'The legendary Gibson Les Paul with dual humbucker pickups. Mahogany body with maple top, producing thick, warm tones ideal for rock and jazz.',
      pricePerDay: 45,
      image: '/instruments/gibson-lespaul.jpg',
      brand: 'Gibson',
      condition: 'Good',
    },
    {
      name: 'Roland TD-17KVX Electronic Drum Kit',
      category: 'Drums',
      description: 'Advanced electronic drum kit with mesh heads, Bluetooth audio, and 50+ preset kits. Silent practice option with headphone jack.',
      pricePerDay: 40,
      image: '/instruments/roland-edrums.jpg',
      brand: 'Roland',
      condition: 'Excellent',
    },
    {
      name: 'Martin D-28 Acoustic Guitar',
      category: 'Guitars',
      description: 'Premium acoustic guitar with solid Sitka spruce top and East Indian rosewood back and sides. Rich, full sound perfect for singer-songwriters.',
      pricePerDay: 40,
      image: '/instruments/martin-d28.jpg',
      brand: 'Martin',
      condition: 'Excellent',
    },
    {
      name: 'Yamaha YFL-222 Flute',
      category: 'Wind',
      description: 'Silver-plated student flute with excellent intonation and response. Offset G key and C foot joint. Perfect for students and event performances.',
      pricePerDay: 20,
      image: '/instruments/yamaha-flute.jpg',
      brand: 'Yamaha',
      condition: 'Good',
    },
    {
      name: 'DW Collector\'s Series Snare Drum',
      category: 'Percussion',
      description: 'Premium 14x6.5" maple snare drum with a bright, cutting tone. Features MAG throw-off and True-Pitch tuning. Professional studio quality.',
      pricePerDay: 25,
      image: '/instruments/dw-snare.jpg',
      brand: 'DW',
      condition: 'Excellent',
    },
  ];

  for (const item of rentalItems) {
    await prisma.rentalItem.create({ data: item });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
