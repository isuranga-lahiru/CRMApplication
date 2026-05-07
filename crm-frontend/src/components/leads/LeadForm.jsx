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
    if (!formData.leadName?.trim()) next.leadName = 'Required';
    if (!formData.companyName?.trim()) next.companyName = 'Required';
    if (!formData.email?.trim()) next.email = 'Required';
    if (!formData.phoneNumber?.trim()) next.phoneNumber = 'Required';
    if (!formData.assignedSalesperson?.trim()) next.assignedSalesperson = 'Required';
    if (!formData.estimatedDealValue && formData.estimatedDealValue !== 0) next.estimatedDealValue = 'Required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input label="Lead Name" name="leadName" value={formData.leadName} onChange={handleChange} error={errors.leadName} required />
        <Input
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          error={errors.companyName}
          required
        />
        <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} required />
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
