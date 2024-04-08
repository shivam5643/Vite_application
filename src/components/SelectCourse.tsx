import React from 'react';
import { useNavigate } from 'react-router-dom';

 // Import useHistory directly from 'react-router-dom'


import { Button, Typography, Box } from '@mui/material';

const IDs=["CS101","ML201", "CS102"];
const SelectCourses: React.FC = () => {
  const history = useNavigate();

  const handleCourseClick = (courseId: string) => {
    console.log(`Course ${courseId} selected`);
    history(`/courses/${courseId}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="50vh"
      width="30%"
      margin="auto"
      backgroundColor="#fff" // White background color for form container
      boxShadow="0 0 10px rgba(0, 0, 0, 0.1)" // Box shadow for form container
      borderRadius="10px" // Rounded corners for form container
      padding="20px" // Padding for form container
      marginTop="15vh"
      
    >
      <Typography variant="h3" gutterBottom>
        Select One Course
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        gap="20px"
        padding="20px"
        marginTop="20px"
        color="green"
      >
        <Box
          display="flex"
          gap="8vh"
          justifyContent="space-between"
        >
          <Typography variant="h5">Advanced Data Structures</Typography>
          <Button variant="contained" color="primary" onClick={() => handleCourseClick('CS101')}>
            Select
          </Button>
        </Box>

        <Box
          display="flex"
          gap="8vh"
          justifyContent="space-between"
        >
          <Typography variant="h5">Machine Learning Fundamentals</Typography>
          <Button variant="contained" color="primary" onClick={() => handleCourseClick('ML201')}>
            Select
          </Button>
        </Box>

        <Box
          display="flex"
          gap="8vh"
          justifyContent="space-between"
        >
          <Typography variant="h5">Machine Learning</Typography>
          <Button variant="contained" color="primary" onClick={() => handleCourseClick('CS102')}>
            Select
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectCourses;
