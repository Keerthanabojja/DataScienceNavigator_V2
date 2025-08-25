import { ParsedResume, SkillMatch } from './resumeParser';

export interface AnalysisResult {
  overallScore: number;
  strengths: string[];
  gaps: string[];
  recommendations: Recommendation[];
  skillsFound: SkillMatch[];
  marketReadiness: {
    essential: number;
    important: number;
    valuable: number;
  };
}

export interface Recommendation {
  skill: string;
  priority: 'High' | 'Medium' | 'Low';
  impact: string;
  resources: string[];
  type: 'Course' | 'Certification' | 'Practice';
  estimatedTime: string;
  costRange: string;
}

// UK market demand for different roles - comprehensive skill requirements
const ROLE_SKILL_DEMAND = {
  'Data Scientist': {
    essential: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Analysis'],
    important: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'R', 'Deep Learning', 'Natural Language Processing'],
    valuable: ['AWS', 'Docker', 'Git', 'Tableau', 'Apache Spark', 'Computer Vision', 'MLOps', 'Kubernetes']
  },
  'Data Analyst': {
    essential: ['SQL', 'Excel', 'Data Analysis', 'Statistics', 'Data Visualization'],
    important: ['Python', 'Tableau', 'Power BI', 'R', 'Pandas', 'Statistical Analysis'],
    valuable: ['Machine Learning', 'AWS', 'Git', 'SPSS', 'Advanced Excel', 'Business Intelligence']
  },
  'ML Engineer': {
    essential: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'Docker'],
    important: ['Kubernetes', 'AWS', 'MLOps', 'Git', 'Deep Learning', 'Scikit-learn'],
    valuable: ['Apache Spark', 'Java', 'Scala', 'Jenkins', 'Computer Vision', 'Natural Language Processing']
  },
  'Data Engineer': {
    essential: ['Python', 'SQL', 'Apache Spark', 'AWS', 'Docker'],
    important: ['Kubernetes', 'Java', 'Scala', 'PostgreSQL', 'MongoDB', 'Git'],
    valuable: ['Hadoop', 'Kafka', 'Elasticsearch', 'Redis', 'Jenkins', 'Airflow']
  },
  'BI Analyst': {
    essential: ['SQL', 'Excel', 'Data Analysis', 'Tableau', 'Power BI'],
    important: ['Statistics', 'Python', 'R', 'Statistical Analysis', 'Business Intelligence'],
    valuable: ['Machine Learning', 'SPSS', 'SAS', 'Data Visualization', 'Git']
  },
  'AI Researcher': {
    essential: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch'],
    important: ['Natural Language Processing', 'Computer Vision', 'Statistics', 'Research', 'Git'],
    valuable: ['Reinforcement Learning', 'Optimization', 'Mathematics', 'Publications', 'Conferences']
  }
};

