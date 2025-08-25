import React, { useState } from 'react';
import { BarChart3, MapPin, TrendingUp, DollarSign, Users, Filter } from 'lucide-react';
import { getMarketData, getHeatMapData, getAllCities, getAllRoles } from '../utils/marketData';
import HeatMap from '../components/HeatMap';

const MarketInsights = () => {
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedRole, setSelectedRole] = useState('Data Scientist');
  const [isLoading, setIsLoading] = useState(false);
  const [showHeatMap, setShowHeatMap] = useState(false);
  const [preferredCities, setPreferredCities] = useState<string[]>([]);

  const cities = getAllCities();
  const roles = getAllRoles();

  // Load user preferences
  React.useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      if (profile.cities) {
        setPreferredCities(profile.cities);
      }
      if (profile.role) {
        setSelectedRole(profile.role);
      }
    }
  }, []);

  // Get dynamic market data based on selections
  const marketData = getMarketData(selectedRole, selectedCity);
  const heatMapData = getHeatMapData(selectedRole);

  const handleFilterChange = async (type: 'role' | 'city', value: string) => {
    setIsLoading(true);
    
    // Simulate loading time for better UX
    setTimeout(() => {
      if (type === 'role') {
        setSelectedRole(value);
      } else {
        setSelectedCity(value);
      }
      setIsLoading(false);
    }, 500);
  };

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    setShowHeatMap(true);
  };

  const scrollToHeatMap = () => {
    setShowHeatMap(true);
    setTimeout(() => {
      const heatMapElement = document.getElementById('heat-map-section');
      if (heatMapElement) {
        heatMapElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            UK Labour Market Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive analysis of salary data, employment trends, and market opportunities 
            across the UK data science landscape.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Market Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={selectedRole}
                onChange={(e) => handleFilterChange('role', e.target.value)}
                disabled={isLoading}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select
                value={selectedCity}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                disabled={isLoading}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
          {isLoading && (
            <div className="mt-4 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-blue-600">Updating market data...</span>
            </div>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">National Average</p>
                <p className="text-2xl font-bold">£{marketData.nationalAverage.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Job Openings</p>
                <p className="text-2xl font-bold">{marketData.jobOpenings.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-green-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Market Growth</p>
                <p className="text-2xl font-bold">{marketData.marketGrowth}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Top City</p>
                <p className="text-2xl font-bold">{marketData.topCity}</p>
              </div>
              <MapPin className="h-8 w-8 text-orange-200" />
            </div>
          </div>
        </div>

        {/* Salary by City */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">Salary by City - {selectedRole}</h3>
            </div>
            <div className="space-y-4">
              {Object.entries(marketData.cityData).slice(0, 6).map(([city, salary]) => (
                <div key={city} className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{city}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                        style={{ width: `${Math.min((salary / marketData.nationalAverage) * 50, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-900 font-semibold">£{salary.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills in Demand */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Skills in Demand</h3>
            </div>
            <div className="space-y-4">
              {marketData.skillsData.map((trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-700 font-medium">{trend.skill}</span>
                    <span className="text-green-600 text-sm font-medium">{trend.growth}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${trend.demand}%` }}
                      ></div>
                    </div>
                    <span className="text-gray-900 font-semibold">{trend.demand}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Employment Hotspots */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <MapPin className="h-6 w-6 text-purple-600" />
            <h3 className="text-xl font-bold text-gray-900">Employment Hotspots</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketData.hotspots.map((hotspot, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-900">{hotspot.city}</h4>
                  <span className="text-green-600 font-medium text-sm">{hotspot.growth}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Job Openings</span>
                    <span className="font-semibold">{hotspot.jobs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Salary</span>
                    <span className="font-semibold">£{hotspot.avgSalary.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Heat Map */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <MapPin className="h-6 w-6 text-red-600" />
            <h3 className="text-xl font-bold text-gray-900">UK Salary Heat Map</h3>
          </div>
          {!showHeatMap ? (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Interactive Heat Map</h4>
                <p className="text-gray-600 mb-4">
                  Visualize salary distributions and employment density across the UK with our interactive map.
                </p>
                <button 
                  onClick={scrollToHeatMap}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors"
                >
                  Launch Interactive Map
                </button>
              </div>
            </div>
          ) : (
            <div id="heat-map-section">
              <div className="mb-4">
                <p className="text-gray-600">
                  Interactive visualization showing salary ranges (color) and job openings (size) for {selectedRole} positions across the UK. 
                  {preferredCities.length > 0 && ` Your preferred cities (${preferredCities.join(', ')}) are highlighted in gold.`}
                </p>
              </div>
              <HeatMap 
                data={heatMapData} 
                role={selectedRole} 
                preferredCities={preferredCities}
                onCityClick={handleCityClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;