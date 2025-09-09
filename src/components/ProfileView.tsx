import { useState } from 'react';
import { User, Mail, Phone, Shield, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProfileView = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Admin Johnson',
    email: 'admin@civic.gov',
    phone: '+1 (555) 123-4567',
    role: 'System Administrator',
    department: 'Civic Management',
    joinDate: '2023-06-15'
  });
  
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Admin Profile</h1>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-button text-white glow-effect hover:scale-105 transition-transform"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="bg-secondary text-secondary-foreground glow-green"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Picture and Basic Info */}
        <div className="bg-gradient-card p-6 rounded-xl border border-border card-hover">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-button rounded-full flex items-center justify-center mx-auto mb-4 glow-effect">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-card-foreground">
              {isEditing ? editedProfile.name : profile.name}
            </h2>
            <p className="text-muted-foreground">{profile.role}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">{profile.department}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <User className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="lg:col-span-2 bg-gradient-card p-6 rounded-xl border border-border card-hover">
          <h3 className="text-xl font-semibold text-card-foreground mb-6">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-card-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-input border-border focus:ring-primary"
                />
              ) : (
                <div className="p-3 bg-muted rounded-lg text-muted-foreground">{profile.name}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-card-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-input border-border focus:ring-primary"
                />
              ) : (
                <div className="p-3 bg-muted rounded-lg text-muted-foreground">{profile.email}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-card-foreground flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                  className="bg-input border-border focus:ring-primary"
                />
              ) : (
                <div className="p-3 bg-muted rounded-lg text-muted-foreground">{profile.phone}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-card-foreground flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Department
              </Label>
              {isEditing ? (
                <Input
                  id="department"
                  value={editedProfile.department}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, department: e.target.value }))}
                  className="bg-input border-border focus:ring-primary"
                />
              ) : (
                <div className="p-3 bg-muted rounded-lg text-muted-foreground">{profile.department}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-gradient-card p-6 rounded-xl border border-border">
        <h3 className="text-xl font-semibold text-card-foreground mb-6">Security Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h4 className="font-medium text-card-foreground">Change Password</h4>
              <p className="text-sm text-muted-foreground">Update your account password</p>
            </div>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Change Password
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h4 className="font-medium text-card-foreground">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            >
              Enable 2FA
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h4 className="font-medium text-card-foreground">Session Management</h4>
              <p className="text-sm text-muted-foreground">Manage active sessions</p>
            </div>
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              View Sessions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;