export interface Complaint {
  id: string;
  title: string;
  type: string;
  location: string;
  date: string;
  status: 'solved' | 'unsolved';
  image: string;
  description: string;
}

export const complaints: Complaint[] = [
  {
    id: '1',
    title: 'Large Pothole on Main Street',
    type: 'Pothole',
    location: 'Main Street, Sector 12',
    date: '2024-01-08',
    status: 'unsolved',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    description: 'Dangerous pothole causing vehicle damage'
  },
  {
    id: '2',
    title: 'Overflowing Garbage Bin',
    type: 'Garbage',
    location: 'Park Avenue, Sector 8',
    date: '2024-01-07',
    status: 'solved',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&h=300&fit=crop',
    description: 'Garbage bin overflowing attracting pests'
  },
  {
    id: '3',
    title: 'Broken Street Light',
    type: 'Street Light',
    location: 'Oak Road, Sector 15',
    date: '2024-01-06',
    status: 'unsolved',
    image: 'https://images.unsplash.com/photo-1586021280874-f5aaef6e3af4?w=400&h=300&fit=crop',
    description: 'Street light not working, creating safety hazard'
  },
  {
    id: '4',
    title: 'Water Leak on Elm Street',
    type: 'Water Leak',
    location: 'Elm Street, Sector 5',
    date: '2024-01-05',
    status: 'solved',
    image: 'https://images.unsplash.com/photo-1553980493-a21b1ea99296?w=400&h=300&fit=crop',
    description: 'Underground water pipe leaking'
  },
  {
    id: '5',
    title: 'Damaged Road Surface',
    type: 'Road Damage',
    location: 'Highway 101, Sector 20',
    date: '2024-01-04',
    status: 'unsolved',
    image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop',
    description: 'Road surface cracked and damaged'
  },
  {
    id: '6',
    title: 'Illegal Dumping Site',
    type: 'Illegal Dumping',
    location: 'Forest Lane, Sector 18',
    date: '2024-01-03',
    status: 'unsolved',
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400&h=300&fit=crop',
    description: 'Construction waste dumped illegally'
  }
];

export const getComplaintStats = () => {
  const total = complaints.length;
  const solved = complaints.filter(c => c.status === 'solved').length;
  const unsolved = complaints.filter(c => c.status === 'unsolved').length;
  
  return { total, solved, unsolved };
};

export const getComplaintsByType = () => {
  const types = complaints.reduce((acc, complaint) => {
    acc[complaint.type] = (acc[complaint.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(types).map(([name, value]) => ({ name, value }));
};

export const getDailyComplaints = () => {
  // Generate mock data for the last 30 days
  const data = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Random number of complaints per day (1-8)
    const complaints = Math.floor(Math.random() * 8) + 1;
    
    data.push({
      date: dateStr,
      complaints
    });
  }
  
  return data;
};