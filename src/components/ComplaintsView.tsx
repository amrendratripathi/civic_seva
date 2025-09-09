import { useState } from 'react';
import { complaints as initialComplaints, Complaint } from '@/data/mockData';
import { Search, Filter, Check, X, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ComplaintsView = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || complaint.type === filterType;
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const updateComplaintStatus = (id: string, status: 'solved' | 'unsolved') => {
    setComplaints(prev => 
      prev.map(complaint => 
        complaint.id === id ? { ...complaint, status } : complaint
      )
    );
  };

  const uniqueTypes = [...new Set(complaints.map(c => c.type))];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Complaints Management</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input border-border focus:ring-primary"
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-40 bg-input border-border">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {uniqueTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-40 bg-input border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="solved">Solved</SelectItem>
              <SelectItem value="unsolved">Unsolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComplaints.map((complaint, index) => (
          <div
            key={complaint.id}
            className="complaint-card bg-gradient-card border border-border rounded-xl overflow-hidden card-hover"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={complaint.image}
                alt={complaint.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                complaint.status === 'solved' 
                  ? 'bg-secondary text-secondary-foreground glow-orange' 
                  : 'bg-accent text-accent-foreground glow-amber'
              }`}>
                {complaint.status.toUpperCase()}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                {complaint.title}
              </h3>
              
              <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  <span>{complaint.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{complaint.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{new Date(complaint.date).toLocaleDateString()}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {complaint.description}
              </p>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => updateComplaintStatus(complaint.id, 'solved')}
                  className="flex-1 bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground glow-orange"
                  disabled={complaint.status === 'solved'}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark Solved
                </Button>
                
                <Button
                  onClick={() => updateComplaintStatus(complaint.id, 'unsolved')}
                  variant="outline"
                  className="flex-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  disabled={complaint.status === 'unsolved'}
                >
                  <X className="w-4 h-4 mr-2" />
                  Mark Unsolved
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredComplaints.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground text-lg">
            No complaints found matching your criteria
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsView;