
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

interface ResultsManagementProps {
  students: Student[];
  results: Result[];
  onAddResult: (result: Result) => void;
}

const ResultsManagement: React.FC<ResultsManagementProps> = ({
  students,
  results,
  onAddResult
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    subject: '',
    score: ''
  });

  const getGrade = (score: number): string => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const student = students.find(s => s.id === formData.studentId);
    if (!student) {
      alert('Student roll number not found!');
      return;
    }

    const score = parseInt(formData.score);
    if (score < 0 || score > 100) {
      alert('Score must be between 0 and 100!');
      return;
    }

    const newResult: Result = {
      studentId: formData.studentId,
      subject: formData.subject,
      score: score
    };

    onAddResult(newResult);
    alert('Result added successfully!');
    setFormData({ studentId: '', subject: '', score: '' });
    setShowModal(false);
    console.log('New result added:', newResult);
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Student Results</h2>
          <p className="text-gray-600">View and manage all student results</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Add Result
        </button>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {results.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📊</div>
            <p className="text-gray-500 text-lg">No results available</p>
            <p className="text-gray-400">Add some results to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((result, index) => {
                  const student = students.find(s => s.id === result.studentId);
                  const grade = getGrade(result.score);
                  const passed = result.score >= 60;
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student ? student.name : 'Unknown Student'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.studentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`font-semibold ${result.score >= 90 ? 'text-green-600' : result.score >= 70 ? 'text-blue-600' : result.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {result.score}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          grade === 'A' ? 'bg-green-100 text-green-800' :
                          grade === 'B' ? 'bg-blue-100 text-blue-800' :
                          grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                          grade === 'D' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {passed ? 'Passed' : 'Failed'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Result Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add Student Result</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Roll Number
                </label>
                <input
                  type="text"
                  value={formData.studentId}
                  onChange={(e) => setFormData(prev => ({ ...prev, studentId: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter student roll number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter subject name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Score (0-100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.score}
                  onChange={(e) => setFormData(prev => ({ ...prev, score: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter score"
                  required
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsManagement;
