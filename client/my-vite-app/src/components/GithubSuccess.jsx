import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GithubSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/create'); // or your desired route
    } else {
      navigate('/login'); // fallback
    }
  }, [location, navigate]);

  return <div>Logging you in with GitHub...</div>;
};

export default GithubSuccess;
