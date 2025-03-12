import toast from 'react-hot-toast';

const AxiosToastError = (error) => {
  if (error.response) {
    // Backend error response
    toast.error(error.response.data.message || 'An error occurred');
  } else {
    // Network or other unexpected error
    toast.error('An unexpected error occurred');
  }
};

export default AxiosToastError;
