/**
 * 网站配置
 * 
 * 用户可以在此处修改 GitHub 仓库配置
 * 部署到 Vercel 时，也可以通过环境变量覆盖这些值
 */

import type { GitHubConfig } from './markdown';

/**
 * GitHub 仓库配置
 * 
 * 修改以下配置以连接到您的 GitHub 仓库：
 * - owner: GitHub 用户名或组织名
 * - repo: 仓库名称
 * - branch: 分支名称（默认 main）
 * - path: Markdown 文件所在目录（默认 stories）
 */
export const githubConfig: GitHubConfig = {
  // 从环境变量读取，或使用默认值
  owner: import.meta.env.VITE_GITHUB_OWNER || 'your-github-username',
  repo: import.meta.env.VITE_GITHUB_REPO || 'fensun-success-stories',
  branch: import.meta.env.VITE_GITHUB_BRANCH || 'main',
  path: import.meta.env.VITE_GITHUB_PATH || 'stories',
};

/**
 * 网站基本信息
 */
export const siteConfig = {
  name: '奋隼建筑',
  title: '成功经验分享平台',
  description: '河南奋隼建筑工程有限公司成功经验分享平台，专注建筑施工与市政工程，以质量与责任筑就每一项工程。',
  companyUrl: 'https://direct.fensun.anycast.nyc.mn/',
};

/**
 * 文章分类
 */
export const categories = [
  { id: 'all', name: '全部', icon: 'Layers' },
  { id: 'project', name: '项目经验', icon: 'Building2' },
  { id: 'technology', name: '技术分享', icon: 'Wrench' },
  { id: 'management', name: '管理心得', icon: 'Users' },
  { id: 'safety', name: '安全生产', icon: 'Shield' },
  { id: 'quality', name: '质量控制', icon: 'CheckCircle' },
];
