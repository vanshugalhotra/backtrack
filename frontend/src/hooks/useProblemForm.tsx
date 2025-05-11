import { useState } from 'react';
import { useGlobalUI } from '../../context/GlobalUIContext';

export const useProblemForm = () => {
  const { setLoading, setError } = useGlobalUI();
  const [uploadedExeFile, setUploadedExeFile] = useState<string | null>(null);
  const [uploadedIconFile, setUploadedIconFile] = useState<string | null>(null);

  const uploadFile = async (file: File, fileType: 'exe' | 'icon') => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`/api/v1/file-upload/${fileType}`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'File upload failed');
      }

      if (fileType === 'exe') {
        setUploadedExeFile(data?.fileName);
      } else {
        setUploadedIconFile(data?.fileName);
      }

      return data;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
      throw err;
    }
  };

  const submitProblemForm = async (formData: {
    name: string;
    difficulty: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const problemData = {
        ...formData
      };

      const res = await fetch('/api/v1/problems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(problemData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Failed to submit problem');
      }

      return data;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, submitProblemForm, uploadedExeFile, uploadedIconFile };
};
