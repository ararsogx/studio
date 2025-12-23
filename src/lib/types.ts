export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Standard' | 'Premium' | 'Admin';
};

export type LearningMaterial = {
  id: string;
  title: string;
  category: string;
  type: 'PDF' | 'PPT' | 'DOCX' | 'Video';
  dateAdded: string;
  progress?: number;
};

export type Notice = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export type PaymentRequest = {
  id: string;
  userName: string;
  userEmail: string;
  requestDate: string;
  status: 'Pending';
  avatar: string;
};
