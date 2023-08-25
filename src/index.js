import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Updated import statements
import './index.css';

import reportWebVitals from './reportWebVitals';

import App from './App';
import NotFound from './pages/NotFound';
import Videos from './pages/Videos';
import VideoDetail from './pages/VideoDetail';
import DetailPage from './component/DetailPage';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'videos', element: <Videos /> },
      { path: 'videos/:keyword', element: <Videos /> },
      { path: 'videos/watch/:videoId', element: <VideoDetail /> },
      { path: '*', element: <Navigate to="/404" /> }, // Handle any other unmatched routes
    ],
  },
  { path: '/movie/:movieId', element: <DetailPage /> },
  { path: '404', element: <NotFound /> }, // Define a route for 404 errors
];

const Root = () => (
  <React.StrictMode>
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Routes>
    </Router>
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

reportWebVitals(console.log);
