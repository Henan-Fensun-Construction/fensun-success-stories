/**
 * 文章数据加载 Hook
 * 
 * 优先从 GitHub 仓库加载文章
 * 如果失败则使用示例数据
 */

import { useState, useEffect, useMemo } from 'react';
import { fetchStoriesFromGitHub, fetchStoryFromGitHub, type Story } from '@/lib/markdown';
import { githubConfig } from '@/lib/config';
import { sampleStories } from '@/lib/sampleStories';

interface UseStoriesResult {
  stories: Story[];
  loading: boolean;
  error: string | null;
  isUsingGitHub: boolean;
}

interface UseStoryResult {
  story: Story | null;
  loading: boolean;
  error: string | null;
}

/**
 * 检查 GitHub 配置是否有效
 */
function isGitHubConfigured(): boolean {
  return (
    githubConfig.owner !== 'your-github-username' &&
    githubConfig.owner !== '' &&
    githubConfig.repo !== ''
  );
}

/**
 * 加载所有文章
 */
export function useStories(): UseStoriesResult {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingGitHub, setIsUsingGitHub] = useState(false);

  useEffect(() => {
    async function loadStories() {
      setLoading(true);
      setError(null);

      // 检查是否配置了 GitHub
      if (isGitHubConfigured()) {
        try {
          const githubStories = await fetchStoriesFromGitHub(githubConfig);
          if (githubStories.length > 0) {
            setStories(githubStories);
            setIsUsingGitHub(true);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn('Failed to load from GitHub, using sample data:', err);
        }
      }

      // 使用示例数据
      setStories(sampleStories);
      setIsUsingGitHub(false);
      setLoading(false);
    }

    loadStories();
  }, []);

  return { stories, loading, error, isUsingGitHub };
}

/**
 * 加载单篇文章
 */
export function useStory(slug: string): UseStoryResult {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStory() {
      setLoading(true);
      setError(null);

      // 检查是否配置了 GitHub
      if (isGitHubConfigured()) {
        try {
          const githubStory = await fetchStoryFromGitHub(githubConfig, slug);
          if (githubStory) {
            setStory(githubStory);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn('Failed to load from GitHub, using sample data:', err);
        }
      }

      // 从示例数据中查找
      const sampleStory = sampleStories.find(s => s.slug === slug);
      if (sampleStory) {
        setStory(sampleStory);
      } else {
        setError('文章未找到');
      }
      setLoading(false);
    }

    loadStory();
  }, [slug]);

  return { story, loading, error };
}

/**
 * 按分类筛选文章
 */
export function useFilteredStories(category: string = 'all') {
  const { stories, loading, error, isUsingGitHub } = useStories();

  const filteredStories = useMemo(() => {
    if (category === 'all') {
      return stories;
    }
    return stories.filter(story => story.category === category);
  }, [stories, category]);

  const categories = useMemo(() => {
    const cats = new Set(stories.map(s => s.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, [stories]);

  return {
    stories: filteredStories,
    allStories: stories,
    categories,
    loading,
    error,
    isUsingGitHub,
  };
}
