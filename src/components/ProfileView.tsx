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
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-neutral-900 mb-4">
          Admin Profile
        </h1>
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Manage your account settings and personal information
        </p>
        <div className="mt-6">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-[hsl(32_100%_50%)] to-[hsl(25_95%_55%)] text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleSave}
                className="bg-green-600 text-white hover:bg-green-700 transition-all duration-300 hover:-translate-y-1"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-all duration-300 hover:-translate-y-1"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Picture and Basic Info */}
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-[hsl(32_100%_50%)] to-[hsl(25_95%_55%)] rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">
              {isEditing ? editedProfile.name : profile.name}
            </h2>
            <p className="text-neutral-600 mt-2">{profile.role}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-[hsl(30_95%_90%)] flex items-center justify-center">
                <Shield className="w-4 h-4 text-[hsl(32_100%_50%)]" />
              </div>
              <span className="text-neutral-700 font-medium">{profile.department}</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-[hsl(30_95%_90%)] flex items-center justify-center">
                <User className="w-4 h-4 text-[hsl(32_100%_50%)]" />
              </div>
              <span className="text-neutral-700 font-medium">Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-2xl font-bold text-neutral-900 mb-6">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-neutral-900 font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-[hsl(32_100%_50%)]" />
                Full Name
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="border-neutral-300 focus:ring-[hsl(32_100%_50%)] focus:border-[hsl(32_100%_50%)]"
                />
              ) : (
                <div className="p-4 bg-neutral-50 rounded-xl text-neutral-700 font-medium">{profile.name}</div>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="text-neutral-900 font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4 text-[hsl(32_100%_50%)]" />
                Email Address
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                  className="border-neutral-300 focus:ring-[hsl(32_100%_50%)] focus:border-[hsl(32_100%_50%)]"
                />
              ) : (
                <div className="p-4 bg-neutral-50 rounded-xl text-neutral-700 font-medium">{profile.email}</div>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="phone" className="text-neutral-900 font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4 text-[hsl(32_100%_50%)]" />
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                  className="border-neutral-300 focus:ring-[hsl(32_100%_50%)] focus:border-[hsl(32_100%_50%)]"
                />
              ) : (
                <div className="p-4 bg-neutral-50 rounded-xl text-neutral-700 font-medium">{profile.phone}</div>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="department" className="text-neutral-900 font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4 text-[hsl(32_100%_50%)]" />
                Department
              </Label>
              {isEditing ? (
                <Input
                  id="department"
                  value={editedProfile.department}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, department: e.target.value }))}
                  className="border-neutral-300 focus:ring-[hsl(32_100%_50%)] focus:border-[hsl(32_100%_50%)]"
                />
              ) : (
                <div className="p-4 bg-neutral-50 rounded-xl text-neutral-700 font-medium">{profile.department}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg">
        <h3 className="text-2xl font-bold text-neutral-900 mb-6">Security Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors duration-200">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-50 flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">Change Password</h4>
              <p className="text-sm text-neutral-600 mb-4">Update your account password</p>
              <Button
                variant="outline"
                className="w-full border-[hsl(32_100%_50%)] text-[hsl(32_100%_50%)] hover:bg-[hsl(32_100%_50%)] hover:text-white transition-all duration-300"
              >
                Change Password
              </Button>
            </div>
          </div>
          
          <div className="p-6 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors duration-200">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-50 flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">Two-Factor Authentication</h4>
              <p className="text-sm text-neutral-600 mb-4">Add an extra layer of security</p>
              <Button
                variant="outline"
                className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
              >
                Enable 2FA
              </Button>
            </div>
          </div>
          
          <div className="p-6 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors duration-200">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-50 flex items-center justify-center">
                <User className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">Session Management</h4>
              <p className="text-sm text-neutral-600 mb-4">Manage active sessions</p>
              <Button
                variant="outline"
                className="w-full border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300"
              >
                View Sessions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;