// Comprehensive skill resources with real courses, certifications, and practice platforms
const SKILL_RESOURCES = {
  'Machine Learning': {
    courses: ['Machine Learning Specialization (Coursera - Andrew Ng)', 'Fast.ai Practical Machine Learning', 'edX MIT Introduction to Machine Learning'],
    certifications: ['Google Cloud ML Engineer', 'AWS Certified Machine Learning', 'Microsoft Azure AI Engineer'],
    practice: ['Kaggle Competitions', 'Google Colab Projects', 'GitHub ML Portfolio'],
    estimatedTime: '3-6 months',
    costRange: '£50-£300'
  },
  'Python': {
    courses: ['Python for Data Science (DataCamp)', 'Complete Python Bootcamp (Udemy)', 'Python Programming (Coursera)'],
    certifications: ['Python Institute PCAP', 'Microsoft Python Certification', 'Google IT Automation with Python'],
    practice: ['LeetCode Python Problems', 'HackerRank Python Track', 'Real Python Tutorials'],
    estimatedTime: '2-4 months',
    costRange: '£30-£200'
  },
  'AWS': {
    courses: ['AWS Cloud Practitioner Essentials', 'AWS Solutions Architect Course', 'A Cloud Guru AWS Training'],
    certifications: ['AWS Cloud Practitioner', 'AWS Solutions Architect Associate', 'AWS Data Analytics Specialty'],
    practice: ['AWS Free Tier Projects', 'AWS Hands-on Labs', 'Cloud Resume Challenge'],
    estimatedTime: '2-3 months',
    costRange: '£100-£400'
  },
  'TensorFlow': {
    courses: ['TensorFlow Developer Certificate Program', 'Deep Learning Specialization', 'TensorFlow: Advanced Techniques'],
    certifications: ['TensorFlow Developer Certificate', 'Google Cloud ML Engineer', 'NVIDIA Deep Learning Institute'],
    practice: ['TensorFlow Tutorials', 'Keras Code Examples', 'Google Colab Notebooks'],
    estimatedTime: '3-5 months',
    costRange: '£100-£500'
  },
  'SQL': {
    courses: ['SQL for Data Science (Coursera)', 'Complete SQL Bootcamp (Udemy)', 'W3Schools SQL Tutorial'],
    certifications: ['Microsoft SQL Server Certification', 'Oracle Database Certification', 'PostgreSQL Certification'],
    practice: ['SQLBolt Interactive Lessons', 'HackerRank SQL Challenges', 'LeetCode Database Problems'],
    estimatedTime: '1-3 months',
    costRange: '£20-£150'
  },
  'Tableau': {
    courses: ['Tableau Desktop Specialist Training', 'Data Visualization with Tableau', 'Tableau Public Training'],
    certifications: ['Tableau Desktop Specialist', 'Tableau Desktop Certified Associate', 'Tableau Server Certified Associate'],
    practice: ['Tableau Public Gallery', 'MakeoverMonday Challenge', 'Workout Wednesday'],
    estimatedTime: '2-4 months',
    costRange: '£100-£300'
  },
  'Docker': {
    courses: ['Docker Mastery Course', 'Docker and Kubernetes Complete Guide', 'Docker for Developers'],
    certifications: ['Docker Certified Associate', 'Kubernetes Administrator (CKA)', 'Red Hat Container Specialist'],
    practice: ['Docker Hub Projects', 'Containerize Personal Projects', 'Docker Compose Examples'],
    estimatedTime: '1-2 months',
    costRange: '£50-£200'
  },
  'Deep Learning': {
    courses: ['Deep Learning Specialization (Coursera)', 'Fast.ai Deep Learning Course', 'MIT Deep Learning Course'],
    certifications: ['NVIDIA Deep Learning Institute', 'Google Cloud ML Engineer', 'AWS Machine Learning Specialty'],
    practice: ['Papers with Code Implementation', 'Kaggle Deep Learning Competitions', 'PyTorch Tutorials'],
    estimatedTime: '4-8 months',
    costRange: '£100-£600'
  },
  'Power BI': {
    courses: ['Microsoft Power BI Complete Course', 'Power BI for Data Analytics', 'Power BI Desktop Training'],
    certifications: ['Microsoft Certified: Data Analyst Associate', 'Power BI Certification', 'Microsoft Power Platform'],
    practice: ['Power BI Community Challenges', 'Sample Datasets Practice', 'Dashboard Gallery'],
    estimatedTime: '2-3 months',
    costRange: '£80-£250'
  },
  'R': {
    courses: ['R Programming (Coursera)', 'R for Data Science', 'Statistics with R Specialization'],
    certifications: ['R Programming Certification', 'Data Science with R', 'Statistical Analysis with R'],
    practice: ['R-bloggers Tutorials', 'Kaggle R Kernels', 'RStudio Cloud Projects'],
    estimatedTime: '2-4 months',
    costRange: '£40-£200'
  }
};

