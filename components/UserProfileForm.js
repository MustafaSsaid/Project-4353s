import React, { useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import DatePicker from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import userService from '../services/userService';
import RequiredLabel from '../components/RequiredLabel';

const UserProfileForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    skills: [],
    preferences: '',
    availability: [],
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const states = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    // Add all states...
  ];

  const skillsOptions = [
    { value: 'communication', label: 'Communication' },
    { value: 'teamwork', label: 'Teamwork' },
    { value: 'problemSolving', label: 'Problem Solving' },
    // Add all skills...
  ];

  const validate = () => {
    const errors = {};
    if (!formData.fullName || formData.fullName.length > 50) {
      errors.fullName = 'Full Name is required and should be less than 50 characters';
    }
    if (!formData.address1 || formData.address1.length > 100) {
      errors.address1 = 'Address 1 is required and should be less than 100 characters';
    }
    if (!formData.city || formData.city.length > 100) {
      errors.city = 'City is required and should be less than 100 characters';
    }
    if (!formData.state) {
      errors.state = 'State selection is required';
    }
    if (!formData.zipCode || formData.zipCode.length < 5 || formData.zipCode.length > 9) {
      errors.zipCode = 'Zip code should be between 5 and 9 characters';
    }
    if (formData.skills.length === 0) {
      errors.skills = 'At least one skill is required';
    }
    if (formData.availability.length === 0) {
      errors.availability = 'At least one date for availability is required';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillsChange = (selected) => {
    setFormData({
      ...formData,
      skills: selected,
    });
  };

  const handleAvailabilityChange = (dates) => {
    setFormData({
      ...formData,
      availability: dates,
    });
  };

  const handleZipCodeChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData({
        ...formData,
        zipCode: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await userService.addUser(formData);
        setMessage('Profile saved successfully');
      } catch (error) {
        setMessage('Error saving profile');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <RequiredLabel label="Full Name" />
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          maxLength="50"
          required
        />
        {errors.fullName && <span>{errors.fullName}</span>}
      </div>

      <div>
        <RequiredLabel label="Address 1" />
        <input
          type="text"
          name="address1"
          value={formData.address1}
          onChange={handleChange}
          maxLength="100"
          required
        />
        {errors.address1 && <span>{errors.address1}</span>}
      </div>

      <div>
        <label>Address 2:</label>
        <input
          type="text"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
          maxLength="100"
        />
      </div>

      <div>
        <RequiredLabel label="City" />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          maxLength="100"
          required
        />
        {errors.city && <span>{errors.city}</span>}
      </div>

      <div>
        <RequiredLabel label="State" />
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>
        {errors.state && <span>{errors.state}</span>}
      </div>

      <div>
        <RequiredLabel label="Zip Code" />
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleZipCodeChange}
          maxLength="9"
          minLength="5"
          required
        />
        {errors.zipCode && <span>{errors.zipCode}</span>}
      </div>

      <div>
        <RequiredLabel label="Skills" />
        <MultiSelect
          options={skillsOptions}
          value={formData.skills}
          onChange={handleSkillsChange}
          labelledBy="Select Skills"
          required
        />
        {errors.skills && <span>{errors.skills}</span>}
      </div>

      <div>
        <label>Preferences:</label>
        <textarea
          name="preferences"
          value={formData.preferences}
          onChange={handleChange}
        />
      </div>

      <div>
        <RequiredLabel label="Availability" />
        <DatePicker
          multiple
          value={formData.availability}
          onChange={handleAvailabilityChange}
          format="MM/DD/YYYY"
          plugins={[<DatePanel />]}
          required
        />
        {errors.availability && <span>{errors.availability}</span>}
      </div>

      <button type="submit">Save Profile</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UserProfileForm;
