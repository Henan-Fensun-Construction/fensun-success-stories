/**
 * 文章详情页面
 * 
 * 奋隼建筑官网风格:
 * - 简洁专业的白色背景
 * - 清晰的排版层次
 * - Markdown 内容渲染
 */

import Layout from "@/components/Layout";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag, Clock, Share2, AlertCircle } from "lucide-react";
import { useStory } from "@/hooks/useStories";
import { Button } from "@/components/ui/button";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

// 估算阅读时间
function estimateReadingTime(content: string): number {
  const wordsPerMinute = 300; // 中文阅读速度
  const words = content.length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

// 分类名称映射
const categoryNames: Record<string, string> = {
  project: "项目经验",
  technology: "技术分享",
  management: "管理心得",
  safety: "安全管理",
  quality: "质量控制",
};

export default function StoryDetail() {
  const params = useParams<{ slug: string }>();
  const { story, loading, error } = useStory(params.slug || "");

  // 分享功能
  const handleShare = async () => {
    const url = window.location.href;
    const title = story?.title || "奋隼建筑 - 经验分享";

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        // 用户取消分享
      }
    } else {
      // 复制链接
      await navigator.clipboard.writeText(url);
      toast.success("链接已复制到剪贴板");
    }
  };

  // 加载状态
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">加载中...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // 错误状态
  if (error || !story) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            <h1 className="text-2xl font-semibold mb-4 text-foreground">文章未找到</h1>
            <p className="text-muted-foreground mb-8">
              抱歉，您访问的文章不存在或已被删除。
            </p>
            <Link href="/stories">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回文章列表
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const readingTime = estimateReadingTime(story.content);

  return (
    <Layout>
      {/* 文章头部 */}
      <section className="relative">
        {/* 封面图 */}
        <div className="relative h-[400px]">
          <img
            src={story.coverImage || "/images/blueprint-pattern.jpg"}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        {/* 文章信息 */}
        <div className="container relative -mt-48 z-10 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            {/* 返回链接 */}
            <Link href="/stories">
              <Button
                variant="ghost"
                size="sm"
                className="mb-6 text-white/80 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回文章列表
              </Button>
            </Link>

            {/* 分类标签 */}
            {story.category && (
              <span className="inline-block px-4 py-1 bg-primary text-white text-sm font-medium mb-4">
                {categoryNames[story.category] || story.category}
              </span>
            )}

            {/* 标题 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 text-white leading-tight">
              {story.title}
            </h1>

            {/* 元信息 */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time>{story.date}</time>
              </div>
              {story.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{story.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>约 {readingTime} 分钟阅读</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 文章内容 */}
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-background border border-border p-8 sm:p-12 rounded-lg"
            >
              {/* 标签 */}
              {story.tags && story.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-8 pb-8 border-b border-border">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-secondary text-sm text-muted-foreground rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Markdown 内容 */}
              <div className="prose-fensun">
                <Streamdown>{story.content}</Streamdown>
              </div>
            </motion.article>

            {/* 文章底部 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 pt-8 border-t border-border"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-muted-foreground mb-2">
                    感谢阅读本文，如有问题或建议，欢迎联系我们。
                  </p>
                  <a
                    href="/#contact"
                    className="text-primary hover:underline"
                  >
                    联系我们了解更多 →
                  </a>
                </div>
                <Button
                  variant="outline"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  分享文章
                </Button>
              </div>
            </motion.div>

            {/* 返回按钮 */}
            <div className="mt-8 text-center">
              <Link href="/stories">
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回文章列表
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
