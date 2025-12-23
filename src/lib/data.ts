import type { LearningMaterial, Notice, PaymentRequest, User } from './types';

export const users: User[] = [
  { id: '1', name: 'Sofia Davis', email: 'sofia.davis@example.com', avatar: 'user-avatar-1', role: 'Premium' },
  { id: '2', name: 'Admin User', email: 'admin@learniverse.com', avatar: 'user-avatar-2', role: 'Admin' },
  { id: '3', name: 'John Doe', email: 'john.doe@example.com', avatar: 'user-avatar-3', role: 'Standard' },
];

export const learningMaterials: LearningMaterial[] = [
  { id: 'mod1', title: 'Introduction to Quantum Computing', category: 'Physics', type: 'PDF', dateAdded: '2024-05-10', progress: 65 },
  { id: 'mod2', title: 'Advanced AI Architectures', category: 'Computer Science', type: 'PPT', dateAdded: '2024-05-12', progress: 30 },
  { id: 'mod3', title: 'The Renaissance Period', category: 'History', type: 'DOCX', dateAdded: '2024-05-14' },
  { id: 'note1', title: 'Key Concepts in Calculus', category: 'Mathematics', type: 'PDF', dateAdded: '2024-05-15' },
  { id: 'exam1', title: 'Mid-Term Exam: Organic Chemistry', category: 'Chemistry', type: 'PDF', dateAdded: '2024-05-16' },
  { id: 'note2', title: 'Summary of "Brave New World"', category: 'Literature', type: 'DOCX', dateAdded: '2024-05-18' },
];

export const modules: LearningMaterial[] = learningMaterials.filter(m => m.id.startsWith('mod'));
export const notes: LearningMaterial[] = learningMaterials.filter(m => m.id.startsWith('note'));
export const exams: LearningMaterial[] = learningMaterials.filter(m => m.id.startsWith('exam'));

export const notices: Notice[] = [
  { id: '1', title: 'Scheduled Maintenance Alert', content: 'The platform will be down for scheduled maintenance on May 25th from 2:00 AM to 4:00 AM UTC.', date: '2024-05-20' },
  { id: '2', title: 'New Premium Feature: Offline Downloads', content: 'Premium users can now download materials for offline access directly within the app.', date: '2024-05-18' },
];

export const paymentRequests: PaymentRequest[] = [
  { id: 'pay1', userName: 'Alex Johnson', userEmail: 'alex.j@example.com', requestDate: '2024-05-21', status: 'Pending', avatar: 'user-avatar-4' },
  { id: 'pay2', userName: 'Maria Garcia', userEmail: 'maria.g@example.com', requestDate: '2024-05-20', status: 'Pending', avatar: 'user-avatar-5' },
];

export const dailyMotivation = {
  quote: "The only way to do great work is to love what you do.",
  author: "Steve Jobs",
};
