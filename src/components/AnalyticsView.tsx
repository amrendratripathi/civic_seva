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
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-neutral-900 mb-4">
          Analytics Dashboard
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Comprehensive insights and data visualization for civic management
        </p>
        <div className="mt-6">
          <Button
            onClick={exportCSV}
            className="bg-gradient-to-r from-[hsl(32_100%_50%)] to-[hsl(25_95%_55%)] text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart - Complaints by Type */}
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[hsl(30_95%_90%)] flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-[hsl(32_100%_50%)]" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">Complaints by Type</h2>
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
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <PieIcon className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">Status Distribution</h2>
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
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900">Daily Complaints (Last 30 Days)</h2>
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
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Raw Data</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-4 px-4 text-neutral-900 font-semibold">Type</th>
                <th className="text-left py-4 px-4 text-neutral-900 font-semibold">Count</th>
                <th className="text-left py-4 px-4 text-neutral-900 font-semibold">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {complaintsByType.map((item, index) => (
                <tr key={item.name} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-4 text-neutral-700 font-medium">{item.name}</td>
                  <td className="py-4 px-4 text-neutral-600">{item.value}</td>
                  <td className="py-4 px-4 text-neutral-600">
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