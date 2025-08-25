export interface MarketData {
  nationalAverage: number;
  jobOpenings: number;
  marketGrowth: string;
  topCity: string;
  cityData: { [city: string]: number };
  skillsData: { skill: string; demand: number; growth: string }[];
  hotspots: { city: string; jobs: number; growth: string; avgSalary: number }[];
}

export interface HeatMapData {
  region: string;
  salary: number;
  openings: number;
  growth: string;
  coordinates: [number, number];
}

// Base salary multipliers for different roles
const ROLE_SALARY_MULTIPLIERS = {
  'Data Scientist': 1.0,
  'Data Analyst': 0.69,
  'ML Engineer': 1.2,
  'Data Engineer': 1.05,
  'Business Analyst': 0.8
};

// Base job opening multipliers for different roles
const ROLE_OPENING_MULTIPLIERS = {
  'Data Scientist': 1.0,
  'Data Analyst': 1.31,
  'ML Engineer': 0.76,
  'Data Engineer': 0.86,
  'Business Analyst': 1.14
};

// City salary multipliers relative to national average
const CITY_SALARY_MULTIPLIERS = {
  'London': 1.15,
  'Cambridge': 1.05,
  'Oxford': 1.03,
  'Edinburgh': 0.95,
  'Manchester': 0.89,
  'Bristol': 0.92,
  'Birmingham': 0.85,
  'Leeds': 0.80,
  'Glasgow': 0.82,
  'Liverpool': 0.78,
  'Newcastle': 0.75,
  'Sheffield': 0.73,
  'Nottingham': 0.76,
  'Cardiff': 0.74,
  'Belfast': 0.72
};

// Skills data for different roles
const ROLE_SKILLS = {
  'Data Scientist': [
    { skill: 'Python', demand: 95, growth: '+12%' },
    { skill: 'Machine Learning', demand: 88, growth: '+18%' },
    { skill: 'SQL', demand: 92, growth: '+8%' },
    { skill: 'TensorFlow', demand: 75, growth: '+22%' },
    { skill: 'AWS', demand: 82, growth: '+25%' },
    { skill: 'R', demand: 68, growth: '+5%' },
    { skill: 'Deep Learning', demand: 71, growth: '+28%' },
    { skill: 'Statistics', demand: 89, growth: '+6%' }
  ],
  'Data Analyst': [
    { skill: 'SQL', demand: 98, growth: '+10%' },
    { skill: 'Excel', demand: 95, growth: '+3%' },
    { skill: 'Tableau', demand: 85, growth: '+15%' },
    { skill: 'Python', demand: 78, growth: '+20%' },
    { skill: 'Power BI', demand: 72, growth: '+18%' },
    { skill: 'R', demand: 55, growth: '+8%' },
    { skill: 'Statistics', demand: 82, growth: '+7%' },
    { skill: 'Data Visualization', demand: 88, growth: '+12%' }
  ],
  'ML Engineer': [
    { skill: 'Python', demand: 98, growth: '+15%' },
    { skill: 'TensorFlow', demand: 92, growth: '+25%' },
    { skill: 'PyTorch', demand: 88, growth: '+30%' },
    { skill: 'Kubernetes', demand: 85, growth: '+35%' },
    { skill: 'Docker', demand: 90, growth: '+20%' },
    { skill: 'MLOps', demand: 82, growth: '+40%' },
    { skill: 'AWS', demand: 87, growth: '+28%' },
    { skill: 'Git', demand: 95, growth: '+8%' }
  ],
  'Data Engineer': [
    { skill: 'Python', demand: 95, growth: '+18%' },
    { skill: 'SQL', demand: 98, growth: '+12%' },
    { skill: 'Apache Spark', demand: 88, growth: '+25%' },
    { skill: 'AWS', demand: 92, growth: '+30%' },
    { skill: 'Kafka', demand: 75, growth: '+28%' },
    { skill: 'Airflow', demand: 82, growth: '+35%' },
    { skill: 'Docker', demand: 85, growth: '+22%' },
    { skill: 'Java', demand: 72, growth: '+8%' }
  ],
  'Business Analyst': [
    { skill: 'SQL', demand: 88, growth: '+12%' },
    { skill: 'Excel', demand: 98, growth: '+2%' },
    { skill: 'Tableau', demand: 78, growth: '+18%' },
    { skill: 'Power BI', demand: 85, growth: '+22%' },
    { skill: 'Python', demand: 65, growth: '+25%' },
    { skill: 'R', demand: 45, growth: '+15%' },
    { skill: 'Statistics', demand: 75, growth: '+10%' },
    { skill: 'Data Analysis', demand: 92, growth: '+8%' }
  ]
};

// Market growth rates by role
const ROLE_GROWTH_RATES = {
  'Data Scientist': '+18%',
  'Data Analyst': '+12%',
  'ML Engineer': '+28%',
  'Data Engineer': '+22%',
  'Business Analyst': '+8%'
};

// Base data for calculations
const BASE_DATA = {
  nationalAverage: 65000,
  jobOpenings: 2450,
  cities: [
    'London', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol', 
    'Leeds', 'Glasgow', 'Liverpool', 'Newcastle', 'Sheffield',
    'Nottingham', 'Cardiff', 'Belfast', 'Cambridge', 'Oxford'
  ]
};

