import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User,
  Edit3,
  TrendingUp, 
  Target, 
  BookOpen, 
  Calendar, 
  Award,
  BarChart3,
  Users,
  MapPin,
  Clock,
  ExternalLink,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import OnboardingModal from '../components/OnboardingModal';
import { getMarketData } from '../utils/marketData';
import { getUniversityData } from '../utils/universityData';

interface UserProfile {
  name: string;
  role: string;
  city: string;
  experience: string;
  university: string;
  cities: string[];
}

const Dashboard = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    role: 'Data Analyst',
    city: 'London',
    experience: 'Entry Level (0-2 years)',
    university: 'University of Manchester',
    cities: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = () => {
      try {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          setUserProfile(profile);
          setIsLoading(false);
        } else {
          setShowOnboarding(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setShowOnboarding(true);
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleOnboardingComplete = (data: UserProfile) => {
    setUserProfile(data);
    localStorage.setItem('userProfile', JSON.stringify(data));
    setShowOnboarding(false);
    setIsEditMode(false);
  };

  const handleEditProfile = () => {
    setIsEditMode(true);
    setShowOnboarding(true);
  };

  const handleCloseModal = () => {
    setShowOnboarding(false);
    setIsEditMode(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get personalized market data
  const marketData = getMarketData(userProfile.role, userProfile.city);
  const universityData = getUniversityData(userProfile.university);

  // Generate role-specific skills and recommendations
  const getRoleSkills = (role: string) => {
    const roleSkills = {
      'Data Scientist': ['Python', 'Machine Learning', 'Statistics', 'SQL', 'TensorFlow'],
      'Data Analyst': ['SQL', 'Excel', 'Tableau', 'Python', 'Statistics'],
      'ML Engineer': ['Python', 'TensorFlow', 'Docker', 'Kubernetes', 'MLOps'],
      'Data Engineer': ['Python', 'SQL', 'Apache Spark', 'AWS', 'Docker'],
      'BI Analyst': ['SQL', 'Power BI', 'Tableau', 'Excel', 'Data Modeling'],
      'AI Researcher': ['Python', 'PyTorch', 'Research', 'Deep Learning', 'Mathematics']
    };
    return roleSkills[role as keyof typeof roleSkills] || roleSkills['Data Scientist'];
  };

  const getTargetRole = (currentRole: string): string => {
    const roleProgression: { [key: string]: string } = {
      'Data Scientist': 'Senior Data Scientist',
      'Data Analyst': 'Senior Data Analyst',
      'ML Engineer': 'Senior ML Engineer',
      'Data Engineer': 'Senior Data Engineer',
      'BI Analyst': 'Senior BI Analyst',
      'AI Researcher': 'Principal AI Researcher'
    };
    return roleProgression[currentRole] || 'Senior ' + currentRole;
  };

  const getPersonalizedRecommendations = () => {
    const roleRecommendations: { [key: string]: any[] } = {
      'Data Scientist': [
        {
          type: 'Course',
          title: 'Advanced Machine Learning',
          provider: 'Coursera',
          duration: '3 months',
          impact: 'High',
          deadline: '2025-04-15'
        },
        {
          type: 'Certification',
          title: 'AWS Certified Data Analytics',
          provider: 'Amazon',
          duration: '2 months',
          impact: 'High',
          deadline: '2025-03-30'
        }
      ],
      'Data Analyst': [
        {
          type: 'Course',
          title: 'Advanced SQL for Analytics',
          provider: 'DataCamp',
          duration: '2 months',
          impact: 'High',
          deadline: '2025-04-15'
        },
        {
          type: 'Certification',
          title: 'Tableau Desktop Specialist',
          provider: 'Tableau',
          duration: '1 month',
          impact: 'High',
          deadline: '2025-03-30'
        }
      ],
      'ML Engineer': [
        {
          type: 'Course',
          title: 'MLOps Engineering',
          provider: 'Udacity',
          duration: '4 months',
          impact: 'High',
          deadline: '2025-05-15'
        },
        {
          type: 'Certification',
          title: 'Kubernetes Administrator',
          provider: 'CNCF',
          duration: '3 months',
          impact: 'High',
          deadline: '2025-04-30'
        }
      ]
    };
    
    return roleRecommendations[userProfile.role] || roleRecommendations['Data Scientist'];
  };

  const getSkillGaps = () => {
    const roleGaps: { [key: string]: any[] } = {
      'Data Scientist': [
        { skill: 'Deep Learning', priority: 'High', progress: 25 },
        { skill: 'MLOps', priority: 'High', progress: 10 },
        { skill: 'Apache Spark', priority: 'Medium', progress: 0 },
        { skill: 'Docker', priority: 'Medium', progress: 15 }
      ],
      'Data Analyst': [
        { skill: 'Python', priority: 'High', progress: 30 },
        { skill: 'Machine Learning', priority: 'Medium', progress: 5 },
        { skill: 'Advanced SQL', priority: 'High', progress: 45 },
        { skill: 'R Programming', priority: 'Medium', progress: 0 }
      ],
      'ML Engineer': [
        { skill: 'Kubernetes', priority: 'High', progress: 20 },
        { skill: 'MLOps', priority: 'High', progress: 35 },
        { skill: 'Model Deployment', priority: 'High', progress: 40 },
        { skill: 'CI/CD', priority: 'Medium', progress: 15 }
      ]
    };
    
    return roleGaps[userProfile.role] || roleGaps['Data Scientist'];
  };

  const currentSkills = getRoleSkills(userProfile.role);
  const targetRole = getTargetRole(userProfile.role);
  const skillGaps = getSkillGaps();
  const recommendations = getPersonalizedRecommendations();

  const recentActivity = [
    { action: `Completed ${userProfile.role} assessment`, date: '2 days ago', type: 'skill' },
    { action: `Viewed ${universityData.topEmployers[0]?.name || 'top company'} job requirements`, date: '3 days ago', type: 'research' },
    { action: 'Updated resume analysis', date: '1 week ago', type: 'analysis' },
    { action: `Explored ${userProfile.city} market data`, date: '1 week ago', type: 'market' }
  ];

  const marketInsights = {
    averageSalary: marketData.nationalAverage,
    salaryIncrease: marketData.marketGrowth,
    jobOpenings: marketData.jobOpenings,
    topSkillDemand: marketData.skillsData[0]?.skill || 'Python'
  };

  return (
    <>
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={handleCloseModal}
        onComplete={handleOnboardingComplete}
        initialData={isEditMode ? userProfile : undefined}
      />
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Welcome back, {userProfile.name || 'User'}
                </h1>
                <p className="text-xl text-gray-600">
                  Your personalized career development dashboard
                </p>
              </div>
              <button
                onClick={handleEditProfile}
                className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                <Edit3 className="h-4 w-4 text-gray-600" />
                <span className="text-gray-700 font-medium">Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Profile Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <Target className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-gray-600 text-sm">Role</p>
                  <p className="font-semibold text-gray-900">{userProfile.role}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-gray-600 text-sm">City</p>
                  <p className="font-semibold text-gray-900">{userProfile.city}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <Briefcase className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="text-gray-600 text-sm">Experience</p>
                  <p className="font-semibold text-gray-900">{userProfile.experience}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-6 w-6 text-orange-600" />
                <div>
                  <p className="text-gray-600 text-sm">University</p>
                  <p className="font-semibold text-gray-900 text-xs">{userProfile.university}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Market Salary in {userProfile.city}</p>
                  <p className="text-2xl font-bold text-gray-900">£{marketInsights.averageSalary.toLocaleString()}</p>
                  <p className="text-green-600 text-sm font-medium">{marketInsights.salaryIncrease} vs last year</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Job Openings</p>
                  <p className="text-2xl font-bold text-gray-900">{marketInsights.jobOpenings}</p>
                  <p className="text-blue-600 text-sm font-medium">In {userProfile.city}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Skills Progress</p>
                  <p className="text-2xl font-bold text-gray-900">68%</p>
                  <p className="text-purple-600 text-sm font-medium">Target readiness</p>
                </div>
                <Target className="h-8 w-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Top Skill Demand</p>
                  <p className="text-2xl font-bold text-gray-900">{marketInsights.topSkillDemand}</p>
                  <p className="text-orange-600 text-sm font-medium">95% of jobs</p>
                </div>
                <Award className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Learning Path */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Recommended Learning Path</h2>
                </div>
                <div className="space-y-4">
                  {getPersonalizedRecommendations().map((rec, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rec.impact === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {rec.impact} Impact
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{rec.provider} • {rec.duration}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Target: {rec.deadline}</span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Start Learning
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full mt-2 bg-blue-500"></div>
                    <div>
                      <p className="text-sm text-gray-900">Profile updated</p>
                      <p className="text-xs text-gray-500">Just now</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full mt-2 bg-green-500"></div>
                    <div>
                      <p className="text-sm text-gray-900">Viewed {userProfile.role} market data</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full mt-2 bg-purple-500"></div>
                    <div>
                      <p className="text-sm text-gray-900">Explored {userProfile.university.split(' ').slice(-1)[0]} connections</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    to="/resume-analysis"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors block text-center"
                  >
                    Analyze Resume
                  </Link>
                  <Link
                    to={`/market-insights?role=${encodeURIComponent(userProfile.role)}&city=${encodeURIComponent(userProfile.city)}`}
                    className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors block text-center"
                  >
                    Explore Market
                  </Link>
                  <Link
                    to={`/university-connections?university=${encodeURIComponent(userProfile.university)}`}
                    className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors block text-center"
                  >
                    University Network
                  </Link>
                  <button 
                    onClick={handleEditProfile}
                    className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;