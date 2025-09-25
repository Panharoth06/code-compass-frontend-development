"use client";

import { useCreateCommentMutation } from '@/lib/services/comment/commentApi';
import { CommentRequest } from '@/lib/types/discussion/discussionResponse';
import React, { useState } from 'react';

// Define error type for type-safe error handling
interface ApiError {
  message?: string;
  status?: number;
  error?: string;
}

export default function CreateComment({ username, problemId }: { problemId?: number; username?: string }) {
  const [comment, setComment] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [createComment, { isLoading, error }] = useCreateCommentMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      setValidationError('Comment cannot be empty');
      return;
    }

    if (!username) {
      setValidationError('Please log in to post a comment');
      return;
    }

    if (!problemId) {
      setValidationError('No problem selected');
      return;
    }

    const commentData: CommentRequest = {
      comment,
      username,
      problemId,
    };

    try {
      await createComment(commentData).unwrap();
      setComment(''); // Clear input after successful submission
      setValidationError(null); // Clear any previous errors
    } catch (err) {
      console.error('Failed to create comment:', err);
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
        return 'Comment endpoint not found. Please check the API configuration.';
      }
      if ('data' in error) {
        const errorData = error.data as ApiError;
        return errorData.message || `Error ${error.status}: Failed to submit comment`;
      }
    }
    return 'An unexpected error occurred while submitting the comment';
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          disabled={isLoading}
        />
        {(error || validationError) && (
          <p className="text-red-500 text-sm">
            {getErrorMessage()}
          </p>
        )}
        <button
          type="submit"
          disabled={isLoading || !comment.trim()}
          className="self-end px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
}