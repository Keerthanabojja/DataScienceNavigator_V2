import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResumeAnalysis from './pages/ResumeAnalysis';
import MarketInsights from './pages/MarketInsights';
import UniversityConnections from './pages/UniversityConnections';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resume-analysis" element={<ResumeAnalysis />} />
            <Route path="/market-insights" element={<MarketInsights />} />
            <Route path="/university-connections" element={<UniversityConnections />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;