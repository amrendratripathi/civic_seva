import { getComplaintStats } from '@/data/mockData';
import { FileText, CheckCircle, AlertCircle, MapPin } from 'lucide-react';

const DashboardHome = () => {
  const stats = getComplaintStats();

  const statCards = [
    {
      title: 'Total Complaints',
      value: stats.total,
      icon: FileText,
      color: 'text-primary',
      glowClass: 'glow-effect'
    },
    {
      title: 'Solved Complaints',
      value: stats.solved,
      icon: CheckCircle,
      color: 'text-secondary',
      glowClass: 'glow-orange'
    },
    {
      title: 'Unsolved Complaints',
      value: stats.unsolved,
      icon: AlertCircle,
      color: 'text-accent',
      glowClass: 'glow-amber'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Welcome to Civic Dashboard
        </h1>
        <p className="text-xl text-muted-foreground">
          Managing civic complaints with futuristic precision
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {statCards.map((card, index) => (
          <div
            key={card.title}
            className={`bg-gradient-card p-6 rounded-xl border border-border card-hover ${card.glowClass}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <card.icon className={`w-8 h-8 ${card.color}`} />
              <div className={`text-3xl font-bold ${card.color}`}>
                {card.value}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">
              {card.title}
            </h3>
          </div>
        ))}
      </div>

      <div className="bg-gradient-card p-8 rounded-xl border border-border">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-card-foreground">
            Complaint Hotspots
          </h2>
        </div>
        
        <div className="bg-muted rounded-lg p-6 h-64 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
          
          {/* Mock world map with pulsating dots */}
          <div className="relative w-full h-full">
            <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-primary rounded-full animate-pulse glow-effect"></div>
            <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-secondary rounded-full animate-pulse glow-orange" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-2/3 left-1/2 w-3 h-3 bg-accent rounded-full animate-pulse glow-amber" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-primary rounded-full animate-pulse glow-effect" style={{ animationDelay: '1.5s' }}></div>
            
            <div className="text-center text-muted-foreground">
              <div className="text-lg font-semibold mb-2">Interactive Complaint Map</div>
              <div className="text-sm">High-density complaint areas are highlighted</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;