export const getMarketData = (role: string, city?: string): MarketData => {
  const roleMultiplier = ROLE_SALARY_MULTIPLIERS[role as keyof typeof ROLE_SALARY_MULTIPLIERS] || 1.0;
  const openingMultiplier = ROLE_OPENING_MULTIPLIERS[role as keyof typeof ROLE_OPENING_MULTIPLIERS] || 1.0;
  
  // Calculate base metrics
  const nationalAverage = Math.round(BASE_DATA.nationalAverage * roleMultiplier);
  const jobOpenings = Math.round(BASE_DATA.jobOpenings * openingMultiplier);
  const marketGrowth = ROLE_GROWTH_RATES[role as keyof typeof ROLE_GROWTH_RATES] || '+15%';
  
  // Generate city data
  const cityData: { [city: string]: number } = {};
  BASE_DATA.cities.forEach(cityName => {
    const cityMultiplier = CITY_SALARY_MULTIPLIERS[cityName as keyof typeof CITY_SALARY_MULTIPLIERS] || 0.85;
    cityData[cityName] = Math.round(nationalAverage * cityMultiplier);
  });
  
  // Find top city
  const topCity = Object.entries(cityData).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  
  // Get skills data for role
  const skillsData = ROLE_SKILLS[role as keyof typeof ROLE_SKILLS] || ROLE_SKILLS['Data Scientist'];
  
  // Generate employment hotspots
  const hotspots = generateHotspots(role, nationalAverage, jobOpenings);
  
  // If city is specified and not "All Cities", adjust data
  if (city && city !== 'All Cities') {
    const cityMultiplier = CITY_SALARY_MULTIPLIERS[city as keyof typeof CITY_SALARY_MULTIPLIERS] || 0.85;
    return {
      nationalAverage: Math.round(nationalAverage * cityMultiplier),
      jobOpenings: Math.round(jobOpenings * cityMultiplier * 0.3),
      marketGrowth,
      topCity: city,
      cityData: { [city]: cityData[city] },
      skillsData,
      hotspots: hotspots.filter(h => h.city === city).concat(
        hotspots.filter(h => h.city !== city).slice(0, 2)
      )
    };
  }
  
  return {
    nationalAverage,
    jobOpenings,
    marketGrowth,
    topCity,
    cityData,
    skillsData,
    hotspots
  };
};

const generateHotspots = (role: string, baseSalary: number, baseOpenings: number) => {
  const cities = ['London', 'Manchester', 'Edinburgh', 'Birmingham', 'Bristol', 'Cambridge'];
  
  return cities.map(city => {
    const cityMultiplier = CITY_SALARY_MULTIPLIERS[city as keyof typeof CITY_SALARY_MULTIPLIERS] || 0.85;
    const openingVariation = 0.7 + Math.random() * 0.6; // Random variation for openings
    const growthVariation = Math.random() * 10 + 5; // 5-15% growth
    
    return {
      city,
      jobs: Math.round(baseOpenings * cityMultiplier * openingVariation * 0.4),
      growth: `+${Math.round(growthVariation)}%`,
      avgSalary: Math.round(baseSalary * cityMultiplier)
    };
  }).sort((a, b) => b.jobs - a.jobs);
};

export const getHeatMapData = (role: string): HeatMapData[] => {
  const marketData = getMarketData(role);
  
  const regions = [
    { name: 'London', coords: [51.5074, -0.1278] as [number, number] },
    { name: 'Manchester', coords: [53.4808, -2.2426] as [number, number] },
    { name: 'Birmingham', coords: [52.4862, -1.8904] as [number, number] },
    { name: 'Edinburgh', coords: [55.9533, -3.1883] as [number, number] },
    { name: 'Bristol', coords: [51.4545, -2.5879] as [number, number] },
    { name: 'Leeds', coords: [53.8008, -1.5491] as [number, number] },
    { name: 'Glasgow', coords: [55.8642, -4.2518] as [number, number] },
    { name: 'Liverpool', coords: [53.4084, -2.9916] as [number, number] },
    { name: 'Newcastle', coords: [54.9783, -1.6178] as [number, number] },
    { name: 'Sheffield', coords: [53.3811, -1.4701] as [number, number] },
    { name: 'Nottingham', coords: [52.9548, -1.1581] as [number, number] },
    { name: 'Cardiff', coords: [51.4816, -3.1791] as [number, number] },
    { name: 'Belfast', coords: [54.5973, -5.9301] as [number, number] },
    { name: 'Cambridge', coords: [52.2053, 0.1218] as [number, number] },
    { name: 'Oxford', coords: [51.7520, -1.2577] as [number, number] }
  ];
  
  const roleMultiplier = ROLE_SALARY_MULTIPLIERS[role as keyof typeof ROLE_SALARY_MULTIPLIERS] || 1.0;
  const openingMultiplier = ROLE_OPENING_MULTIPLIERS[role as keyof typeof ROLE_OPENING_MULTIPLIERS] || 1.0;
  const growthRate = ROLE_GROWTH_RATES[role as keyof typeof ROLE_GROWTH_RATES] || '+15%';
  
  return regions.map(region => {
    const cityMultiplier = CITY_SALARY_MULTIPLIERS[region.name as keyof typeof CITY_SALARY_MULTIPLIERS] || 0.85;
    const openingVariation = 0.5 + Math.random() * 1.0;
    
    return {
      region: region.name,
      salary: Math.round(BASE_DATA.nationalAverage * roleMultiplier * cityMultiplier),
      openings: Math.round(BASE_DATA.jobOpenings * openingMultiplier * cityMultiplier * openingVariation * 0.1),
      growth: growthRate,
      coordinates: region.coords
    };
  });
};

// Get all available cities
export const getAllCities = (): string[] => {
  return ['All Cities', ...BASE_DATA.cities];
};

// Get all available roles
export const getAllRoles = (): string[] => {
  return Object.keys(ROLE_SALARY_MULTIPLIERS);
};