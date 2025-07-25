import React, { useState } from 'react';
import Navbar from './Navbar';
import SignupForm from './SignupForm';

function App() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <Navbar onSignupClick={toggleForm} />
      {showForm && <SignupForm onClose={closeForm} />}
    </div>
  );
}

export default App;
