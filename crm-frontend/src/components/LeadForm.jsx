import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { LEAD_STATUS_OPTIONS, LEAD_SOURCE_OPTIONS } from '../utils/constants';

export const LeadForm = ({ initialData, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState(
    initialData || {
      leadName: '',
      companyName: '',
      email: '',
      phoneNumber: '',
      assignedSalesperson: '',
      leadSource: 'Website',
      status: 'New',
      estimatedDealValue: '',
    }
  );

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.leadName.trim()) newErrors.leadName = 'Lead name is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.assignedSalesperson.trim())
      newErrors.assignedSalesperson = 'Salesperson is required';
    if (!formData.estimatedDealValue) newErrors.estimatedDealValue = 'Deal value is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'estimatedDealValue' ? parseFloat(value) || '' : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Lead Name"
          name="leadName"
          value={formData.leadName}
          onChange={handleChange}
          error={errors.leadName}
          required
        />
        <Input
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          error={errors.companyName}
          required
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        <Input
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          required
        />
        <Input
          label="Assigned Salesperson"
          name="assignedSalesperson"
          value={formData.assignedSalesperson}
          onChange={handleChange}
          error={errors.assignedSalesperson}
          required
        />
        <Input
          label="Estimated Deal Value"
          type="number"
          name="estimatedDealValue"
          value={formData.estimatedDealValue}
          onChange={handleChange}
          error={errors.estimatedDealValue}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Lead Source
          </label>
          <select
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
            className="app-select"
          >
            {LEAD_SOURCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="app-select"
          >
            {LEAD_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Lead'}
        </Button>
      </div>
    </form>
  );
};
