import React, { useState } from "react";
import { Button } from "./components/ui/button"; 
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Select } from "./components/ui/select";

export default function StudyPlanner() {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    name: "",
    type: "assignment",
    deadline: "",
    weight: "",
    courseCredits: "",
    courseName: ""
  });

  const addAssignment = () => {
    if (newAssignment.name.trim() && newAssignment.deadline.trim()) {
      setAssignments([...assignments, { ...newAssignment, completed: false }]);
      setNewAssignment({
        name: "",
        type: "assignment",
        deadline: "",
        weight: "",
        courseCredits: "",
        courseName: ""
      });
    }
  };

  const toggleCompletion = (index) => {
    const updatedAssignments = assignments.map((assignment, i) =>
      i === index ? { ...assignment, completed: !assignment.completed } : assignment
    );
    setAssignments(updatedAssignments);
  };

  // Group assignments by date for calendar view
  const groupedAssignments = assignments.reduce((groups, assignment) => {
    const date = new Date(assignment.deadline).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(assignment);
    return groups;
  }, {});

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Academic Calendar Planner</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Add New Task</h2>
            <Label className="text-gray-700">Course Name</Label>
            <Input
              value={newAssignment.courseName}
              onChange={(e) => setNewAssignment({...newAssignment, courseName: e.target.value})}
              placeholder="Enter course name"
              className="mb-4 hover:border-blue-400 focus:ring-2 focus:ring-blue-300"
            />
            <Label className="text-gray-700">Type</Label>
            <Select
              options={[
                { value: "assignment", label: "Assignment" },
                { value: "test", label: "Test" }
              ]}
              value={newAssignment.type}
              onChange={(e) => setNewAssignment({...newAssignment, type: e.target.value})}
              className="mb-4"
            />
            <Label className="text-gray-700">Name</Label>
            <Input
              value={newAssignment.name}
              onChange={(e) => setNewAssignment({...newAssignment, name: e.target.value})}
              placeholder="Enter assignment/test name"
              className="mb-4 hover:border-blue-400 focus:ring-2 focus:ring-blue-300"
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-700">Weight (%)</Label>
                <Input
                  type="number"
                  value={newAssignment.weight}
                  onChange={(e) => setNewAssignment({...newAssignment, weight: e.target.value})}
                  placeholder="Enter weightage"
                  className="mb-4 hover:border-blue-400 focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <Label className="text-gray-700">Course Credits</Label>
                <Input
                  type="number"
                  value={newAssignment.courseCredits}
                  onChange={(e) => setNewAssignment({...newAssignment, courseCredits: e.target.value})}
                  placeholder="Enter credits"
                  className="mb-4 hover:border-blue-400 focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>
            <Label className="text-gray-700">Deadline/Test Date</Label>
            <Input
              type="datetime-local"
              value={newAssignment.deadline}
              onChange={(e) => setNewAssignment({...newAssignment, deadline: e.target.value})}
              className="mb-4 hover:border-blue-400 focus:ring-2 focus:ring-blue-300"
            />
            <Button 
              onClick={addAssignment} 
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Add to Calendar
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">Calendar View</h2>
          {Object.entries(groupedAssignments).sort().map(([date, dateAssignments]) => (
            <Card key={date} className="shadow-lg">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-3 text-blue-600">{date}</h3>
                <div className="space-y-3">
                  {dateAssignments.map((assignment, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className={`text-lg font-medium ${assignment.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {assignment.courseName} - {assignment.type}: {assignment.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Due: {new Date(assignment.deadline).toLocaleTimeString()}
                          </p>
                          <p className="text-sm text-gray-600">
                            Weight: {assignment.weight}% | Credits: {assignment.courseCredits}
                          </p>
                        </div>
                        <Button 
                          onClick={() => toggleCompletion(index)}
                          className={`ml-4 ${assignment.completed ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'}`}
                        >
                          {assignment.completed ? "Undo" : "Complete"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          {assignments.length === 0 && (
            <Card className="shadow-lg bg-gray-50">
              <CardContent className="p-6 text-center text-gray-500">
                No assignments added yet. Add your first task to see it in the calendar!
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