export const analyzeResume = (parsedResume: ParsedResume, targetRole: string = 'Data Scientist'): AnalysisResult => {
  const roleSkills = ROLE_SKILL_DEMAND[targetRole as keyof typeof ROLE_SKILL_DEMAND] || ROLE_SKILL_DEMAND['Data Scientist'];
  
  // Extract normalized skills from resume
  const userSkills = parsedResume.skills.map(skillMatch => skillMatch.normalizedSkill.toLowerCase());
  const userSkillsSet = new Set(userSkills);
  
  // Calculate skill coverage for each category
  const essentialCoverage = calculateSkillCoverage(userSkillsSet, roleSkills.essential);
  const importantCoverage = calculateSkillCoverage(userSkillsSet, roleSkills.important);
  const valuableCoverage = calculateSkillCoverage(userSkillsSet, roleSkills.valuable);
  
  // Calculate experience score based on resume content
  const experienceScore = calculateExperienceScore(parsedResume.experience, targetRole);
  
  // Calculate education score
  const educationScore = calculateEducationScore(parsedResume.education, parsedResume.degree);
  
  // Calculate project score
  const projectScore = calculateProjectScore(parsedResume.projects);
  
  // Calculate skill quality score based on confidence and context
  const skillQualityScore = calculateSkillQualityScore(parsedResume.skills);
  
  // Overall score calculation with weighted components
  const overallScore = Math.round(
    (essentialCoverage * 0.35) + 
    (importantCoverage * 0.25) + 
    (valuableCoverage * 0.15) + 
    (experienceScore * 0.15) + 
    (skillQualityScore * 0.05) +
    (educationScore * 0.03) + 
    (projectScore * 0.02)
  );
  
  // Identify strengths based on actual resume content
  const strengths = identifyStrengths(parsedResume, roleSkills, userSkillsSet);
  
  // Identify skill gaps
  const gaps = identifySkillGaps(userSkillsSet, roleSkills);
  
  // Generate personalized recommendations
  const recommendations = generateRecommendations(gaps, targetRole, parsedResume);
  
  return {
    overallScore: Math.min(overallScore, 100),
    strengths,
    gaps,
    recommendations,
    skillsFound: parsedResume.skills,
    marketReadiness: {
      essential: essentialCoverage,
      important: importantCoverage,
      valuable: valuableCoverage
    }
  };
};

const calculateSkillCoverage = (userSkills: Set<string>, requiredSkills: string[]): number => {
  const normalizedRequired = requiredSkills.map(skill => skill.toLowerCase());
  const matchedSkills = normalizedRequired.filter(skill => 
    userSkills.has(skill) || 
    Array.from(userSkills).some(userSkill => 
      areSkillsSimilar(userSkill, skill)
    )
  );
  
  return Math.round((matchedSkills.length / normalizedRequired.length) * 100);
};

const areSkillsSimilar = (skill1: string, skill2: string): boolean => {
  const synonyms = {
    'machine learning': ['ml', 'artificial intelligence', 'ai'],
    'natural language processing': ['nlp'],
    'computer vision': ['cv'],
    'deep learning': ['dl', 'neural networks'],
    'tensorflow': ['tf'],
    'scikit-learn': ['sklearn'],
    'postgresql': ['postgres'],
    'javascript': ['js'],
    'artificial intelligence': ['ai', 'machine learning', 'ml'],
    'business intelligence': ['bi']
  };
  
  const skill1Lower = skill1.toLowerCase();
  const skill2Lower = skill2.toLowerCase();
  
  // Direct match
  if (skill1Lower === skill2Lower) return true;
  
  // Check synonyms
  for (const [key, values] of Object.entries(synonyms)) {
    if ((key === skill1Lower && values.includes(skill2Lower)) ||
        (key === skill2Lower && values.includes(skill1Lower))) {
      return true;
    }
  }
  
  // Partial match for compound skills
  if (skill1Lower.includes(skill2Lower) || skill2Lower.includes(skill1Lower)) {
    return skill1Lower.length > 2 && skill2Lower.length > 2;
  }
  
  return false;
};

