import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function FormBuilder({ schema, onSubmit }) {
  const { theme, themeStyles } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const currentStepData = schema.steps[currentStep];
  const isLastStep = currentStep === schema.steps.length - 1;

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: `1px solid ${theme === 'light' ? '#ccc' : '#555'}`,
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: themeStyles.text,
    borderRadius: '4px',
    fontSize: '14px'
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: themeStyles.primary,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    margin: '0.5rem'
  };

  const errorStyle = {
    color: '#e74c3c',
    fontSize: '12px',
    marginTop: '0.25rem'
  };

  const validateField = (field, value) => {
    const { validation } = field;
    if (!validation) return null;

    if (validation.required && (!value || value.toString().trim() === '')) {
      return `${field.label} is required`;
    }

    if (validation.minLength && value && value.length < validation.minLength) {
      return `${field.label} must be at least ${validation.minLength} characters`;
    }

    if (validation.pattern && value && !validation.pattern.test(value)) {
      return `${field.label} format is invalid`;
    }

    return null;
  };

  const validateStep = () => {
    const stepErrors = {};
    let isValid = true;

    currentStepData.fields.forEach(field => {
      if (shouldShowField(field)) {
        const error = validateField(field, formData[field.name]);
        if (error) {
          stepErrors[field.name] = error;
          isValid = false;
        }
      }
    });

    setErrors(stepErrors);
    return isValid;
  };

  const shouldShowField = (field) => {
    if (!field.dependsOn) return true;
    return formData[field.dependsOn.field] === field.dependsOn.value;
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep()) {
      onSubmit(formData);
    }
  };

  const renderField = (field) => {
    if (!shouldShowField(field)) return null;

    const value = formData[field.name] || '';
    const error = errors[field.name];

    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <div key={field.name} style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              {field.label}
            </label>
            <input
              type={field.type}
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              style={{
                ...inputStyle,
                borderColor: error ? '#e74c3c' : (theme === 'light' ? '#ccc' : '#555')
              }}
            />
            {error && <div style={errorStyle}>{error}</div>}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              {field.label}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              rows={4}
              style={{
                ...inputStyle,
                borderColor: error ? '#e74c3c' : (theme === 'light' ? '#ccc' : '#555'),
                resize: 'vertical'
              }}
            />
            {error && <div style={errorStyle}>{error}</div>}
          </div>
        );

      case 'select':
        return (
          <div key={field.name} style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              {field.label}
            </label>
            <select
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              style={{
                ...inputStyle,
                borderColor: error ? '#e74c3c' : (theme === 'light' ? '#ccc' : '#555')
              }}
            >
              {field.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <div style={errorStyle}>{error}</div>}
          </div>
        );

      case 'checkbox':
        if (field.options) {
          // Multiple checkboxes
          return (
            <div key={field.name} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                {field.label}
              </label>
              {field.options.map(option => (
                <div key={option.value} style={{ marginBottom: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={(value || []).includes(option.value)}
                      onChange={(e) => {
                        const currentValues = value || [];
                        const newValues = e.target.checked
                          ? [...currentValues, option.value]
                          : currentValues.filter(v => v !== option.value);
                        handleFieldChange(field.name, newValues);
                      }}
                      style={{ marginRight: '0.5rem' }}
                    />
                    {option.label}
                  </label>
                </div>
              ))}
              {error && <div style={errorStyle}>{error}</div>}
            </div>
          );
        } else {
          // Single checkbox
          return (
            <div key={field.name} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={!!value}
                  onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                  style={{ marginRight: '0.5rem' }}
                />
                {field.label}
              </label>
              {error && <div style={errorStyle}>{error}</div>}
            </div>
          );
        }

      default:
        return null;
    }
  };

  return (
    <div style={{
      backgroundColor: theme === 'light' ? '#fff' : '#2d2d44',
      padding: '2rem',
      borderRadius: '8px',
      border: `1px solid ${theme === 'light' ? '#dee2e6' : '#495057'}`
    }}>
      {/* Progress indicator */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          {schema.steps.map((step, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '0.5rem',
                backgroundColor: index <= currentStep ? themeStyles.primary : (theme === 'light' ? '#f8f9fa' : '#1a1a2e'),
                color: index <= currentStep ? '#fff' : themeStyles.text,
                margin: '0 0.25rem',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              {step.title}
            </div>
          ))}
        </div>
        <div style={{ fontSize: '14px', textAlign: 'center', opacity: 0.7 }}>
          Step {currentStep + 1} of {schema.steps.length}
        </div>
      </div>

      {/* Current step form */}
      <div>
        <h2 style={{ marginBottom: '1.5rem' }}>{currentStepData.title}</h2>
        {currentStepData.fields.map(renderField)}
      </div>

      {/* Navigation buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          style={{
            ...buttonStyle,
            backgroundColor: currentStep === 0 ? '#6c757d' : themeStyles.secondary,
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          Previous
        </button>

        {isLastStep ? (
          <button onClick={handleSubmit} style={buttonStyle}>
            Submit
          </button>
        ) : (
          <button onClick={handleNext} style={buttonStyle}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export { FormBuilder };