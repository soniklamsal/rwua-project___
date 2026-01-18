export const handleSubmit = async (formData: {
  fullName: string;
  email: string;
  message: string;
}) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    
    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to submit contact form');
    }
    
    return result;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};