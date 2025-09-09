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
    <div className="space-y-6 animate-fade-in">
      {/* Real-time notification alert */}
      {showNotificationAlert && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-card border border-primary p-4 rounded-lg glow-effect animate-slide-in">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-primary" />
            <div>
              <div className="font-semibold text-card-foreground">New Notification</div>
              <div className="text-sm text-muted-foreground">A new complaint has been received</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-2">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All notifications read'}
          </p>
        </div>
        
        {unreadCount > 0 && (
          <Button
            onClick={markAllAsRead}
            className="bg-gradient-button text-white glow-effect hover:scale-105 transition-transform"
          >
            <Check className="w-4 h-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12 bg-gradient-card rounded-xl border border-border">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">No Notifications</h3>
            <p className="text-muted-foreground">You're all caught up! New notifications will appear here.</p>
          </div>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={notification.id}
              className={`bg-gradient-card border-l-4 ${getNotificationColor(notification.type)} p-6 rounded-lg border border-border card-hover ${
                !notification.read ? 'bg-opacity-100' : 'bg-opacity-50'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-semibold ${notification.read ? 'text-muted-foreground' : 'text-card-foreground'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      )}
                    </div>
                    
                    <p className={`text-sm mb-3 ${notification.read ? 'text-muted-foreground' : 'text-card-foreground'}`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Check className="w-3 h-3" />
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => deleteNotification(notification.id)}
                    size="sm"
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
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