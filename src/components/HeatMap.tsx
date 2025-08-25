import React, { useEffect, useRef, useState } from 'react';
import { HeatMapData } from '../utils/marketData';

interface HeatMapProps {
  data: HeatMapData[];
  role: string;
  preferredCities?: string[];
  onCityClick?: (city: string) => void;
}

const HeatMap: React.FC<HeatMapProps> = ({ data, role, preferredCities = [], onCityClick }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = svgRef.current;
    const width = 800;
    const height = 600;

    // Clear previous content
    svg.innerHTML = '';

    // Create UK outline (more detailed)
    const ukPath = `M 200 100 
                   L 250 90 
                   L 300 95 
                   L 350 100 
                   L 400 110 
                   L 450 115 
                   L 500 120 
                   L 550 125 
                   L 600 130 
                   L 630 150 
                   L 650 180 
                   L 660 220 
                   L 650 260 
                   L 640 300 
                   L 630 340 
                   L 620 380 
                   L 600 420 
                   L 580 450 
                   L 550 470 
                   L 520 485 
                   L 480 495 
                   L 440 500 
                   L 400 495 
                   L 360 485 
                   L 320 470 
                   L 280 450 
                   L 250 420 
                   L 230 380 
                   L 220 340 
                   L 210 300 
                   L 200 260 
                   L 190 220 
                   L 185 180 
                   L 190 140 
                   L 200 100 Z`;

    // Add UK outline
    const outline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    outline.setAttribute('d', ukPath);
    outline.setAttribute('fill', '#f8fafc');
    outline.setAttribute('stroke', '#e2e8f0');
    outline.setAttribute('stroke-width', '2');
    svg.appendChild(outline);

    // Color scale based on salary
    const maxSalary = Math.max(...data.map(d => d.salary));
    const minSalary = Math.min(...data.map(d => d.salary));

    const getColor = (salary: number) => {
      const normalized = (salary - minSalary) / (maxSalary - minSalary);
      // Blue to red gradient
      const r = Math.round(50 + normalized * 200);
      const g = Math.round(100 - normalized * 50);
      const b = Math.round(255 - normalized * 100);
      return `rgb(${r}, ${g}, ${b})`;
    };

    // Add data points
    data.forEach((point, index) => {
      // Convert lat/lng to SVG coordinates (improved projection)
      const x = ((point.coordinates[1] + 8) / 10) * width + 50;
      const y = height - ((point.coordinates[0] - 49) / 12) * height - 50;

      // Calculate circle size based on job openings
      const maxOpenings = Math.max(...data.map(d => d.openings));
      const minRadius = 8;
      const maxRadius = 25;
      const radius = minRadius + ((point.openings / maxOpenings) * (maxRadius - minRadius));

      // Create circle for each region
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x.toString());
      circle.setAttribute('cy', y.toString());
      circle.setAttribute('r', radius.toString());
      circle.setAttribute('fill', getColor(point.salary));
      circle.setAttribute('stroke', preferredCities.includes(point.region) ? '#fbbf24' : '#ffffff');
      circle.setAttribute('stroke-width', preferredCities.includes(point.region) ? '4' : '2');
      circle.setAttribute('opacity', '0.8');
      circle.style.cursor = 'pointer';
      circle.style.transition = 'all 0.3s ease';

      // Add hover and click effects
      circle.addEventListener('mouseenter', (e) => {
        circle.setAttribute('opacity', '1');
        circle.setAttribute('stroke-width', '3');
        circle.style.transform = 'scale(1.1)';
        circle.style.transformOrigin = `${x}px ${y}px`;
        
        showTooltip(e, point);
      });

      circle.addEventListener('mouseleave', () => {
        circle.setAttribute('opacity', '0.8');
        circle.setAttribute('stroke-width', preferredCities.includes(point.region) ? '4' : '2');
        circle.style.transform = 'scale(1)';
        hideTooltip();
      });

      circle.addEventListener('click', () => {
        setSelectedCity(point.region);
        if (onCityClick) {
          onCityClick(point.region);
        }
      });

      svg.appendChild(circle);

      // Add city labels
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', (x + radius + 5).toString());
      text.setAttribute('y', (y + 5).toString());
      text.setAttribute('font-size', '11');
      text.setAttribute('font-weight', preferredCities.includes(point.region) ? 'bold' : 'normal');
      text.setAttribute('fill', preferredCities.includes(point.region) ? '#f59e0b' : '#374151');
      text.textContent = point.region;
      text.style.pointerEvents = 'none';
      svg.appendChild(text);
    });

    // Add legend
    const legend = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    legend.setAttribute('transform', 'translate(50, 50)');

    // Legend background
    const legendBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    legendBg.setAttribute('x', '-10');
    legendBg.setAttribute('y', '-10');
    legendBg.setAttribute('width', '200');
    legendBg.setAttribute('height', '120');
    legendBg.setAttribute('fill', 'rgba(255, 255, 255, 0.95)');
    legendBg.setAttribute('stroke', '#e2e8f0');
    legendBg.setAttribute('rx', '8');
    legend.appendChild(legendBg);

    const legendTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    legendTitle.setAttribute('x', '0');
    legendTitle.setAttribute('y', '0');
    legendTitle.setAttribute('font-size', '14');
    legendTitle.setAttribute('font-weight', 'bold');
    legendTitle.setAttribute('fill', '#374151');
    legendTitle.textContent = `${role} Market Data`;
    legend.appendChild(legendTitle);

    // Color scale legend
    const colorScale = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    colorScale.setAttribute('transform', 'translate(0, 20)');
    
    for (let i = 0; i <= 10; i++) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', (i * 15).toString());
      rect.setAttribute('y', '0');
      rect.setAttribute('width', '15');
      rect.setAttribute('height', '10');
      rect.setAttribute('fill', getColor(minSalary + (i / 10) * (maxSalary - minSalary)));
      colorScale.appendChild(rect);
    }
    
    const minLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    minLabel.setAttribute('x', '0');
    minLabel.setAttribute('y', '25');
    minLabel.setAttribute('font-size', '10');
    minLabel.setAttribute('fill', '#6b7280');
    minLabel.textContent = `£${Math.round(minSalary / 1000)}k`;
    colorScale.appendChild(minLabel);
    
    const maxLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    maxLabel.setAttribute('x', '130');
    maxLabel.setAttribute('y', '25');
    maxLabel.setAttribute('font-size', '10');
    maxLabel.setAttribute('fill', '#6b7280');
    maxLabel.textContent = `£${Math.round(maxSalary / 1000)}k`;
    colorScale.appendChild(maxLabel);
    
    legend.appendChild(colorScale);

    // Size legend
    const sizeLegend = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    sizeLegend.setAttribute('x', '0');
    sizeLegend.setAttribute('y', '55');
    sizeLegend.setAttribute('font-size', '12');
    sizeLegend.setAttribute('fill', '#6b7280');
    sizeLegend.textContent = 'Circle Size: Job Openings';
    legend.appendChild(sizeLegend);

    // Preferred cities legend
    if (preferredCities.length > 0) {
      const prefLegend = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      prefLegend.setAttribute('transform', 'translate(0, 70)');
      
      const prefCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      prefCircle.setAttribute('cx', '8');
      prefCircle.setAttribute('cy', '8');
      prefCircle.setAttribute('r', '6');
      prefCircle.setAttribute('fill', '#3b82f6');
      prefCircle.setAttribute('stroke', '#fbbf24');
      prefCircle.setAttribute('stroke-width', '3');
      prefLegend.appendChild(prefCircle);
      
      const prefText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      prefText.setAttribute('x', '20');
      prefText.setAttribute('y', '12');
      prefText.setAttribute('font-size', '11');
      prefText.setAttribute('fill', '#6b7280');
      prefText.textContent = 'Your Preferred Cities';
      prefLegend.appendChild(prefText);
      
      legend.appendChild(prefLegend);
    }

    svg.appendChild(legend);

  }, [data, role, preferredCities]);

  const showTooltip = (event: MouseEvent, point: HeatMapData) => {
    const tooltip = document.getElementById('heatmap-tooltip');
    if (tooltip) {
      tooltip.style.display = 'block';
      tooltip.style.left = event.pageX + 10 + 'px';
      tooltip.style.top = event.pageY - 10 + 'px';
      tooltip.innerHTML = `
        <div class="bg-gray-900 text-white p-3 rounded-lg shadow-lg max-w-xs">
          <div class="font-bold text-lg">${point.region}</div>
          <div class="space-y-1 mt-2">
            <div>Average Salary: <span class="font-semibold text-green-400">£${point.salary.toLocaleString()}</span></div>
            <div>Job Openings: <span class="font-semibold text-blue-400">${point.openings}</span></div>
            <div>Market Growth: <span class="font-semibold text-purple-400">${point.growth}</span></div>
          </div>
          <div class="text-xs text-gray-400 mt-2">Click to view detailed insights</div>
        </div>
      `;
    }
  };

  const hideTooltip = () => {
    const tooltip = document.getElementById('heatmap-tooltip');
    if (tooltip) {
      tooltip.style.display = 'none';
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedCity(null);
  };

  return (
    <div className="relative">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <button
          onClick={handleZoomIn}
          className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-2 shadow-sm transition-colors"
          title="Zoom In"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-2 shadow-sm transition-colors"
          title="Zoom Out"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
          </svg>
        </button>
        <button
          onClick={handleReset}
          className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-2 shadow-sm transition-colors"
          title="Reset View"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Selected City Info */}
      {selectedCity && (
        <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-lg">{selectedCity}</h4>
            <button
              onClick={() => setSelectedCity(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {data.find(d => d.region === selectedCity) && (
            <div className="space-y-1 text-sm">
              <div>Salary: £{data.find(d => d.region === selectedCity)!.salary.toLocaleString()}</div>
              <div>Openings: {data.find(d => d.region === selectedCity)!.openings}</div>
              <div>Growth: {data.find(d => d.region === selectedCity)!.growth}</div>
            </div>
          )}
        </div>
      )}

      <svg
        ref={svgRef}
        width="100%"
        height="600"
        viewBox="0 0 800 600"
        className="border border-gray-200 rounded-lg bg-white"
        style={{
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          transition: 'transform 0.3s ease'
        }}
      />
      <div
        id="heatmap-tooltip"
        className="absolute pointer-events-none z-20"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default HeatMap;