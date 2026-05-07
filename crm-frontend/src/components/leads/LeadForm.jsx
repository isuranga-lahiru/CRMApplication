import { useState } from 'react';
import { LEAD_SOURCE_OPTIONS, LEAD_STATUS_OPTIONS } from '../../utils/constants';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

const defaultForm = {
  leadName: '',
  companyName: '',
  email: '',
  phoneNumber: '',
  assignedSalesperson: '',
  leadSource: 'Website',
  status: 'New',
  estimatedDealValue: '',
};

export const LeadForm = ({ initialData, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState(initialData || defaultForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'estimatedDealValue' ? Number(value) || '' : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    const normalizedPhone = String(formData.phoneNumber || '').replace(/[\s()-]/g, '');
    const dealValue = Number(formData.estimatedDealValue);

    if (!formData.leadName?.trim()) next.leadName = 'Required';
    if (!formData.companyName?.trim()) next.companyName = 'Required';
    if (!formData.email?.trim()) next.email = 'Required';
    if (!normalizedPhone) {
      next.phoneNumber = 'Required';
    } else if (!/^\+?\d{7,15}$/.test(normalizedPhone)) {
      next.phoneNumber = 'Enter a valid phone number';
    }
    if (!formData.assignedSalesperson?.trim()) next.assignedSalesperson = 'Required';
    if (!formData.estimatedDealValue && formData.estimatedDealValue !== 0) {
      next.estimatedDealValue = 'Required';
    } else if (Number.isNaN(dealValue) || dealValue < 1) {
      next.estimatedDealValue = 'Must be at least 1';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...formData,
      phoneNumber: String(formData.phoneNumber || '').replace(/[\s()-]/g, ''),
      estimatedDealValue: Number(formData.estimatedDealValue),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Lead Name"
          name="leadName"
          value={formData.leadName}
          onChange={handleChange}
          error={errors.leadName}
          placeholder="John Doe"
          required
        />
        <Input
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          error={errors.companyName}
          placeholder="Acme Inc."
          required
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="john@acme.com"
          required
        />
        <Input
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          placeholder="+94771234567"
          required
        />
        <Input
          label="Assigned Salesperson"
          name="assignedSalesperson"
          value={formData.assignedSalesperson}
          onChange={handleChange}
          error={errors.assignedSalesperson}
          placeholder="Jane Smith"
          required
        />
        <Input
          label="Estimated Deal Value"
          type="number"
          name="estimatedDealValue"
          value={formData.estimatedDealValue}
          onChange={handleChange}
          error={errors.estimatedDealValue}
          placeholder="15000"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Select label="Lead Source" name="leadSource" value={formData.leadSource} onChange={handleChange}>
          {LEAD_SOURCE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Select label="Status" name="status" value={formData.status} onChange={handleChange}>
          {LEAD_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex justify-end border-t border-slate-200 pt-4">
        <Button type="submit" loading={loading}>
          Save Lead
        </Button>
      </div>
    </form>
  );
};
