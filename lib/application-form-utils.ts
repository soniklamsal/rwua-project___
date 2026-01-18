export const handleSubmit = async (applicationData: {
  fullName: string;
  email: string;
  message: string;
  cv: File;
  vacancy: {
    id: string;
    position: string;
    department: string;
  };
}) => {
  try {
    // Create FormData for file upload (exactly like contact form but with file)
    const formData = new FormData();
    formData.append('fullName', applicationData.fullName);
    formData.append('email', applicationData.email);
    formData.append('message', applicationData.message);
    formData.append('vacancyId', applicationData.vacancy.id);
    formData.append('vacancyPosition', applicationData.vacancy.position);
    formData.append('vacancyDepartment', applicationData.vacancy.department);
    formData.append('cv', applicationData.cv);

    const response = await fetch('/api/apply', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    
    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to submit job application');
    }
    
    return result;
  } catch (error) {
    console.error('Error submitting job application:', error);
    throw error;
  }
};