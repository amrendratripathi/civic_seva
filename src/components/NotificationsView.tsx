import { useState, useEffect } from 'react';
import { Bell, Check, Clock, AlertTriangle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  timestamp: Date;
  read: boolean;
}

const NotificationsView = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Complaint Submitted',
      message: 'A new pothole complaint has been submitted from Main Street, Sector 12',
      type: 'info',
      timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
      read: false
    },
    {
      id: '2',
      title: 'Complaint Resolved',
      message: 'Water leak on Elm Street has been marked as resolved',
      type: 'success',
      timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
      read: false
    },
    {
      id: '3',
      title: 'High Priority Alert',
      message: 'Multiple complaints received for the same location - Highway 101',
      type: 'warning',
      timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
      read: true
    },
    {
      id: '4',
      title: 'System Update',
      message: 'Dashboard system will be updated tonight at 2:00 AM',
      type: 'info',
      timestamp: new Date(Date.now() - 4 * 60 * 60000), // 4 hours ago
      read: true
    }
  ]);

  const [showNotificationAlert, setShowNotificationAlert] = useState(false);

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const shouldShowNotification = Math.random() < 0.1; // 10% chance every 5 seconds
      
      if (shouldShowNotification) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          title: 'New Complaint Received',
          message: `New ${['Pothole', 'Garbage', 'Street Light', 'Water Leak'][Math.floor(Math.random() * 4)]} complaint from Sector ${Math.floor(Math.random() * 20) + 1}`,
          type: 'info',
          timestamp: new Date(),
          read: false
        };

        setNotifications(prev => [newNotification, ...prev]);
        setShowNotificationAlert(true);
        
        // Auto-hide alert after 3 seconds
        setTimeout(() => setShowNotificationAlert(false), 3000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-accent" />;
      case 'success':
        return <Check className="w-5 h-5 text-secondary" />;
      default:
        return <Bell className="w-5 h-5 text-primary" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-l-accent glow-amber';
      case 'success':
        return 'border-l-secondary glow-orange';
      default:
        return 'border-l-primary glow-effect';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-8">
      {/* Real-time notification alert */}
      {showNotificationAlert && (
        <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm border border-[hsl(32_100%_50%)] p-4 rounded-xl shadow-lg animate-slide-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[hsl(30_95%_90%)] flex items-center justify-center">
              <Bell className="w-4 h-4 text-[hsl(32_100%_50%)]" />
            </div>
            <div>
              <div className="font-semibold text-neutral-900">New Notification</div>
              <div className="text-sm text-neutral-600">A new complaint has been received</div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-neutral-900 mb-4">
          Notifications
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Stay updated with real-time civic alerts and system notifications
        </p>
        {unreadCount > 0 && (
          <div className="mt-6">
            <Button
              onClick={markAllAsRead}
              className="bg-gradient-to-r from-[hsl(32_100%_50%)] to-[hsl(25_95%_55%)] text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <Check className="w-4 h-4 mr-2" />
              Mark All as Read ({unreadCount})
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-16 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 flex items-center justify-center">
              <Bell className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">No Notifications</h3>
            <p className="text-neutral-600">You're all caught up! New notifications will appear here.</p>
          </div>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`bg-white/70 backdrop-blur-sm border-l-4 p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                !notification.read ? 'bg-opacity-100' : 'bg-opacity-50'
              } ${
                notification.type === 'warning' ? 'border-l-orange-500' :
                notification.type === 'success' ? 'border-l-green-500' :
                'border-l-[hsl(32_100%_50%)]'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      notification.type === 'warning' ? 'bg-orange-50' :
                      notification.type === 'success' ? 'bg-green-50' :
                      'bg-[hsl(30_95%_90%)]'
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`text-lg font-semibold ${notification.read ? 'text-neutral-500' : 'text-neutral-900'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[hsl(32_100%_50%)] rounded-full animate-pulse"></div>
                      )}
                    </div>
                    
                    <p className={`text-sm mb-3 ${notification.read ? 'text-neutral-500' : 'text-neutral-700'}`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimestamp(notification.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  {!notification.read && (
                    <Button
                      onClick={() => markAsRead(notification.id)}
                      size="sm"
                      variant="outline"
                      className="border-[hsl(32_100%_50%)] text-[hsl(32_100%_50%)] hover:bg-[hsl(32_100%_50%)] hover:text-white transition-all duration-300"
                    >
                      <Check className="w-3 h-3" />
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => deleteNotification(notification.id)}
                    size="sm"
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsView;