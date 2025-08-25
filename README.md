# Data Science Navigator

An AI-powered career development platform that helps students and professionals align their skills with UK labour market opportunities through intelligent resume analysis, market insights, and university-employer connections.

![Data Science Navigator](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-blue) ![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)

## 🚀 Features

### 📄 AI-Powered Resume Analysis
- **Dynamic Skill Extraction**: Automatically detects skills, technologies, and frameworks from uploaded resumes
- **Market Readiness Assessment**: Compares your skills against UK job market demand
- **Personalized Recommendations**: Get tailored learning paths with courses, certifications, and resources
- **Gap Analysis**: Identifies missing skills for your target role
- **Interactive Tooltips**: See exactly where each skill was found in your resume

### 📊 Market Insights
- **Real-time Salary Data**: UK-wide salary information by role and city
- **Employment Trends**: Job opening statistics and market growth rates
- **Skills Demand Analysis**: Most in-demand skills with growth projections
- **Interactive Heat Map**: Visual representation of opportunities across the UK
- **Employment Hotspots**: Identify the best cities for your career

### 🎓 University-Employer Connections
- **Alumni Networks**: Discover career paths of graduates from your university
- **Recruitment Patterns**: See which companies hire from specific universities
- **Success Stories**: Learn from alumni who've built successful careers
- **Industry Distribution**: Understand where graduates typically work
- **Hiring Timeline**: Know when companies recruit most actively

### 👤 Personalized Dashboard
- **Smart Onboarding**: Guided setup to personalize your experience
- **Progress Tracking**: Monitor your skill development journey
- **Quick Actions**: Easy access to analysis tools and market data
- **Activity History**: Track your platform usage and insights

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Routing**: React Router DOM for navigation
- **Build Tool**: Vite for fast development and building
- **Icons**: Lucide React for consistent iconography
- **File Processing**: Support for PDF, DOCX, and TXT resume uploads
- **Data Visualization**: Custom charts and interactive maps
- **PDF Generation**: Export analysis reports as PDFs

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Modern web browser

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/data-science-navigator.git
cd data-science-navigator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── HeatMap.tsx     # Interactive UK map
│   └── OnboardingModal.tsx # User setup modal
├── pages/              # Main application pages
│   ├── HomePage.tsx    # Landing page
│   ├── ResumeAnalysis.tsx # Resume upload and analysis
│   ├── MarketInsights.tsx # Labour market data
│   ├── UniversityConnections.tsx # Alumni networks
│   └── Dashboard.tsx   # Personalized dashboard
├── utils/              # Utility functions and data processing
│   ├── resumeParser.ts # Resume text extraction and parsing
│   ├── aiAnalysis.ts   # Skill analysis and recommendations
│   ├── marketData.ts   # UK labour market data
│   └── universityData.ts # University-employer connections
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 📊 Key Features Explained

### Resume Analysis Engine
The platform uses advanced text processing to:
- Extract skills from multiple resume sections (Skills, Experience, Projects)
- Normalize skill variations (e.g., "PyTorch" = "pytorch", "ML" → "Machine Learning")
- Calculate confidence scores based on context and section placement
- Generate market readiness scores by comparing found skills to role requirements

### Market Data Integration
- **Real-time Updates**: Market data reflects current UK employment trends
- **Role-specific Analysis**: Different insights for Data Scientists, Analysts, Engineers, etc.
- **Geographic Intelligence**: City-specific salary and opportunity data
- **Growth Projections**: Forward-looking market trend analysis

### University Intelligence
- **Alumni Tracking**: Career progression patterns from 60+ UK universities
- **Employer Relationships**: Which companies recruit from which universities
- **Success Metrics**: Placement rates and average salaries by institution
- **Industry Mapping**: Where graduates typically find employment

## 🎯 Usage Guide

### 1. Getting Started
- Visit the homepage and explore the platform overview
- Complete the onboarding process to personalize your experience
- Set your target role, preferred cities, and university background

### 2. Resume Analysis
- Upload your resume (PDF, DOCX, or TXT format)
- Select your target role for market comparison
- Review extracted skills with context tooltips
- Analyze your market readiness score
- Get personalized learning recommendations

### 3. Market Research
- Explore salary data by role and location
- Identify high-demand skills in your field
- Use the interactive heat map to find opportunities
- Research employment hotspots across the UK

### 4. University Connections
- Research your university's employer relationships
- Learn from alumni success stories
- Understand recruitment patterns and timing
- Explore industry distribution for graduates

### 5. Dashboard Monitoring
- Track your skill development progress
- Monitor market changes in your field
- Access quick actions for analysis and research
- Review your activity history and insights

## 🔒 Privacy & Data

- **Local Storage**: User preferences stored locally in browser
- **No Data Transmission**: Resume content processed entirely in browser
- **Privacy First**: No personal data sent to external servers
- **Secure Processing**: All analysis performed client-side

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain responsive design principles
- Write clear, documented code
- Test across different browsers

## 🐛 Known Issues & Limitations

- **File Processing**: Large PDF files (>10MB) may take longer to process
- **Skill Detection**: Complex or non-standard resume formats may affect accuracy
- **Browser Compatibility**: Optimized for modern browsers (Chrome, Firefox, Safari, Edge)

## 🔮 Future Enhancements

- **AI Integration**: Enhanced skill extraction using machine learning models
- **Real-time Data**: Live job market data integration
- **Mobile App**: Native mobile application
- **API Integration**: Connect with job boards and recruitment platforms
- **Advanced Analytics**: Deeper insights and predictive modeling

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/YOUR_USERNAME/data-science-navigator/issues) page
2. Create a new issue with detailed description
3. Include browser information and steps to reproduce

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **UK Labour Market Data**: Based on publicly available employment statistics
- **University Information**: Compiled from institutional reports and alumni networks
- **Design Inspiration**: Modern career development platforms and data visualization tools
- **Open Source Libraries**: Built with amazing open-source technologies

---

**Data Science Navigator** - Empowering careers through intelligent market analysis and personalized insights.

Made with ❤️ for the UK data science community.