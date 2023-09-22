import { FaQuestion } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AboutIconLink() {
  const location = useLocation();

  // Only show the AboutIconLink component on the home page
  if (location.pathname !== '/') {
    return null;
  }

  return (
    <div className='about-link'>
      <Link to='/about'>
        <FaQuestion size={20} />
      </Link>
    </div>
  );
}

export default AboutIconLink;
