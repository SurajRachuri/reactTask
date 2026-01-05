import { useState, useEffect } from "react";
// import "./RegistrationForm.css";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // ---------- VALIDATION ----------
  const validate = (data) => {
    const newErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    } else if (data.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(data.password)) {
      newErrors.password =
        "Password must be 8+ chars, 1 uppercase & 1 number";
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // ---------- REAL-TIME VALIDATION ----------
  useEffect(() => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0);
  }, [formData]);

  // ---------- HANDLE CHANGE ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ---------- HANDLE SUBMIT ----------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="LoginForm">
      <h2>Registration Form</h2>

      {submitted && (
        <p className="success">🎉 Registration successful!</p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="error">{errors.password}</p>
          )}
        </div>

        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit" disabled={!isValid}>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
