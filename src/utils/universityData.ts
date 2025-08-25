export interface UniversityData {
  totalAlumni: number;
  dataScience: number;
  topEmployers: {
    name: string;
    hires: number;
    avgSalary: number;
    successRate: number;
  }[];
  industries: {
    name: string;
    percentage: number;
    growth: string;
  }[];
  recruitmentTrends: {
    month: string;
    hires: number;
  }[];
  alumniStories: {
    name: string;
    role: string;
    company: string;
    year: string;
    path: string;
    advice: string;
  }[];
}

// Complete list of UK universities
const UK_UNIVERSITIES = [
  'University of Cambridge',
  'University of Oxford',
  'Imperial College London',
  'University College London',
  'University of Edinburgh',
  'University of Manchester',
  'University of Warwick',
  'King\'s College London',
  'University of Bristol',
  'University of Glasgow',
  'University of Birmingham',
  'University of Leeds',
  'University of Sheffield',
  'University of Nottingham',
  'Nottingham Trent University',
  'University of Southampton',
  'University of York',
  'Durham University',
  'University of Bath',
  'University of St Andrews',
  'Loughborough University',
  'University of Exeter',
  'University of Liverpool',
  'Newcastle University',
  'Cardiff University',
  'Queen\'s University Belfast',
  'University of Aberdeen',
  'University of Dundee',
  'University of Strathclyde',
  'Heriot-Watt University',
  'University of Surrey'
];

// Base employer pools for different university tiers
const EMPLOYER_POOLS = {
  tier1: [ // Oxbridge, Imperial, UCL
    { name: 'Google', baseHires: 150, baseSalary: 85000 },
    { name: 'Microsoft', baseHires: 140, baseSalary: 82000 },
    { name: 'Amazon', baseHires: 130, baseSalary: 78000 },
    { name: 'Meta', baseHires: 120, baseSalary: 88000 },
    { name: 'DeepMind', baseHires: 80, baseSalary: 95000 },
    { name: 'Goldman Sachs', baseHires: 90, baseSalary: 92000 },
    { name: 'McKinsey & Company', baseHires: 85, baseSalary: 95000 },
    { name: 'JP Morgan', baseHires: 75, baseSalary: 89000 }
  ],
  tier2: [ // Edinburgh, Manchester, Warwick, KCL, Bristol
    { name: 'Microsoft', baseHires: 120, baseSalary: 79000 },
    { name: 'Amazon', baseHires: 110, baseSalary: 75000 },
    { name: 'Google', baseHires: 100, baseSalary: 82000 },
    { name: 'Spotify', baseHires: 85, baseSalary: 72000 },
    { name: 'Deliveroo', baseHires: 70, baseSalary: 68000 },
    { name: 'Monzo', baseHires: 60, baseSalary: 70000 },
    { name: 'Revolut', baseHires: 65, baseSalary: 73000 },
    { name: 'Palantir', baseHires: 55, baseSalary: 85000 }
  ],
  tier3: [ // Other Russell Group and top universities
    { name: 'IBM', baseHires: 90, baseSalary: 68000 },
    { name: 'Accenture', baseHires: 85, baseSalary: 65000 },
    { name: 'Deloitte', baseHires: 80, baseSalary: 67000 },
    { name: 'KPMG', baseHires: 75, baseSalary: 64000 },
    { name: 'PwC', baseHires: 70, baseSalary: 66000 },
    { name: 'Capgemini', baseHires: 65, baseSalary: 62000 },
    { name: 'TCS', baseHires: 60, baseSalary: 58000 },
    { name: 'Infosys', baseHires: 55, baseSalary: 60000 }
  ]
};

// Industry distributions by university tier
const INDUSTRY_DISTRIBUTIONS = {
  tier1: [
    { name: 'Technology', percentage: 45, growth: '+22%' },
    { name: 'Finance', percentage: 30, growth: '+15%' },
    { name: 'Consulting', percentage: 15, growth: '+12%' },
    { name: 'Healthcare', percentage: 7, growth: '+25%' },
    { name: 'Government', percentage: 3, growth: '+8%' }
  ],
  tier2: [
    { name: 'Technology', percentage: 42, growth: '+20%' },
    { name: 'Finance', percentage: 25, growth: '+14%' },
    { name: 'Consulting', percentage: 18, growth: '+10%' },
    { name: 'Healthcare', percentage: 10, growth: '+22%' },
    { name: 'Manufacturing', percentage: 5, growth: '+6%' }
  ],
  tier3: [
    { name: 'Technology', percentage: 35, growth: '+18%' },
    { name: 'Finance', percentage: 22, growth: '+12%' },
    { name: 'Consulting', percentage: 20, growth: '+8%' },
    { name: 'Healthcare', percentage: 12, growth: '+20%' },
    { name: 'Public Sector', percentage: 11, growth: '+5%' }
  ]
};

