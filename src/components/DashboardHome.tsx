import { getComplaintStats } from '@/data/mockData';
import { FileText, CheckCircle, AlertCircle, MapPin, TrendingUp, Clock, Users } from 'lucide-react';

const DashboardHome = () => {
  const stats = getComplaintStats();

  const statCards = [
    {
      title: 'Total Complaints',
      value: stats.total,
      icon: FileText,
      color: 'text-[hsl(32_100%_50%)]',
      bgColor: 'bg-[hsl(30_95%_90%)]',
      description: 'All reported issues'
    },
    {
      title: 'Resolved',
      value: stats.solved,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Successfully closed'
    },
    {
      title: 'In Progress',
      value: stats.unsolved,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Currently being addressed'
    },
    {
      title: 'Response Time',
      value: '2.4h',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Average resolution time'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'Pothole', location: 'Main Street, Sector 5', status: 'In Progress', time: '2 hours ago' },
    { id: 2, type: 'Streetlight', location: 'Park Avenue, Block C', status: 'Resolved', time: '4 hours ago' },
    { id: 3, type: 'Garbage', location: 'Residential Area A', status: 'Assigned', time: '6 hours ago' },
    { id: 4, type: 'Water Leak', location: 'Commercial District', status: 'In Progress', time: '8 hours ago' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-neutral-900 mb-4">
          Civic Dashboard
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Monitor and manage civic issues with real-time insights and AI-powered analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, index) => (
          <div
            key={card.title}
            className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <div className={`text-3xl font-bold ${card.color}`}>
                {card.value}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-1">
              {card.title}
            </h3>
            <p className="text-sm text-neutral-600">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Complaint Hotspots */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[hsl(30_95%_90%)] flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[hsl(32_100%_50%)]" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Complaint Hotspots
            </h2>
          </div>
          
          <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-xl p-6 h-80 flex items-center justify-center relative overflow-hidden">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[hsl(32_100%_50%)] to-[hsl(25_95%_55%)] flex items-center justify-center">
                <MapPin className="w-12 h-12 text-white" />
              </div>
              <div className="text-lg font-semibold text-neutral-700 mb-2">Interactive Map</div>
              <div className="text-sm text-neutral-600">Real-time complaint visualization</div>
              <div className="mt-4 text-xs text-neutral-500">Map integration coming soon</div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[hsl(30_95%_90%)] flex items-center justify-center">
              <Users className="w-5 h-5 text-[hsl(32_100%_50%)]" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Recent Activity
            </h2>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={activity.id} className="p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors duration-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-semibold text-neutral-900">{activity.type}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                    activity.status === 'In Progress' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {activity.status}
                  </span>
                </div>
                <div className="text-sm text-neutral-600 mb-1">{activity.location}</div>
                <div className="text-xs text-neutral-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gradient-to-r from-[hsl(32_100%_50%)] to-[hsl(25_95%_55%)] text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <FileText className="w-6 h-6 mb-2" />
            <div className="font-semibold">Report Issue</div>
            <div className="text-sm opacity-90">Submit new complaint</div>
          </button>
          <button className="p-4 bg-white border-2 border-[hsl(32_100%_50%)] text-[hsl(32_100%_50%)] rounded-xl hover:bg-[hsl(32_100%_50%/0.06)] transition-all duration-300 hover:-translate-y-1">
            <TrendingUp className="w-6 h-6 mb-2" />
            <div className="font-semibold">View Analytics</div>
            <div className="text-sm opacity-90">Check detailed reports</div>
          </button>
          <button className="p-4 bg-white border-2 border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-all duration-300 hover:-translate-y-1">
            <Users className="w-6 h-6 mb-2" />
            <div className="font-semibold">Manage Users</div>
            <div className="text-sm opacity-90">User management</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;