const calculateExperienceScore = (experience: string[], targetRole: string): number => {
  const experienceText = experience.join(' ').toLowerCase();
  let score = 0;
  
  // Check for relevant role keywords
  const roleKeywords = {
    'Data Scientist': ['data scientist', 'machine learning', 'analytics', 'statistical analysis', 'predictive modeling'],
    'Data Analyst': ['data analyst', 'business analyst', 'reporting', 'dashboard', 'data visualization'],
    'ML Engineer': ['ml engineer', 'machine learning engineer', 'ai engineer', 'mlops', 'model deployment'],
    'Data Engineer': ['data engineer', 'etl', 'data pipeline', 'big data', 'data infrastructure'],
    'BI Analyst': ['business analyst', 'bi analyst', 'business intelligence', 'requirements', 'stakeholder'],
    'AI Researcher': ['ai researcher', 'research scientist', 'machine learning researcher', 'publications', 'conferences']
  };
  
  const keywords = roleKeywords[targetRole as keyof typeof roleKeywords] || [];
  const keywordMatches = keywords.filter(keyword => experienceText.includes(keyword)).length;
  score += (keywordMatches / keywords.length) * 40;
  
  // Check for seniority indicators
  if (experienceText.includes('senior') || experienceText.includes('lead')) score += 25;
  if (experienceText.includes('principal') || experienceText.includes('manager')) score += 35;
  if (experienceText.includes('director') || experienceText.includes('head of')) score += 40;
  
  // Check for years of experience
  const yearMatches = experienceText.match(/(\d+)\s*years?/g);
  if (yearMatches) {
    const years = Math.max(...yearMatches.map(match => parseInt(match)));
    score += Math.min(years * 8, 40);
  }
  
  // Check for impact metrics
  if (experienceText.includes('%') || experienceText.includes('million') || experienceText.includes('thousand')) {
    score += 15;
  }
  
  // Check for leadership and mentoring
  if (experienceText.includes('led') || experienceText.includes('managed') || experienceText.includes('mentored')) {
    score += 10;
  }
  
  return Math.min(score, 100);
};

const calculateEducationScore = (education: string[], degree: string): number => {
  const educationText = (education.join(' ') + ' ' + degree).toLowerCase();
  let score = 0;
  
  // Degree level scoring
  if (educationText.includes('phd') || educationText.includes('doctorate')) score += 40;
  else if (educationText.includes('msc') || educationText.includes('master')) score += 30;
  else if (educationText.includes('bsc') || educationText.includes('bachelor')) score += 20;
  
  // Relevant field scoring
  const relevantFields = [
    'data science', 'computer science', 'mathematics', 'statistics', 
    'artificial intelligence', 'machine learning', 'physics', 'engineering',
    'computational', 'quantitative', 'analytics'
  ];
  const fieldMatches = relevantFields.filter(field => educationText.includes(field)).length;
  score += (fieldMatches / relevantFields.length) * 30;
  
  // University prestige (UK focus)
  const topUniversities = [
    'cambridge', 'oxford', 'imperial', 'ucl', 'edinburgh', 'manchester', 
    'warwick', 'bristol', 'glasgow', 'birmingham', 'leeds', 'sheffield'
  ];
  if (topUniversities.some(uni => educationText.includes(uni))) score += 20;
  
  return Math.min(score, 100);
};

const calculateProjectScore = (projects: string[]): number => {
  const projectText = projects.join(' ').toLowerCase();
  let score = projects.length * 15; // Base score for having projects
  
  // Check for technical keywords
  const techKeywords = [
    'machine learning', 'deep learning', 'neural network', 'ai', 'prediction', 
    'classification', 'regression', 'clustering', 'nlp', 'computer vision',
    'data pipeline', 'etl', 'dashboard', 'visualization', 'analysis'
  ];
  const techMatches = techKeywords.filter(keyword => projectText.includes(keyword)).length;
  score += (techMatches / techKeywords.length) * 30;
  
  // Check for deployment/production keywords
  const deploymentKeywords = ['deployed', 'production', 'api', 'web app', 'dashboard', 'system', 'platform'];
  const deploymentMatches = deploymentKeywords.filter(keyword => projectText.includes(keyword)).length;
  score += (deploymentMatches / deploymentKeywords.length) * 25;
  
  // Check for impact metrics
  if (projectText.includes('%') || projectText.includes('improved') || projectText.includes('increased') || 
      projectText.includes('reduced') || projectText.includes('optimized')) {
    score += 20;
  }
  
  // Check for collaboration indicators
  if (projectText.includes('team') || projectText.includes('collaborated') || projectText.includes('led')) {
    score += 10;
  }
  
  return Math.min(score, 100);
};

