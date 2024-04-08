
// import { BrowserRouter  as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RouteEditCourse from './components/RouteEditCourse';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import SelectCourses from './components/SelectCourse';


function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<SelectCourses/>}/>
         <Route path="/courses/:courseId" element={<RouteEditCourse />} />
      
      </Routes>
    </Router>
  );
}

export default App;

