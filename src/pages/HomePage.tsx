import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  TrendingUp, 
  Users, 
  BarChart3, 
  Brain, 
  Target, 
  MapPin, 
  GraduationCap,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Upload,
      title: 'Resume Intelligence',
      description: 'Upload your resume for AI-powered analysis against UK job market data',
      link: '/resume-analysis'
    },
    {
      icon: BarChart3,
      title: 'Market Insights',
      description: 'Explore salary data, employment trends, and interactive heat maps',
      link: '/market-insights'
    },
    {
      icon: GraduationCap,
      title: 'University Connections',
      description: 'Discover employer-university recruitment relationships and alumni networks',
      link: '/university-connections'
    }
  ];

  const benefits = [
    'Identify skill gaps with precision AI analysis',
    'Get personalized career development recommendations',
    'Access real-time UK labour market intelligence',
    'Understand salary distributions across cities',
    'Leverage university-employer recruitment insights',
    'Make data-driven career decisions'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Navigate Your Career with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                AI Intelligence
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Bridge the gap between your skills and market demand. Our AI-powered platform analyzes 
              your resume against UK job market data to provide personalized career insights and recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/resume-analysis"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Upload className="h-5 w-5" />
                <span>Analyze My Resume</span>
              </Link>
              <Link
                to="/market-insights"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <TrendingUp className="h-5 w-5" />
                <span>Explore Market Data</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Intelligent Career Development Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leverage cutting-edge AI and comprehensive UK market data to make informed career decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-indigo-600">
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Data Science Navigator?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our platform combines advanced AI analysis with comprehensive UK labour market data 
                to provide unparalleled career intelligence and personalized recommendations.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Brain className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">AI Analysis</h4>
                    <p className="text-sm text-gray-600">Advanced algorithms</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Precision</h4>
                    <p className="text-sm text-gray-600">Accurate insights</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MapPin className="h-8 w-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">UK Focus</h4>
                    <p className="text-sm text-gray-600">Local market data</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-8 w-8 text-orange-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Networks</h4>
                    <p className="text-sm text-gray-600">Alumni connections</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Navigate Your Career Success?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have transformed their careers with data-driven insights
          </p>
          <Link
            to="/resume-analysis"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center space-x-2"
          >
            <Upload className="h-5 w-5" />
            <span>Start Your Analysis Today</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;