const calculateSkillQualityScore = (skills: SkillMatch[]): number => {
  if (skills.length === 0) return 0;
  
  const avgConfidence = skills.reduce((sum, skill) => sum + skill.confidence, 0) / skills.length;
  const skillsInTechnicalSections = skills.filter(skill => 
    skill.section === 'skills' || skill.section === 'experience' || skill.section === 'projects'
  ).length;
  
  const sectionScore = (skillsInTechnicalSections / skills.length) * 100;
  const confidenceScore = avgConfidence * 100;
  
  return Math.round((sectionScore * 0.6) + (confidenceScore * 0.4));
};

const identifyStrengths = (parsedResume: ParsedResume, roleSkills: any, userSkills: Set<string>): string[] => {
  const strengths: string[] = [];
  
  // Technical skills strengths based on actual resume content
  const strongSkills = parsedResume.skills
    .filter(skillMatch => skillMatch.confidence > 0.7)
    .filter(skillMatch => 
      roleSkills.essential.some((req: string) => 
        areSkillsSimilar(skillMatch.normalizedSkill, req)
      )
    )
    .slice(0, 3);
  
  if (strongSkills.length > 0) {
    strengths.push(`Strong foundation in essential skills: ${strongSkills.map(s => s.skill).join(', ')}`);
  }
  
  // Education strengths
  if (parsedResume.degree.toLowerCase().includes('phd')) {
    strengths.push('Advanced doctoral-level expertise in relevant field');
  } else if (parsedResume.degree.toLowerCase().includes('msc') || parsedResume.degree.toLowerCase().includes('master')) {
    strengths.push('Advanced academic qualifications with specialized knowledge');
  }
  
  // Experience strengths based on actual content
  const experienceText = parsedResume.experience.join(' ').toLowerCase();
  if (experienceText.includes('senior') || experienceText.includes('lead') || experienceText.includes('principal')) {
    strengths.push('Demonstrated leadership and senior-level experience');
  }
  
  if (experienceText.includes('managed') || experienceText.includes('led team') || experienceText.includes('mentored')) {
    strengths.push('Proven team leadership and mentoring capabilities');
  }
  
  // Project strengths
  if (parsedResume.projects.length >= 3) {
    strengths.push(`Extensive practical experience with ${parsedResume.projects.length} documented projects`);
  }
  
  // Industry experience
  const industryKeywords = ['google', 'microsoft', 'amazon', 'meta', 'apple', 'netflix', 'deepmind'];
  if (industryKeywords.some(company => experienceText.includes(company))) {
    strengths.push('Experience at leading technology companies');
  }
  
  // Research and publications
  if (experienceText.includes('published') || experienceText.includes('research') || experienceText.includes('paper')) {
    strengths.push('Research experience with publications and academic contributions');
  }
  
  // Certifications
  if (experienceText.includes('certified') || experienceText.includes('certification')) {
    strengths.push('Professional certifications demonstrating validated expertise');
  }
  
  return strengths.slice(0, 5);
};

const identifySkillGaps = (userSkills: Set<string>, roleSkills: any): string[] => {
  const gaps: string[] = [];
  
  // Check essential skills gaps (highest priority)
  const essentialGaps = roleSkills.essential.filter((skill: string) => 
    !userSkills.has(skill.toLowerCase()) && 
    !Array.from(userSkills).some(userSkill => areSkillsSimilar(userSkill, skill))
  );
  
  // Check important skills gaps
  const importantGaps = roleSkills.important.filter((skill: string) => 
    !userSkills.has(skill.toLowerCase()) && 
    !Array.from(userSkills).some(userSkill => areSkillsSimilar(userSkill, skill))
  );
  
  // Prioritize essential gaps first, then important gaps
  gaps.push(...essentialGaps.slice(0, 3));
  gaps.push(...importantGaps.slice(0, 3));
  
  return gaps.slice(0, 6);
};

