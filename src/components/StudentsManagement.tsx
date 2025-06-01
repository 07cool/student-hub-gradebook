
import React, { useState } from 'react';

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

interface StudentsManagementProps {
  students: Student[];
  results: Result[];
}

const StudentsManagement: React.FC<StudentsManagementProps> = ({ students, results }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStudentResults = (studentId: string) => {
    return results.filter(r => r.studentId === studentId);
  };

  const getGrade = (score: number): string => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  const viewStudentResults = (student: Student) => {
    const studentResults = getStudentResults(student.id);
    
    if (studentResults.length === 0) {
      alert(`No results found for ${student.name}`);
      return;
    }
    
    let resultText = `Results for ${student.name} (${student.id}):\n\n`;
    studentResults.forEach(result => {
      const grade = getGrade(result.score);
      resultText += `${result.subject}: ${result.score}% (${grade})\n`;
    });
    
    alert(resultText);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Student List</h2>
        <p className="text-gray-600">Manage and view student information</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search students by name, roll number, or email..."
        />
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => {
          const studentResults = getStudentResults(student.id);
          const avgScore = studentResults.length > 0 
            ? Math.round(studentResults.reduce((sum, r) => sum + r.score, 0) / studentResults.length)
            : 0;

          return (
            <div key={student.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                <span className="text-sm text-gray-500">{student.class}</span>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Roll Number:</span> {student.id}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {student.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Results:</span> {studentResults.length} subjects
                </p>
                {studentResults.length > 0 && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Average:</span> {avgScore}%
                  </p>
                )}
              </div>

              <button
                onClick={() => viewStudentResults(student)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Results
              </button>
            </div>
          );
        })}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <p className="text-gray-500 text-lg">No students found</p>
          <p className="text-gray-400">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default StudentsManagement;
