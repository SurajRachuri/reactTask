import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

const formSchema = {
  steps: [
    {
      title: "Personal Info",
      fields: [
        {
          name: "firstName",
          type: "text",
          label: "First Name",
          validation: { required: true, minLength: 2 }
        },
        {
          name: "lastName",
          type: "text",
          label: "Last Name",
          validation: { required: true, minLength: 2 }
        },
        {
          name: "country",
          type: "select",
          label: "Country",
          validation: { required: true },
          options: [
            { value: "", label: "Select Country" },
            { value: "us", label: "United States" },
            { value: "uk", label: "United Kingdom" },
            { value: "ca", label: "Canada" }
          ]
        },
        {
          name: "state",
          type: "select",
          label: "State",
          dependsOn: { field: "country", value: "us" },
          validation: { required: true },
          options: [
            { value: "", label: "Select State" },
            { value: "ca", label: "California" },
            { value: "ny", label: "New York" },
            { value: "tx", label: "Texas" }
          ]
        }
      ]
    },
    {
      title: "Preferences",
      fields: [
        {
          name: "newsletter",
          type: "checkbox",
          label: "Subscribe to newsletter"
        },
        {
          name: "notifications",
          type: "select",
          label: "Notification Preference",
          dependsOn: { field: "newsletter", value: true },
          options: [
            { value: "email", label: "Email" },
            { value: "sms", label: "SMS" },
            { value: "both", label: "Both" }
          ]
        },
        {
          name: "comments",
          type: "textarea",
          label: "Additional Comments"
        }
      ]
    }
  ]
};

