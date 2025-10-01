"use client";

import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";
import { getSession } from "next-auth/react";
import { DiscussionResponse } from "@/lib/types/discussion/discussionResponse";
import ReportComment from "./ReportCommmentComponent";

export default function CommentComponent({ problemId, username }: { problemId: number; username?: string }) {
  const [comments, setComments] = useState<DiscussionResponse[]>([]);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);
  const clientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<string | null | undefined>(null);

  useEffect(() => {
    if (!problemId) return;

    (async () => {
      const session = await getSession();
      const token = session?.accessToken;

      const socket = new SockJS(
        `${process.env.NEXT_PUBLIC_BASE_URL_CODE_COMPASS}/ws-comments`
      );
      clientRef.current = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: (str) => console.log("STOMP DEBUG:", str),
        connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
        onConnect: (frame) => {
          console.log("Connected to WS:", frame);

          if (subscriptionRef.current) {
            clientRef.current?.unsubscribe(subscriptionRef.current);
          }

          subscriptionRef.current = clientRef.current?.subscribe(
            `/topic/comments.${problemId}`,
            (msg: IMessage) => {
              console.log("Raw message received:", msg.body);
              try {
                const body = JSON.parse(msg.body);
                const mapComment = (comment: DiscussionResponse) => {
                  if (!comment.id) {
                    console.error("Comment missing id:", comment);
                    throw new Error("Comment ID is missing from backend response");
                  }
                  return {
                    id: comment.id,
                    problemId: comment.problemId ?? problemId,
                    comment: comment.comment ?? "No content",
                    username: comment.username ?? "Anon",
                    commentAt: comment.commentAt ?? new Date().toISOString(),
                  };
                };

                if (Array.isArray(body)) {
                  setComments(body.map(mapComment));
                } else {
                  setComments((prev) => {
                    const newComment = mapComment(body);
                    if (
                      prev.some(
                        (c) =>
                          c.comment === newComment.comment &&
                          c.commentAt === newComment.commentAt
                      )
                    ) {
                      return prev;
                    }
                    return [...prev, newComment];
                  });
                }
              } catch (err) {
                console.error("Parse error:", err);
              }
            }
          ).id;

          clientRef.current?.publish({
            destination: `/app/init.${problemId}`,
            body: JSON.stringify({}),
          });
        },
        onStompError: (frame) => console.error("STOMP error:", frame),
        onWebSocketError: (err) => console.error("WS error:", err),
        onWebSocketClose: (evt) => console.error("WS closed:", evt),
      });

      clientRef.current.activate();
    })();

    return () => {
      if (subscriptionRef.current) {
        clientRef.current?.unsubscribe(subscriptionRef.current);
        subscriptionRef.current = null;
      }
      clientRef.current?.deactivate();
    };
  }, [problemId]);

  return (
    <div className="p-4 border rounded">
      <ul className="space-y-2">
        {comments.map((c) => (
          <li key={c.id} className="border-b pb-1 flex justify-between items-center">
            <div>
              <strong>{c.username ?? "Anon"}:</strong> {c.comment}
            </div>
            <button
              onClick={() => {
                if (c.id !== undefined) {
                  setSelectedCommentId(c.id);
                }
              }}
              className="text-red-500 hover:text-red-600 text-sm"
              disabled={c.id === undefined}
            >
              Report
            </button>
          </li>
        ))}
      </ul>
      {selectedCommentId && (
        <ReportComment
          commentId={selectedCommentId}
          problemId={problemId}
          onClose={() => setSelectedCommentId(null)}
          username={username}
        />
      )}
    </div>
  );
}