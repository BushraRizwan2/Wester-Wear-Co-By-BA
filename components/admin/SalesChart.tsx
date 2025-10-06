import React from 'react';

interface ChartData {
  label: string;
  value: number;
}

interface SalesChartProps {
  data: ChartData[];
}

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  if (data.length === 0) {
    return <div className="text-center p-16 text-text-secondary">No sales data to display for this period.</div>;
  }
  
  const maxValue = Math.max(...data.map(d => d.value), 0);
  const chartHeight = 300;
  const chartWidth = 800;
  const barWidth = chartWidth / data.length * 0.8;
  const barMargin = chartWidth / data.length * 0.2;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`} className="min-w-[600px]" aria-labelledby="sales-chart-title" role="graphics-document">
        <title id="sales-chart-title">Sales Revenue Chart</title>
        {/* Y-Axis Lines */}
        {[...Array(5)].map((_, i) => {
            const y = chartHeight - (chartHeight / 4) * i;
            return (
                 <g key={i} className="text-gray-300">
                    <line x1="0" y1={y} x2={chartWidth} y2={y} stroke="currentColor" strokeWidth="1" strokeDasharray="2,2"/>
                    <text x="-10" y={y + 5} textAnchor="end" className="text-xs fill-current text-text-secondary">
                        ${((maxValue / 4) * i).toFixed(0)}
                    </text>
                </g>
            )
        })}
        
        {/* Bars and Labels */}
        {data.map((d, index) => {
          const barHeight = maxValue > 0 ? (d.value / maxValue) * chartHeight : 0;
          const x = index * (barWidth + barMargin);
          const y = chartHeight - barHeight;

          return (
            <g key={d.label}>
              <title>{`${d.label}: $${d.value.toFixed(2)}`}</title>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                className="fill-current text-accent hover:text-blue-700 transition-colors"
              />
              <text
                x={x + barWidth / 2}
                y={chartHeight + 20}
                textAnchor="middle"
                className="text-xs fill-current text-text-secondary"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default SalesChart;