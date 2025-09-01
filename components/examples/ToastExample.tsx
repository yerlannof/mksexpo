'use client';

import React from 'react';
import { useToast } from '@/hooks/useToast';

const ToastExample: React.FC = () => {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Example of using toast in a form submission
    try {
      // Simulate API call
      await toast.promise(
        fetch('/api/submit').then(res => {
          if (!res.ok) throw new Error('Failed to submit');
          return res.json();
        }),
        {
          loading: 'Submitting form...',
          success: 'Form submitted successfully!',
          error: (err) => `Error: ${err.message}`,
        }
      );
    } catch (error) {
      // Error is already handled by toast.promise
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields */}
      <button
        type="button"
        onClick={() => toast.success('Saved!', 'Your changes have been saved.')}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
};

export default ToastExample;