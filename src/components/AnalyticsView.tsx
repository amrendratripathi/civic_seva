import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { getComplaintsByType, getDailyComplaints, getComplaintStats } from '@/data/mockData';
import { Download, TrendingUp, PieChart as PieIcon, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AnalyticsView = () => {
  const complaintsByType = getComplaintsByType();
  const dailyComplaints = getDailyComplaints();
  const stats = getComplaintStats();
  
  const pieData = [
    { name: 'Solved', value: stats.solved, color: 'hsl(var(--secondary))' },
    { name: 'Unsolved', value: stats.unsolved, color: 'hsl(var(--accent))' }
  ];

  const exportCSV = () => {
    const csvData = [
      ['Type', 'Count'],
      ...complaintsByType.map(item => [item.name, item.value])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'complaints-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <Button
          onClick={exportCSV}
          className="bg-gradient-button text-white glow-effect hover:scale-105 transition-transform"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Complaints by Type */}
        <div className="bg-gradient-card p-6 rounded-xl border border-border card-hover">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold text-card-foreground">Complaints by Type</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={complaintsByType}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--card-foreground))'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.3))' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Solved vs Unsolved */}
        <div className="bg-gradient-card p-6 rounded-xl border border-border card-hover">
          <div className="flex items-center gap-3 mb-6">
            <PieIcon className="w-6 h-6 text-secondary" />
            <h2 className="text-xl font-semibold text-card-foreground">Status Distribution</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    style={{ filter: `drop-shadow(0 0 8px ${entry.color}30)` }}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--card-foreground))'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {entry.name}: {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Line Chart - Daily Complaints */}
      <div className="bg-gradient-card p-6 rounded-xl border border-border card-hover">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-accent" />
          <h2 className="text-xl font-semibold text-card-foreground">Daily Complaints (Last 30 Days)</h2>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailyComplaints}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={10}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--card-foreground))'
              }}
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <Line 
              type="monotone" 
              dataKey="complaints" 
              stroke="hsl(var(--accent))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--accent))', strokeWidth: 2 }}
              style={{ filter: 'drop-shadow(0 0 8px hsl(var(--accent) / 0.3))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Data Table */}
      <div className="bg-gradient-card p-6 rounded-xl border border-border">
        <h2 className="text-xl font-semibold text-card-foreground mb-6">Raw Data</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-card-foreground font-semibold">Type</th>
                <th className="text-left py-3 px-4 text-card-foreground font-semibold">Count</th>
                <th className="text-left py-3 px-4 text-card-foreground font-semibold">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {complaintsByType.map((item, index) => (
                <tr key={item.name} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4 text-muted-foreground">{item.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{item.value}</td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {((item.value / stats.total) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;