const generateRecommendations = (gaps: string[], targetRole: string, parsedResume: ParsedResume): Recommendation[] => {
  const recommendations: Recommendation[] = [];
  
  gaps.slice(0, 4).forEach((skill, index) => {
    const priority = index < 2 ? 'High' : 'Medium';
    const impact = getSkillImpact(skill, targetRole);
    const resources = SKILL_RESOURCES[skill as keyof typeof SKILL_RESOURCES];
    
    if (resources) {
      recommendations.push({
        skill,
        priority: priority as 'High' | 'Medium',
        impact,
        resources: [
          resources.courses[0],
          resources.certifications[0],
          resources.practice[0]
        ],
        type: index % 3 === 0 ? 'Course' : index % 3 === 1 ? 'Certification' : 'Practice',
        estimatedTime: resources.estimatedTime,
        costRange: resources.costRange
      });
    } else {
      // Generic recommendation for skills without specific resources
      recommendations.push({
        skill,
        priority: priority as 'High' | 'Medium',
        impact,
        resources: [
          `Online courses for ${skill}`,
          `Professional certification in ${skill}`,
          `Hands-on projects using ${skill}`
        ],
        type: 'Course',
        estimatedTime: '2-4 months',
        costRange: '£50-£300'
      });
    }
  });
  
  return recommendations;
};

const getSkillImpact = (skill: string, targetRole: string): string => {
  const impacts: { [key: string]: { [role: string]: string } } = {
    'Machine Learning': {
      'Data Scientist': 'Essential for 95% of Data Scientist roles - salary increase of £8,000-£15,000',
      'Data Analyst': 'Opens transition to Data Scientist roles - 40% salary increase potential',
      'ML Engineer': 'Core requirement - enables senior role progression',
      'Data Engineer': 'Valuable for ML pipeline development - £5,000-£10,000 salary premium',
      'BI Analyst': 'Differentiates from traditional analysts - 25% more job opportunities',
      'AI Researcher': 'Fundamental requirement - essential for research positions'
    },
    'Python': {
      'Data Scientist': 'Required for 98% of positions - fundamental programming skill',
      'Data Analyst': 'Increases job opportunities by 60% - essential for career growth',
      'ML Engineer': 'Primary programming language - non-negotiable requirement',
      'Data Engineer': 'Core skill for data processing - required for 90% of roles',
      'BI Analyst': 'Enables advanced analytics - significant competitive advantage',
      'AI Researcher': 'Primary research tool - essential for implementation'
    },
    'AWS': {
      'Data Scientist': 'Cloud skills increase opportunities by 45% - £6,000-£12,000 premium',
      'Data Analyst': 'Growing requirement - 30% of new roles require cloud skills',
      'ML Engineer': 'Essential for model deployment - required for senior positions',
      'Data Engineer': 'Critical for modern data infrastructure - £8,000-£15,000 premium',
      'BI Analyst': 'Valuable for cloud-based BI solutions - emerging requirement',
      'AI Researcher': 'Important for scalable research infrastructure'
    },
    'SQL': {
      'Data Scientist': 'Required for 90% of positions - data access fundamental',
      'Data Analyst': 'Essential skill - required for 99% of analyst roles',
      'ML Engineer': 'Important for data pipeline work - widely required',
      'Data Engineer': 'Core requirement - fundamental for data engineering',
      'BI Analyst': 'Essential skill - required for all BI positions',
      'AI Researcher': 'Useful for data management in research projects'
    }
  };
  
  return impacts[skill]?.[targetRole] || `Valuable skill for ${targetRole} career advancement - enhances market competitiveness`;
};