import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography, Chip, Stack, Box } from '@mui/material';



interface CourseData {
  instructorName: string;
  courseName: string;
  tags: string[];
  students: string[];
}

const RouteEditCourse = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tagInput, setTagInput] = useState('');
  const [studentInput, setStudentInput] = useState('');

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/course.json`);
        const jsonData = await response.json();
        const selectedCourse = jsonData.courses.find((course: any) => course.courseId === courseId);
        if (selectedCourse) {
          setCourseData({
            instructorName: selectedCourse.instructorName,
            courseName: selectedCourse.courseName,
            tags: selectedCourse.tags,
            students: selectedCourse.students.map((student: any) => student.name)
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Edited form data:', courseData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'tags' || name === 'students') return; // We'll handle tags and students separately
    setCourseData((prevData) => ({
      ...prevData!,
      [name]: value
    }));
  };

  // Tag Handlers
  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && tagInput) {
      event.preventDefault();
      if (courseData && !courseData.tags.includes(tagInput.trim())) {
        setCourseData({
          ...courseData,
          tags: [...courseData.tags, tagInput.trim()]
        });
      }
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setCourseData((prevData) => ({
      ...prevData!,
      tags: prevData!.tags.filter(tag => tag !== tagToDelete)
    }));
  };

  // Student Handlers
  const handleStudentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudentInput(event.target.value);
  };

  const handleAddStudent = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && studentInput) {
      event.preventDefault();
      if (courseData && !courseData.students.includes(studentInput.trim())) {
        setCourseData({
          ...courseData,
          students: [...courseData.students, studentInput.trim()]
        });
      }
      setStudentInput('');
    }
  };

  const handleDeleteStudent = (studentToDelete: string) => {
    setCourseData((prevData) => ({
      ...prevData!,
      students: prevData!.students.filter(student => student !== studentToDelete)
    }));
  };

  if (loading || !courseData) return <Typography>Loading course data...</Typography>;

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="60vh"
        width="50%"
        margin="auto"
        backgroundColor="#fff" // White background color for form container
        boxShadow="0 0 10px rgba(0, 0, 0, 0.1)" // Box shadow for form container
        borderRadius="10px" // Rounded corners for form container
        padding="20px" // Padding for form container
        marginTop="6vh"
      >
        <Typography variant="h4" gutterBottom>Edit Course</Typography>
        <form onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            label="Instructor Name"
            name="instructorName"
            value={courseData?.instructorName}
            onChange={handleInputChange}
            margin="normal"
            style={{ backgroundColor: '#fff' }} // White background color for text fields
          />
          <TextField
            fullWidth
            label="Course Name"
            name="courseName"
            value={courseData?.courseName}
            onChange={handleInputChange}
            margin="normal"
            style={{ backgroundColor: '#fff' }} // White background color for text fields
          />

          {/* Tags */}
          <Box mb={2}>
            <Typography variant="body1">Tags:</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" my={1}>
              {courseData.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  variant="outlined"
                />
              ))}
            </Stack>
            <TextField
              fullWidth
              label="Add a tag"
              value={tagInput}
              onChange={handleTagChange}
              onKeyDown={handleAddTag}
              variant="outlined"
              style={{ backgroundColor: '#fff' }} // White background color for text field
            />
          </Box>

          {/* Students */}
          <Box mb={2}>
            <Typography variant="body1">Students:</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" my={1}>
              {courseData.students.map((student, index) => (
                <Chip
                  key={index}
                  label={student}
                  onDelete={() => handleDeleteStudent(student)}
                  variant="outlined"
                />
              ))}
            </Stack>
            <TextField
              fullWidth
              label="Add a student"
              value={studentInput}
              onChange={handleStudentChange}
              onKeyDown={handleAddStudent}
              variant="outlined"
              style={{ backgroundColor: '#fff' }} // White background color for text field
            />


          </Box>
            <Button variant="contained" style={{ backgroundColor: '#f17b05', color: '#fff' }}  type="submit">
            Update Course
          </Button>
          
        </form>
      </Box>
    </div>
  );
};

export default RouteEditCourse;
