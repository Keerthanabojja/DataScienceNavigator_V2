import React, { useState } from 'react';
import { X, User, Target, MapPin, Briefcase, GraduationCap } from 'lucide-react';

interface OnboardingData {
  name: string;
  role: string;
  city: string;
  experience: string;
  university: string;
}

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: OnboardingData) => void;
  initialData?: Partial<OnboardingData>;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ 
  isOpen, 
  onClose, 
  onComplete, 
  initialData = {} 
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    name: initialData.name || '',
    role: initialData.role || '',
    city: initialData.city || '',
    experience: initialData.experience || '',
    university: initialData.university || ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [universitySearch, setUniversitySearch] = useState('');

  const roles = [
    'Data Scientist',
    'Data Analyst', 
    'ML Engineer',
    'Data Engineer',
    'BI Analyst',
    'AI Researcher'
  ];

  const cities = [
    'London',
    'Manchester',
    'Birmingham',
    'Edinburgh',
    'Bristol',
    'Leeds',
    'Glasgow',
    'Liverpool',
    'Newcastle',
    'Sheffield',
    'Nottingham',
    'Cardiff',
    'Belfast',
    'Cambridge',
    'Oxford'
  ];

  const experienceLevels = [
    'Fresher (no experience)',
    'Entry Level (0-2 years)',
    'Mid (2-4 years)',
    'Senior (5+ years)'
  ];

  const universities = [
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
    'University of Surrey',
    'Lancaster University',
    'University of Leicester',
    'University of Reading',
    'University of Sussex',
    'Swansea University',
    'Bangor University',
    'Brunel University London',
    'City, University of London',
    'Coventry University',
    'De Montfort University',
    'University of Derby',
    'University of East Anglia',
    'University of Essex',
    'University of Greenwich',
    'University of Hertfordshire',
    'University of Hull',
    'Keele University',
    'University of Kent',
    'Kingston University',
    'University of Lincoln',
    'Liverpool John Moores University',
    'London Metropolitan University',
    'Manchester Metropolitan University',
    'Middlesex University',
    'Northumbria University',
    'University of Plymouth',
    'University of Portsmouth',
    'University of Salford',
    'Sheffield Hallam University',
    'University of South Wales',
    'Staffordshire University',
    'University of Sunderland',
    'Teesside University',
    'University of the West of England',
    'University of Westminster',
    'University of Wolverhampton'
  ];

  const filteredUniversities = universities.filter(uni =>
    uni.toLowerCase().includes(universitySearch.toLowerCase())
  );

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    switch (stepNumber) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = 'Please enter your full name';
        }
        break;
      case 2:
        if (!formData.role) {
          newErrors.role = 'Please select a role';
        }
        break;
      case 3:
        if (!formData.city) {
          newErrors.city = 'Please select a city';
        }
        break;
      case 4:
        if (!formData.experience) {
          newErrors.experience = 'Please select your experience level';
        }
        break;
      case 5:
        if (!formData.university) {
          newErrors.university = 'Please select a university';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 5) {
        setStep(step + 1);
      } else {
        onComplete(formData);
        onClose();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({});
    }
  };

  const handleSkip = () => {
    if (!formData.name.trim()) {
      setErrors({ name: 'Name is required before you can continue' });
      return;
    }
    onComplete(formData);
    onClose();
  };

  const canSave = formData.name.trim() && formData.role && formData.city && formData.experience && formData.university;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {initialData.name ? 'Edit Profile' : 'Welcome to Data Science Navigator'}
              </h2>
              <p className="text-gray-600 mt-2">
                {initialData.name ? 'Update your information' : 'Let\'s personalize your experience'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Step {step} of 5</span>
              <span className="text-sm text-gray-500">{Math.round((step / 5) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {step === 1 && (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <User className="h-8 w-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">What's your full name?</h3>
                </div>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, name: e.target.value }));
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-2">{errors.name}</p>
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="h-8 w-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">What role interests you most?</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {roles.map(role => (
                    <button
                      key={role}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, role }));
                        if (errors.role) setErrors(prev => ({ ...prev, role: '' }));
                      }}
                      className={`p-4 text-left rounded-xl border-2 transition-all ${
                        formData.role === role
                          ? 'border-blue-600 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{role}</span>
                    </button>
                  ))}
                </div>
                {errors.role && (
                  <p className="text-red-600 text-sm mt-2">{errors.role}</p>
                )}
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <MapPin className="h-8 w-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Which city interests you?</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {cities.map(city => (
                    <button
                      key={city}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, city }));
                        if (errors.city) setErrors(prev => ({ ...prev, city: '' }));
                      }}
                      className={`p-4 text-left rounded-xl border-2 transition-all ${
                        formData.city === city
                          ? 'border-blue-600 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{city}</span>
                    </button>
                  ))}
                </div>
                {errors.city && (
                  <p className="text-red-600 text-sm mt-2">{errors.city}</p>
                )}
              </div>
            )}

            {step === 4 && (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <Briefcase className="h-8 w-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">What's your experience level?</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {experienceLevels.map(level => (
                    <button
                      key={level}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, experience: level }));
                        if (errors.experience) setErrors(prev => ({ ...prev, experience: '' }));
                      }}
                      className={`p-4 text-left rounded-xl border-2 transition-all ${
                        formData.experience === level
                          ? 'border-blue-600 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <span className="font-medium">{level}</span>
                    </button>
                  ))}
                </div>
                {errors.experience && (
                  <p className="text-red-600 text-sm mt-2">{errors.experience}</p>
                )}
              </div>
            )}

            {step === 5 && (
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Which university did you attend?</h3>
                </div>
                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search universities..."
                    value={universitySearch}
                    onChange={(e) => setUniversitySearch(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-2">
                  {filteredUniversities.map(university => (
                    <button
                      key={university}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, university }));
                        setUniversitySearch('');
                        if (errors.university) setErrors(prev => ({ ...prev, university: '' }));
                      }}
                      className={`p-3 text-left rounded-lg border transition-all ${
                        formData.university === university
                          ? 'border-blue-600 bg-blue-50 text-blue-900'
                          : 'border-transparent hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="text-sm">{university}</span>
                    </button>
                  ))}
                </div>
                {formData.university && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 font-medium">Selected: {formData.university}</p>
                  </div>
                )}
                {errors.university && (
                  <p className="text-red-600 text-sm mt-2">{errors.university}</p>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                step === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Back
            </button>
            
            <div className="flex space-x-3">
              {!initialData.name && (
                <button
                  onClick={handleSkip}
                  className="px-6 py-3 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Skip
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={step === 5 && !canSave}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                  (step === 5 && !canSave)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                }`}
              >
                {step === 5 ? 'Save' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;