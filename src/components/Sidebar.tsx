import { NavLink } from 'react-router-dom';
import { Home, FileText, BarChart3, User, Bell, Shield } from 'lucide-react';

const Sidebar = () => {
  // Use paths relative to the mounted dashboard route ("/dashboard/*")
  const navItems = [
    { path: '', icon: Home, label: 'Dashboard' },
    { path: 'complaints', icon: FileText, label: 'Complaints' },
    { path: 'analytics', icon: BarChart3, label: 'Analytics' },
    { path: 'profile', icon: User, label: 'Profile' },
    { path: 'notifications', icon: Bell, label: 'Notifications' },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen fixed left-0 top-0 z-40 animate-slide-in">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-button rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-sidebar-foreground">Civic Dashboard</h1>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-primary glow-effect'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary'
                }`
              }
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;