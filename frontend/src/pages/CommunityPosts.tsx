const posts = [
  { id: 1, author: 'Anna L.', content: 'Does anyone have a recommendation for a good local plumber?', replies: 2 },
  { id: 2, author: 'Erik S.', content: 'Reminder: Neighborhood cleanup this Saturday at 10 AM. See you there!', replies: 0 },
  { id: 3, author: 'Maria P.', content: 'Found a set of keys near the playground. Let me know if they are yours!', replies: 1 },
];

export function CommunityPosts() {
  return (
    <div>
        <div className="page-header">
          <h2>Community Posts</h2>
          <p>A place for general announcements and questions.</p>
        </div>
        <div className="post-feed">
            {posts.map(post => (
                <div className="card post-card" key={post.id}>
                    <p>{post.content}</p>
                    <div className="post-footer">
                        <span>By: <strong>{post.author}</strong></span>
                        <span>{post.replies} replies</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}