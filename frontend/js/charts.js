// Simple chart functionality for progress tracking
console.log("Charts loaded");

// Basic line chart drawing function
function drawLineChart(canvas, data, options = {}) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  const padding = options.padding || 40;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  if (data.length < 2) {
    ctx.fillStyle = '#666';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Not enough data to display chart', width / 2, height / 2);
    return;
  }
  
  // Find min/max values
  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue || 1;
  
  // Draw grid lines
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const y = padding + (i * chartHeight / 5);
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }
  
  // Draw data line
  ctx.strokeStyle = options.color || '#ff9a9e';
  ctx.lineWidth = 3;
  ctx.beginPath();
  
  data.forEach((point, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
    
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  
  ctx.stroke();
  
  // Draw data points
  ctx.fillStyle = options.color || '#ff9a9e';
  data.forEach((point, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
    
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
  });
  
  // Draw labels
  ctx.fillStyle = '#666';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  
  // Y-axis labels
  for (let i = 0; i <= 5; i++) {
    const value = minValue + (i * valueRange / 5);
    const y = padding + chartHeight - (i * chartHeight / 5);
    ctx.textAlign = 'right';
    ctx.fillText(value.toFixed(1), padding - 10, y + 4);
  }
  
  // X-axis labels (show first, middle, last)
  ctx.textAlign = 'center';
  if (data.length > 0) {
    ctx.fillText(data[0].label || '', padding, height - 10);
    if (data.length > 2) {
      const midIndex = Math.floor(data.length / 2);
      const midX = padding + (midIndex / (data.length - 1)) * chartWidth;
      ctx.fillText(data[midIndex].label || '', midX, height - 10);
    }
    if (data.length > 1) {
      ctx.fillText(data[data.length - 1].label || '', width - padding, height - 10);
    }
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { drawLineChart };
}