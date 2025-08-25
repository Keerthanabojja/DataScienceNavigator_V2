import React, { useState } from 'react';
import { Upload, FileText, Brain, TrendingUp, AlertCircle, CheckCircle, Target, Info, Download } from 'lucide-react';
import { parseResumeFile } from '../utils/resumeParser';
import { analyzeResume, AnalysisResult } from '../utils/aiAnalysis';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ResumeAnalysis = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [targetRole, setTargetRole] = useState('Data Scientist');
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [analysisCache, setAnalysisCache] = useState<Map<string, AnalysisResult>>(new Map());

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setError(null);
      setAnalysisComplete(false);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (file) {
      // Create cache key based on file name, size, and target role
      const cacheKey = `${file.name}-${file.size}-${targetRole}`;
      
      // Check cache first
      if (analysisCache.has(cacheKey)) {
        setAnalysisResult(analysisCache.get(cacheKey)!);
        setAnalysisComplete(true);
        return;
      }
      
      setIsAnalyzing(true);
      setError(null);
      
      try {
        // Parse the resume file
        const parsedResume = await parseResumeFile(file);
        
        // Auto-update user profile if name/university found and not already set
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          let updated = false;
          
          if (!profile.name && parsedResume.name) {
            profile.name = parsedResume.name;
            updated = true;
          }
          
          if (!profile.university && parsedResume.university) {
            profile.university = parsedResume.university;
            updated = true;
          }
          
          if (updated) {
            localStorage.setItem('userProfile', JSON.stringify(profile));
          }
        }
        
        // Analyze the parsed resume
        const result = analyzeResume(parsedResume, targetRole);
        
        // Cache the result
        const newCache = new Map(analysisCache);
        newCache.set(cacheKey, result);
        setAnalysisCache(newCache);
        
        // Simulate processing time for better UX
        setTimeout(() => {
          setAnalysisResult(result);
          setIsAnalyzing(false);
          setAnalysisComplete(true);
        }, 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to analyze resume');
        setIsAnalyzing(false);
      }
    }
  };

  const clearCache = () => {
    setAnalysisCache(new Map());
    if (file) {
      handleAnalyze();
    }
  };

  const downloadReport = async () => {
    if (!analysisResult) return;

    const reportElement = document.getElementById('analysis-report');
    if (!reportElement) return;

    try {
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`resume-analysis-report-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF report. Please try again.');
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Resume Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your resume to receive comprehensive analysis against UK job market data, 
            identify skill gaps, and get personalized career development recommendations.
          </p>
        </div>

        {!analysisComplete ? (
          <div className="max-w-2xl mx-auto">
            {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Your Resume</h2>
                
                {/* Target Role Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Role</label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Data Scientist">Data Scientist</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="ML Engineer">ML Engineer</option>
                    <option value="Data Engineer">Data Engineer</option>
                    <option value="Business Analyst">Business Analyst</option>
                  </select>
                </div>
                
                <p className="text-gray-600 mb-6">
                  Supported formats: PDF, DOC, DOCX (Max size: 10MB)
                </p>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <FileText className="h-12 w-12 text-gray-400 mb-4" />
                    <span className="text-lg font-medium text-gray-700">
                      Click to upload or drag and drop
                    </span>
                  </label>
                </div>

                {file && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-medium">{file.name}</span>
                    </div>
                  </div>
                )}

                {file && !isAnalyzing && (
                  <button
                    onClick={handleAnalyze}
                    className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <Brain className="h-5 w-5" />
                    <span>Analyze Resume</span>
                  </button>
                )}

                {isAnalyzing && (
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center space-x-2 text-blue-600">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="font-medium">Analyzing your resume...</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Our AI is comparing your skills against UK job market data
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mt-6 p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <span className="text-red-800 font-medium">{error}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Upload Resume</h3>
                <p className="text-sm text-gray-600">Securely upload your resume for analysis</p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-indigo-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
                <p className="text-sm text-gray-600">Compare against UK job market data</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get Insights</h3>
                <p className="text-sm text-gray-600">Receive personalized recommendations</p>
              </div>
            </div>
          </div>
        ) : (
          /* Analysis Results */
          <div id="analysis-report" className="space-y-8">
            {/* Overall Score */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Analysis Complete</h2>
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(analysisResult?.overallScore || 0) * 3.14} 314`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">{analysisResult?.overallScore || 0}%</span>
                  </div>
                </div>
                <p className="text-lg text-gray-600 mt-4">Market Readiness Score</p>
              </div>
            </div>

            {/* Skills Found */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Skills Found (from your resume)</h3>
                <button
                  onClick={clearCache}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                  title="Clear cache and reanalyze"
                >
                  <Download className="h-4 w-4" />
                  <span>Refresh Analysis</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {(analysisResult?.skillsFound || []).map((skillMatch, index) => (
                  <div key={index} className="relative">
                    <span 
                      className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors flex items-center space-x-1"
                      onMouseEnter={() => setShowTooltip(`skill-${index}`)}
                      onMouseLeave={() => setShowTooltip(null)}
                    >
                      <span>{skillMatch.skill}</span>
                      <Info className="h-3 w-3" />
                    </span>
                    {showTooltip === `skill-${index}` && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                        <div className="bg-gray-900 text-white p-3 rounded-lg shadow-lg max-w-xs text-xs">
                          <div className="font-semibold mb-1">Found in: {skillMatch.section}</div>
                          <div className="text-gray-300">"{skillMatch.context}"</div>
                          <div className="mt-1 text-gray-400">Confidence: {Math.round(skillMatch.confidence * 100)}%</div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {analysisResult?.skillsFound.length === 0 && (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No technical skills detected in your resume</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Make sure your resume includes a skills section or mentions technologies in your experience
                  </p>
                </div>
              )}
            </div>

            {/* Market Readiness Breakdown */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Target className="h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">Market Readiness Breakdown</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="30" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                      <circle
                        cx="40" cy="40" r="30"
                        stroke="#dc2626"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(analysisResult?.marketReadiness.essential || 0) * 1.88} 188`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">{analysisResult?.marketReadiness.essential || 0}%</span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900">Essential Skills</h4>
                  <p className="text-sm text-gray-600">Must-have for the role</p>
                </div>
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="30" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                      <circle
                        cx="40" cy="40" r="30"
                        stroke="#f59e0b"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(analysisResult?.marketReadiness.important || 0) * 1.88} 188`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">{analysisResult?.marketReadiness.important || 0}%</span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900">Important Skills</h4>
                  <p className="text-sm text-gray-600">Highly valued by employers</p>
                </div>
                <div className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="30" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                      <circle
                        cx="40" cy="40" r="30"
                        stroke="#10b981"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(analysisResult?.marketReadiness.valuable || 0) * 1.88} 188`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">{analysisResult?.marketReadiness.valuable || 0}%</span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900">Valuable Skills</h4>
                  <p className="text-sm text-gray-600">Nice-to-have advantages</p>
                </div>
              </div>
            </div>

            {/* Strengths and Gaps */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Strengths */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Strengths</h3>
                </div>
                <div className="space-y-4">
                  {(analysisResult?.strengths || []).map((strength, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Gaps */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <AlertCircle className="h-8 w-8 text-orange-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Skill Gaps</h3>
                </div>
                <div className="space-y-4">
                  {(analysisResult?.gaps || []).map((gap, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{gap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-8">
                <Target className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Personalized Learning Recommendations</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {(analysisResult?.recommendations || []).map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-900">{rec.skill}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        rec.priority === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {rec.priority} Priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{rec.impact}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Time: {rec.estimatedTime}</span>
                      <span>Cost: {rec.costRange}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-2">Learning Resources:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {rec.resources.map((resource, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                            <span>{resource}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              {analysisResult?.recommendations.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Excellent! No critical skill gaps identified</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Your skills align well with {targetRole} requirements
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="text-center">
              <button
                onClick={() => {
                  setFile(null);
                  setAnalysisComplete(false);
                  setAnalysisResult(null);
                  setError(null);
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors mr-4"
              >
                Analyze Another Resume
              </button>
              <button 
                onClick={downloadReport}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Download Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalysis;