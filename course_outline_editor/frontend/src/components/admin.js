import React, { useState } from "react";
// WTF is this?
const AssignInstructor = () => {
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const instructors = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Jim Smith" }
  ];

  const courses = [
    { id: 1, name: "React 101" },
    { id: 2, name: "JavaScript 102" },
    { id: 3, name: "Node.js 103" }
  ];

  const handleInstructorChange = event => {
    setSelectedInstructor(event.target.value);
  };

  const handleCourseChange = event => {
    setSelectedCourse(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Add your submit logic here
    console.log(`Instructor: ${selectedInstructor} assigned to Course: ${selectedCourse}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="instructors">Select Instructor:</label>
        <select id="instructors" onChange={handleInstructorChange}>
          <option value="">--Select Instructor--</option>
          {instructors.map(instructor => (
            <option key={instructor.id} value={instructor.name}>
              {instructor.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="courses">Select Course:</label>
        <select id="courses" onChange={handleCourseChange}>
          <option value="">--Select Course--</option>
          {courses.map(course => (
            <option key={course.id} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
      <button type="button">Back</button>
    </form>
  );
};

export default AssignInstructor;