function FormBuilder({ schema, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const { themeStyles } = useTheme();

  const currentStepData = schema.steps[currentStep];

  const validateField = (field, value) => {
    const validation = field.validation || {};
    
    if (validation.required && (!value || value === "")) {
      return `${field.label} is required`;
    }
    
    if (validation.minLength && value && value.length < validation.minLength) {
      return `${field.label} must be at least ${validation.minLength} characters`;
    }
    
    return null;
  };

  const validateStep = () => {
    const stepErrors = {};
    let isValid = true;

    currentStepData.fields.forEach(field => {
      if (field.dependsOn) {
        const dependentValue = formData[field.dependsOn.field];
        if (dependentValue !== field.dependsOn.value) {
          return;
        }
      }

      const error = validateField(field, formData[field.name]);
      if (error) {
        stepErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(stepErrors);
    return isValid;
  };

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: null }));
    }
  };

  const renderField = (field) => {
    if (field.dependsOn) {
      const dependentValue = formData[field.dependsOn.field];
      if (dependentValue !== field.dependsOn.value) {
        return null;
      }
    }

    const fieldStyle = {
      marginBottom: '2rem'
    };

    const labelStyle = {
      display: 'block',
      marginBottom: '0.75rem',
      fontWeight: '600',
      color: themeStyles.text,
      fontSize: '15px'
    };

    const inputStyle = {
      width: '100%',
      padding: '1rem',
      border: `2px solid ${errors[field.name] ? '#ef4444' : themeStyles.border}`,
      borderRadius: '8px',
      backgroundColor: themeStyles.inputBackground,
      color: themeStyles.text,
      fontSize: '16px',
      transition: 'border-color 0.3s, box-shadow 0.3s',
      outline: 'none',
      boxShadow: errors[field.name] ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none'
    };

    const errorStyle = {
      color: '#ef4444',
      fontSize: '12px',
      marginTop: '0.25rem'
    };

    switch (field.type) {
      case 'text':
        return (
          <div key={field.name} style={fieldStyle}>
            <label style={labelStyle}>{field.label}</label>
            <input
              type="text"
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              style={inputStyle}
            />
            {errors[field.name] && <div style={errorStyle}>{errors[field.name]}</div>}
          </div>
        );

      case 'select':
        return (
          <div key={field.name} style={fieldStyle}>
            <label style={labelStyle}>{field.label}</label>
            <select
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              style={inputStyle}
            >
              {field.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors[field.name] && <div style={errorStyle}>{errors[field.name]}</div>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} style={fieldStyle}>
            <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData[field.name] || false}
                onChange={(e) => handleInputChange(field.name, e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              {field.label}
            </label>
            {errors[field.name] && <div style={errorStyle}>{errors[field.name]}</div>}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} style={fieldStyle}>
            <label style={labelStyle}>{field.label}</label>
            <textarea
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
            />
            {errors[field.name] && <div style={errorStyle}>{errors[field.name]}</div>}
          </div>
        );

      default:
        return null;
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

  const isLastStep = currentStep === schema.steps.length - 1;

  return (
    <div style={{
      backgroundColor: themeStyles.cardBackground,
      padding: '3rem',
      borderRadius: '16px',
      border: `1px solid ${themeStyles.border}`,
      maxWidth: '700px',
      margin: '0 auto',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
    }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 1rem 0', color: themeStyles.text, fontSize: '2rem', fontWeight: '600' }}>
          {currentStepData.title}
        </h2>
        <div style={{ fontSize: '16px', opacity: 0.7, marginBottom: '1.5rem' }}>
          Step {currentStep + 1} of {schema.steps.length}
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: themeStyles.border,
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${((currentStep + 1) / schema.steps.length) * 100}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${themeStyles.primary}, ${themeStyles.secondary})`,
            borderRadius: '4px',
            transition: 'width 0.5s ease'
          }} />
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {currentStepData.fields.map(renderField)}

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '3rem',
          gap: '1rem'
        }}>
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            style={{
              padding: '1rem 2rem',
              backgroundColor: currentStep === 0 ? themeStyles.border : themeStyles.secondary,
              color: currentStep === 0 ? themeStyles.text : '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'all 0.3s',
              transform: currentStep === 0 ? 'none' : 'translateY(0)',
              boxShadow: currentStep === 0 ? 'none' : '0 4px 12px rgba(0,0,0,0.15)'
            }}
            onMouseEnter={(e) => {
              if (currentStep !== 0) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentStep !== 0) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }
            }}
          >
            Previous
          </button>

          {isLastStep ? (
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                padding: '1rem 2rem',
                background: `linear-gradient(135deg, ${themeStyles.primary}, ${themeStyles.secondary})`,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
            >
              Submit Form
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              style={{
                padding: '1rem 2rem',
                background: `linear-gradient(135deg, ${themeStyles.primary}, ${themeStyles.secondary})`,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
            >
              Next Step →
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export function Level3_5() {
  const { themeStyles } = useTheme();
  const [submittedData, setSubmittedData] = useState(null);

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: themeStyles.background,
    color: themeStyles.text,
    padding: '2rem',
    transition: 'all 0.3s'
  };

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
    console.log('Form submitted:', data);
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <Link to="/level3.4" style={{ color: themeStyles.primary, textDecoration: 'none' }}>← Back to Level 3.4</Link>
          <h1 style={{ margin: '0.5rem 0' }}>Dynamic Form Builder</h1>
        </div>
        <ThemeToggle />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <p style={{ opacity: 0.8, maxWidth: '800px' }}>
          Features: Multi-step forms, conditional fields, validation rules, form state management, 
          and dynamic field rendering based on JSON schema.
        </p>
      </div>

      {submittedData ? (
        <div style={{
          backgroundColor: themeStyles.cardBackground,
          padding: '3rem',
          borderRadius: '16px',
          border: `1px solid ${themeStyles.border}`,
          maxWidth: '700px',
          margin: '0 auto',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: themeStyles.text, marginBottom: '2rem', fontSize: '2rem', fontWeight: '600' }}>🎉 Form Submitted Successfully!</h2>
          <pre style={{
            backgroundColor: themeStyles.background,
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '14px'
          }}>
            {JSON.stringify(submittedData, null, 2)}
          </pre>
          <button
            onClick={() => setSubmittedData(null)}
            style={{
              marginTop: '2rem',
              padding: '1rem 2rem',
              background: `linear-gradient(135deg, ${themeStyles.primary}, ${themeStyles.secondary})`,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.3s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
          >
            Reset Form
          </button>
        </div>
      ) : (
        <FormBuilder schema={formSchema} onSubmit={handleFormSubmit} />
      )}

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link 
          to="/mini-project" 
          style={{
            padding: '1rem 2rem',
            background: `linear-gradient(135deg, ${themeStyles.primary}, ${themeStyles.secondary})`,
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            display: 'inline-block',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.3s'
          }}
        >
          Mini Project - Kanban Board →
        </Link>
      </div>
    </div>
  );
}