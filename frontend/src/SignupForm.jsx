import React, { useState } from 'react';
import './SignupForm.css';
import API_BASE_URL from './config'; // make sure this file exists

const SignupForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    title: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fname.trim()) newErrors.fname = "First name is required";
    if (!formData.lname.trim()) newErrors.lname = "Last name is required";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.email.trim() && !formData.email.includes("@")) newErrors.email = "Invalid email, email should have @";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (formData.password.length > 10) newErrors.password = "Password can contain maximum 10 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.values(validationErrors).length>0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await fetch(`${API_BASE_URL}/author`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        alert('Signup failed: ' + (result.message || 'Unknown error'));
      } else {
        alert('Signup successful!');
        console.log('Server response:', result);
        onClose(); 
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please try again later.');
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <button type="button" className="close-button" onClick={onClose}>×</button>
          <h2>Sign Up</h2>

          <div className="form-group">
            <label>Title</label>
            <select name="title" value={formData.title} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
            </select>
            {errors.title && <p className="error">{errors.title}</p>}
          </div>

          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="fname" value={formData.fname} onChange={handleChange} />
            {errors.fname && <p className="error">{errors.fname}</p>}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lname" value={formData.lname} onChange={handleChange} />
            {errors.lname && <p className="error">{errors.lname}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
