// components/ArticleComments.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from '@/redux/services/commentApi';

interface ArticleCommentsProps {
  articleId: string;
}

export default function ArticleComments({ articleId }: ArticleCommentsProps) {
    console.log(articleId)
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  // API hooks
  const { data: comments = [], isLoading, isError } = useGetCommentsQuery(articleId);
  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  // Handle comment submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session?.user) return;

    try {
      await createComment({
        articleId,
        content: newComment,
      }).unwrap();
      setNewComment('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  // Start editing a comment
  const startEdit = (comment: { id: string; content: string }) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  // Save edited comment
  const saveEdit = async (commentId: string) => {
    try {
      await updateComment({
        commentId,
        content: editContent,
      }).unwrap();
      setEditingCommentId(null);
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingCommentId(null);
  };

  // Delete a comment
  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId).unwrap();
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  if (isLoading) return <div className="p-4 text-center">Loading comments...</div>;
  if (isError) return <div className="p-4 text-center text-red-500">Failed to load comments</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h3 className="text-xl font-semibold mb-4">Article Feedback</h3>
      
      {/* Comment form */}
      {session ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-3">
            <img
              src={session.user.image || '/default-avatar.png'}
              alt={session.user.name || 'User'}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this article..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                required
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Post Comment
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-6 p-3 bg-gray-100 rounded text-center">
          Please sign in to leave feedback
        </div>
      )}

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-3 border-b">
              <img
                src={comment.userAvatar || '/default-avatar.png'}
                alt={comment.userName}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.userName}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                {editingCommentId === comment.id ? (
                  <div className="mt-2">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-2 border rounded"
                      rows={3}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => saveEdit(comment.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="mt-1 text-gray-800">{comment.content}</p>
                    {session?.user?.id === comment.userId && (
                      <div className="flex gap-3 mt-2 text-sm">
                        <button
                          onClick={() => startEdit(comment)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}