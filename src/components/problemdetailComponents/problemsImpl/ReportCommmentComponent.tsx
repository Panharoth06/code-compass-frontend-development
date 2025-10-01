"use client";

import React, { useState} from 'react';
import { useCreateReportMutation } from '@/lib/services/comment/reportApi';
import { ReportRequest } from '@/lib/types/discussion/discussionResponse';

// Define error type for type-safe error handling
interface ApiError {
  message?: string;
  status?: number;
  error?: string;
}

interface ReportCommentProps {
  commentId: number;
  problemId: number;
  username?:string;
  onClose: () => void;
}

export default function ReportComment({ commentId, problemId, onClose,username }: ReportCommentProps) {
  const [reason, setReason] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [createReport, { isLoading, error }] = useCreateReportMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason.trim()) {
      setValidationError('Please provide a reason for the report');
      return;
    }

    if (!username) {
      setValidationError('Please log in to report a comment');
      return;
    }

    const reportData: ReportRequest = {
      reason,
      commentId,
      problemId,
      username,
    };

    try {
      await createReport(reportData).unwrap();
      setReason('');
      setValidationError(null);
      onClose();
    } catch (err) {
      console.error('Failed to submit report:', err);
    }
  };

  // Handle API and validation errors
  const getErrorMessage = () => {
    if (validationError) {
      return validationError;
    }
    if (!error) return null;
    if ('status' in error) {
      if (error.status === 404) {
        return 'Report endpoint not found. Please check the API configuration.';
      }
      if ('data' in error) {
        const errorData = error.data as ApiError;
        return errorData.message || `Error ${error.status}: Failed to submit report`;
      }
    }
    return 'An unexpected error occurred while submitting the report';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-gray-100">Report Comment</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for reporting..."
            className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            rows={4}
            disabled={isLoading}
          />
          {(error || validationError) && (
            <p className="text-red-500 dark:text-red-400 text-sm">
              {getErrorMessage()}
              {commentId}
            </p>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !reason.trim()}
              className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}