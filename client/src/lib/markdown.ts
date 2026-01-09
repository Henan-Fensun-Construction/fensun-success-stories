/**
 * Markdown 文档加载和解析工具
 * 
 * 支持从 GitHub 仓库自动加载 Markdown 文档
 * 解析 frontmatter 元数据
 */

export interface StoryMeta {
  slug: string;
  title: string;
  date: string;
  author?: string;
  category?: string;
  tags?: string[];
  excerpt?: string;
  coverImage?: string;
}

export interface Story extends StoryMeta {
  content: string;
}

/**
 * 解析 Markdown frontmatter
 */
function parseFrontmatter(content: string): { meta: Record<string, any>; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { meta: {}, body: content };
  }
  
  const frontmatter = match[1];
  const body = match[2];
  
  const meta: Record<string, any> = {};
  const lines = frontmatter.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    
    // 处理数组格式 [item1, item2]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1);
      meta[key] = value.split(',').map(item => item.trim().replace(/['"]/g, ''));
    }
    // 处理引号包裹的字符串
    else if ((value.startsWith('"') && value.endsWith('"')) || 
             (value.startsWith("'") && value.endsWith("'"))) {
      meta[key] = value.slice(1, -1);
    }
    else {
      meta[key] = value;
    }
  }
  
  return { meta, body };
}

/**
 * 从内容生成摘要
 */
function generateExcerpt(content: string, maxLength: number = 150): string {
  // 移除 Markdown 语法
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // 标题
    .replace(/\*\*([^*]+)\*\*/g, '$1') // 粗体
    .replace(/\*([^*]+)\*/g, '$1') // 斜体
    .replace(/`([^`]+)`/g, '$1') // 行内代码
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 链接
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // 图片
    .replace(/>\s+/g, '') // 引用
    .replace(/[-*+]\s+/g, '') // 列表
    .replace(/\n+/g, ' ') // 换行
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.slice(0, maxLength).trim() + '...';
}

/**
 * 从文件名生成 slug
 */
function generateSlug(filename: string): string {
  return filename
    .replace(/\.md$/, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '') // 移除日期前缀
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-') // 保留中文字符
    .replace(/^-|-$/g, '');
}

/**
 * 解析单个 Markdown 文件
 */
export function parseMarkdownFile(filename: string, content: string): Story {
  const { meta, body } = parseFrontmatter(content);
  const slug = meta.slug || generateSlug(filename);
  
  return {
    slug,
    title: meta.title || filename.replace(/\.md$/, ''),
    date: meta.date || new Date().toISOString().split('T')[0],
    author: meta.author,
    category: meta.category,
    tags: meta.tags || [],
    excerpt: meta.excerpt || generateExcerpt(body),
    coverImage: meta.coverImage,
    content: body,
  };
}

/**
 * GitHub 仓库配置
 */
export interface GitHubConfig {
  owner: string;
  repo: string;
  branch?: string;
  path?: string;
}

/**
 * 从 GitHub 仓库加载文章列表
 */
export async function fetchStoriesFromGitHub(config: GitHubConfig): Promise<Story[]> {
  const { owner, repo, branch = 'main', path = 'stories' } = config;
  
  try {
    // 获取目录内容
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const files = await response.json();
    
    // 过滤 Markdown 文件
    const mdFiles = files.filter((file: any) => 
      file.type === 'file' && file.name.endsWith('.md')
    );
    
    // 并行获取所有文件内容
    const stories = await Promise.all(
      mdFiles.map(async (file: any) => {
        const contentResponse = await fetch(file.download_url);
        const content = await contentResponse.text();
        return parseMarkdownFile(file.name, content);
      })
    );
    
    // 按日期降序排序
    return stories.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Failed to fetch stories from GitHub:', error);
    return [];
  }
}

/**
 * 从 GitHub 仓库加载单篇文章
 */
export async function fetchStoryFromGitHub(
  config: GitHubConfig, 
  slug: string
): Promise<Story | null> {
  const { owner, repo, branch = 'main', path = 'stories' } = config;
  
  try {
    // 获取目录内容
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const files = await response.json();
    
    // 查找匹配的文件
    const mdFiles = files.filter((file: any) => 
      file.type === 'file' && file.name.endsWith('.md')
    );
    
    for (const file of mdFiles) {
      const contentResponse = await fetch(file.download_url);
      const content = await contentResponse.text();
      const story = parseMarkdownFile(file.name, content);
      
      if (story.slug === slug) {
        return story;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Failed to fetch story from GitHub:', error);
    return null;
  }
}

/**
 * 默认的 GitHub 配置
 * 用户需要在部署时修改这些值
 */
export const defaultGitHubConfig: GitHubConfig = {
  owner: 'your-github-username',
  repo: 'fensun-success-stories',
  branch: 'main',
  path: 'stories',
};
