const mongoose = require('mongoose');
const Scheme = require('./src/models/Scheme');
const Service = require('./src/models/Service');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dks-power');
    
    // Check and seed schemes
    const existingSchemes = await Scheme.find();
    if (existingSchemes.length === 0) {
      const initialSchemes = [
        {
          title: 'PM Surya Ghar Muft Bijli Yojana',
          description: 'A central government scheme to install rooftop solar systems on residential buildings with subsidies up to ₹78,000 for capacity up to 3 kW.',
          subsidy: '₹78,000 (Max) for 3kW system',
          target: 'Residential households',
          link: 'https://pmsuryaghar.gov.in',
        },
        {
          title: 'PM KUSUM Scheme',
          description: 'Pradhan Mantri Kisan Urja Suraksha Evam Utthan Mahabhiyaan - supports farmers in installing solar pumps and grid-connected solar power plants.',
          subsidy: '60% subsidy + loan facility',
          target: 'Farmers and agricultural sector',
          link: 'https://mnre.gov.in',
        },
        {
          title: 'MNRE Rooftop Solar Scheme',
          description: 'Ministry of New and Renewable Energy scheme providing financial support for rooftop solar photovoltaic installations.',
          subsidy: '40% for residential (upto 3kW)',
          target: 'Residential and institutional buildings',
          link: 'https://solarrooftop.gov.in',
        },
        {
          title: 'Pradhan Mantri Suryodaya Yojana',
          description: 'A national mission to establish solar capacity across the country with attractive benefits for residential consumers.',
          subsidy: 'Up to 40% depending on location',
          target: 'All residential consumers',
          link: '',
        },
        {
          title: 'State Solar Subsidy Programs',
          description: 'Various state-specific schemes that provide additional incentives on top of central government schemes.',
          subsidy: 'Varies by state',
          target: 'Residential and commercial',
          link: '',
        },
      ];
      await Scheme.insertMany(initialSchemes);
      console.log(`✅ Successfully seeded ${initialSchemes.length} schemes!`);
    } else {
      console.log(`✅ Database already has ${existingSchemes.length} schemes. Skipping scheme seed.`);
    }

    // Check and seed services
    const existingServices = await Service.find();
    if (existingServices.length === 0) {
      const initialServices = [
        {
          title: 'Rooftop Solar Installation',
          description: 'Complete installation of rooftop solar photovoltaic systems for residential and commercial properties.',
          icon: '☀️',
          price: '₹5,000 - ₹15,000 per kW',
          features: [
            'Site survey and assessment',
            'System design and engineering',
            'Installation and testing',
            '25-year warranty',
            'Performance monitoring',
          ],
        },
        {
          title: 'Solar Inverter & Battery',
          description: 'High-efficiency solar inverters and battery storage systems for optimal energy utilization.',
          icon: '🔋',
          price: '₹1,50,000 - ₹5,00,000',
          features: [
            'String inverters',
            'Hybrid inverters',
            'Battery backup systems',
            'Smart monitoring',
            'Grid synchronization',
          ],
        },
        {
          title: 'Government Scheme Assistance',
          description: 'Complete guidance and assistance in applying for all government solar subsidies.',
          icon: '📋',
          price: 'Free consultation',
          features: [
            'Scheme eligibility check',
            'Application support',
            'Documentation assistance',
            'Subsidy tracking',
            'Expert guidance',
          ],
        },
        {
          title: 'Solar Maintenance & Service',
          description: 'Regular maintenance and technical support for your solar systems to ensure optimal performance.',
          icon: '🔧',
          price: '₹5,000 - ₹10,000 per year',
          features: [
            'Panel cleaning',
            'Electrical inspection',
            'Software updates',
            '24/7 support',
            'Annual checkup',
          ],
        },
        {
          title: 'Solar Consulting',
          description: 'Expert consulting for solar energy solutions tailored to your specific needs.',
          icon: '💡',
          price: '₹10,000 - ₹50,000',
          features: [
            'Energy audit',
            'ROI analysis',
            'System sizing',
            'Cost-benefit analysis',
            'Implementation planning',
          ],
        },
      ];
      await Service.insertMany(initialServices);
      console.log(`✅ Successfully seeded ${initialServices.length} services!`);
    } else {
      console.log(`✅ Database already has ${existingServices.length} services. Skipping service seed.`);
    }

    await mongoose.disconnect();
    console.log('\n✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
