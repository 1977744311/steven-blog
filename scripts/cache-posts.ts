import { config } from 'dotenv';
config({ path: '.env.local' });

async function cachePosts() {
  const { fetchPublishedPosts, getPostFromNotion } = await import('../src/lib/notion');
  const fs = await import('fs');
  const path = await import('path');

  try {
    console.log('Fetching posts from Notion...');
    const posts = await fetchPublishedPosts();

    const allPosts = [];

    for (const post of posts) {
      const postDetails = await getPostFromNotion(post.id);
      if (postDetails) {
        allPosts.push(postDetails);
      }
    }

    const cachePath = path.join(process.cwd(), 'posts-cache.json');
    fs.writeFileSync(cachePath, JSON.stringify(allPosts, null, 2));

    console.log(`Successfully cached ${allPosts.length} posts.`);
  } catch (error) {
    console.error('Error caching posts:', error);
    process.exit(1);
  }
}

cachePosts();
