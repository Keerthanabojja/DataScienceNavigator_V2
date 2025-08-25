import React, { useState } from 'react';
import { GraduationCap, Building2, Users, TrendingUp, Search, Filter } from 'lucide-react';
import { getUniversityData, getUniversityList, searchUniversities } from '../utils/universityData';

const UniversityConnections = () => {
  const [selectedUniversity, setSelectedUniversity] = useState('University of Cambridge');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [universitySearch, setUniversitySearch] = useState('');

  const universities = getUniversityList();
  const universityData = getUniversityData(selectedUniversity);

  const handleUniversityChange = async (university: string) => {
    setIsLoading(true);
    
    // Simulate loading time for better UX
    setTimeout(() => {
      setSelectedUniversity(university);
      setIsLoading(false);
    }, 500);
  };

  // Filter employers based on search term
  const filteredEmployers = universityData.topEmployers.filter(employer =>
    employer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredUniversities = searchUniversities(universitySearch);

  const averageSuccessRate = Math.round(
    universityData.topEmployers.reduce((sum, emp) => sum + emp.successRate, 0) / universityData.topEmployers.length
  );

  // Load user preferences
  React.useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      if (profile.university) {
        setSelectedUniversity(profile.university);
      }
    }
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            University-Employer Connections
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover recruitment patterns, alumni networks, and career pathways between UK universities 
            and leading employers in the data science field.
          </p>
        </div>

        {/* University Selector */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Select University</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search universities..."
                value={universitySearch}
                onChange={(e) => setUniversitySearch(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {universitySearch && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {filteredUniversities.map(uni => (
                    <button
                      key={uni}
                      onClick={() => {
                        handleUniversityChange(uni);
                        setUniversitySearch('');
                      }}
                      className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      {uni}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          {isLoading && (
            <div className="mt-4 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-blue-600">Loading university data...</span>
            </div>
          )}
        </div>

        {/* University Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Alumni</p>
                <p className="text-2xl font-bold">{universityData.totalAlumni.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Data Science Alumni</p>
                <p className="text-2xl font-bold">{universityData.dataScience.toLocaleString()}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-green-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Top Employers</p>
                <p className="text-2xl font-bold">{universityData.topEmployers.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-purple-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Avg Success Rate</p>
                <p className="text-2xl font-bold">{averageSuccessRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-200" />
            </div>
          </div>
        </div>

        {/* Top Employers */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Building2 className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Top Employers for {selectedUniversity} Alumni</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Company</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Alumni Hired</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Avg Salary</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployers.map((employer, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{employer.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium text-gray-900">{employer.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{employer.hires}</td>
                    <td className="py-4 px-4 text-gray-700">£{employer.avgSalary.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        {employer.successRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Industry Distribution and Alumni Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Industry Distribution */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Industry Distribution</h3>
            </div>
            <div className="space-y-4">
              {universityData.industries.map((industry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-700 font-medium">{industry.name}</span>
                    <span className="text-green-600 text-sm font-medium">{industry.growth}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${industry.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-900 font-semibold">{industry.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recruitment Timeline */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900">Recruitment Timeline</h3>
            </div>
            <div className="space-y-3">
              {universityData.recruitmentTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium w-12">{trend.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full"
                        style={{ width: `${(trend.hires / Math.max(...universityData.recruitmentTrends.map(t => t.hires))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-gray-900 font-semibold w-8">{trend.hires}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alumni Success Stories */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="h-6 w-6 text-indigo-600" />
            <h3 className="text-xl font-bold text-gray-900">Alumni Success Stories</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {universityData.alumniStories.map((alumni, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{alumni.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{alumni.name}</h4>
                    <p className="text-sm text-gray-600">{alumni.role} at {alumni.company}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Career Path:</p>
                  <p className="text-sm text-gray-800">{alumni.path}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 italic">"{alumni.advice}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityConnections;