
import React, { useState, useEffect } from 'react';
import LoginPage from '../components/LoginPage';
import AdminDashboard from '../components/AdminDashboard';
import StudentDashboard from '../components/StudentDashboard';

interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  password: string;
}

interface Result {
  studentId: string;
  subject: string;
  score: number;
}

interface User {
  type: 'admin' | 'student';
  id?: string;
  name: string;
  email?: string;
  class?: string;
  username?: string;
}

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [students, setStudents] = useState<Student[]>([
    { id: 'ST001', name: 'Murari Kumar', email: 'murari@email.com', class: '12th', password: 'murari123' },
    { id: 'ST002', name: 'Pradeep Singh', email: 'pradeep@email.com', class: '11th', password: 'pradeep123' },
    { id: 'ST003', name: 'Pushpa Raj', email: 'pushpa@email.com', class: '12th', password: 'pushpa123' },
    { id: 'ST004', name: 'Satyam Kumar', email: 'satyam@email.com', class: '10th', password: 'satyam123' },
    { id: 'ST006', name: 'Manvi Singh', email: 'manvi@email.com', class: '11th', password: 'manvi123' },
    { id: 'ST007', name: 'A Singh', email: 'a@email.com', class: '11th', password: 'a123' },
    { id: 'ST008', name: 'B Singh', email: 'b@email.com', class: '11th', password: 'b123' },
    { id: 'ST009', name: 'C Singh', email: 'c@email.com', class: '11th', password: 'c123' }
  ]);

  const [results, setResults] = useState<Result[]>([
    { studentId: 'ST001', subject: 'Mathematics', score: 95 },
    { studentId: 'ST001', subject: 'Physics', score: 88 },
    { studentId: 'ST002', subject: 'Chemistry', score: 82 },
    { studentId: 'ST002', subject: 'English', score: 90 },
    { studentId: 'ST003', subject: 'History', score: 85 },
    { studentId: 'ST006', subject: 'History', score: 85 },
    { studentId: 'ST007', subject: 'English', score: 90 },
    { studentId: 'ST008', subject: 'History', score: 85 },
    { studentId: 'ST009', subject: 'History', score: 85 }
  ]);

  // Check for saved login on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log('User logged in:', user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    console.log('User logged out');
  };

  const addStudent = (newStudent: Omit<Student, 'id'>) => {
    const id = `ST${String(Math.max(...students.map(s => parseInt(s.id.slice(2)))) + 1).padStart(3, '0')}`;
    const student = { ...newStudent, id };
    setStudents(prev => [...prev, student]);
    console.log('Student added:', student);
    return student;
  };

  const addResult = (newResult: Result) => {
    setResults(prev => [...prev, newResult]);
    console.log('Result added:', newResult);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} students={students} />;
  }

  if (currentUser.type === 'admin') {
    return (
      <AdminDashboard
        currentUser={currentUser}
        students={students}
        results={results}
        onLogout={handleLogout}
        onAddStudent={addStudent}
        onAddResult={addResult}
      />
    );
  }

  return (
    <StudentDashboard
      currentUser={currentUser}
      results={results.filter(r => r.studentId === currentUser.id)}
      onLogout={handleLogout}
    />
  );
};

export default Index;