// Alumni stories templates by university tier
const ALUMNI_STORIES = {
  tier1: [
    {
      name: 'Sarah Chen',
      role: 'Principal Data Scientist',
      company: 'Google',
      year: '2019',
      path: 'PhD Mathematics → Research Intern → Data Scientist → Senior → Principal',
      advice: 'Focus on building a strong foundation in statistics and machine learning. Top companies value both theoretical depth and practical application.'
    },
    {
      name: 'James Wilson',
      role: 'ML Research Scientist',
      company: 'DeepMind',
      year: '2020',
      path: 'MSc Computer Science → Research Assistant → ML Engineer → Research Scientist',
      advice: 'Publish research papers and contribute to open source projects. Research labs look for candidates who can bridge theory and practice.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'VP Data Science',
      company: 'Goldman Sachs',
      year: '2018',
      path: 'BSc Statistics → Analyst → Associate → VP',
      advice: 'Develop leadership skills early. Finance values technical expertise combined with business acumen and client-facing abilities.'
    }
  ],
  tier2: [
    {
      name: 'Connor MacLeod',
      role: 'Senior Data Scientist',
      company: 'Spotify',
      year: '2019',
      path: 'MSc Data Science → Data Scientist → Senior Data Scientist',
      advice: 'Focus on user-centric analytics and A/B testing. Music streaming companies value creativity in data storytelling.'
    },
    {
      name: 'Lisa Wang',
      role: 'Head of ML',
      company: 'Revolut',
      year: '2020',
      path: 'MSc AI → ML Engineer → Senior ML Engineer → Head of ML',
      advice: 'The fintech industry offers incredible opportunities for ML applications. Focus on real-time systems and fraud detection.'
    },
    {
      name: 'Michael Brown',
      role: 'Data Science Manager',
      company: 'Microsoft',
      year: '2021',
      path: 'BSc Computer Science → Graduate Engineer → Data Scientist → Manager',
      advice: 'Build strong engineering fundamentals alongside data science skills. Cloud platforms are the future of data science.'
    }
  ],
  tier3: [
    {
      name: 'Rachel Thompson',
      role: 'Senior Consultant',
      company: 'Deloitte',
      year: '2020',
      path: 'BSc Mathematics → Graduate Consultant → Consultant → Senior Consultant',
      advice: 'Consulting teaches you to adapt quickly to different industries. Focus on communication skills and business understanding.'
    },
    {
      name: 'David Kim',
      role: 'Data Science Lead',
      company: 'IBM',
      year: '2019',
      path: 'MSc Data Science → Data Scientist → Senior Data Scientist → Lead',
      advice: 'Enterprise clients value reliability and scalability. Learn to work with legacy systems and large organizations.'
    },
    {
      name: 'Sophie Martinez',
      role: 'Analytics Manager',
      company: 'Accenture',
      year: '2021',
      path: 'BSc Statistics → Analyst → Senior Analyst → Manager',
      advice: 'Global consulting exposes you to diverse challenges. Develop expertise in change management and stakeholder engagement.'
    }
  ]
};

const getUniversityTier = (university: string): 'tier1' | 'tier2' | 'tier3' => {
  const tier1Unis = ['University of Cambridge', 'University of Oxford', 'Imperial College London', 'University College London'];
  const tier2Unis = ['University of Edinburgh', 'University of Manchester', 'University of Warwick', 'King\'s College London', 'University of Bristol', 'University of Glasgow', 'Nottingham Trent University'];
  
  if (tier1Unis.includes(university)) return 'tier1';
  if (tier2Unis.includes(university)) return 'tier2';
  return 'tier3';
};

const generateUniversityData = (university: string): UniversityData => {
  const tier = getUniversityTier(university);
  const employers = EMPLOYER_POOLS[tier];
  const industries = INDUSTRY_DISTRIBUTIONS[tier];
  const stories = ALUMNI_STORIES[tier];
  
  // Generate unique data based on university name hash
  const hash = university.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const baseAlumni = tier === 'tier1' ? 15000 : tier === 'tier2' ? 12000 : 10000;
  const totalAlumni = baseAlumni + (Math.abs(hash) % 5000);
  const dataScience = Math.round(totalAlumni * (0.08 + (Math.abs(hash) % 100) / 1000));
  
  // Generate top employers with variation
  const topEmployers = employers.map((employer, index) => {
    const variation = 0.7 + ((Math.abs(hash + index) % 100) / 100) * 0.6;
    const salaryVariation = 0.9 + ((Math.abs(hash + index * 2) % 100) / 100) * 0.2;
    const successVariation = 85 + ((Math.abs(hash + index * 3) % 100) / 100) * 10;
    
    return {
      name: employer.name,
      hires: Math.round(employer.baseHires * variation),
      avgSalary: Math.round(employer.baseSalary * salaryVariation),
      successRate: Math.round(successVariation)
    };
  }).sort((a, b) => b.hires - a.hires);
  
  // Generate recruitment trends
  const recruitmentTrends = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ].map((month, index) => {
    const seasonal = month === 'Sep' || month === 'Oct' ? 1.5 : 
                    month === 'Jun' || month === 'Jul' ? 1.2 : 1.0;
    const baseHires = 50 + (Math.abs(hash + index) % 30);
    
    return {
      month,
      hires: Math.round(baseHires * seasonal)
    };
  });
  
  return {
    totalAlumni,
    dataScience,
    topEmployers,
    industries,
    recruitmentTrends,
    alumniStories: stories
  };
};

// Cache for generated university data
const universityDataCache: { [key: string]: UniversityData } = {};

export const getUniversityData = (university: string): UniversityData => {
  if (!universityDataCache[university]) {
    universityDataCache[university] = generateUniversityData(university);
  }
  return universityDataCache[university];
};

export const getUniversityList = (): string[] => {
  return UK_UNIVERSITIES;
};

export const searchUniversities = (query: string): string[] => {
  if (!query) return UK_UNIVERSITIES;
  
  const lowerQuery = query.toLowerCase();
  return UK_UNIVERSITIES.filter(uni => 
    uni.toLowerCase().includes(lowerQuery)
  );
};