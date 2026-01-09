/**
 * 文章列表页面
 * 
 * 奋隼建筑官网风格:
 * - 简洁专业的白色背景
 * - 分类筛选功能
 * - 搜索功能
 */

import Layout from "@/components/Layout";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Layers, Building2, Wrench, Users, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { useFilteredStories } from "@/hooks/useStories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 分类配置
const categoryConfig: Record<string, { name: string; icon: React.ElementType }> = {
  all: { name: "全部", icon: Layers },
  project: { name: "项目经验", icon: Building2 },
  technology: { name: "技术分享", icon: Wrench },
  management: { name: "管理心得", icon: Users },
  safety: { name: "安全管理", icon: Shield },
  quality: { name: "质量控制", icon: CheckCircle },
};

// 动画变体
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

export default function Stories() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { stories, loading, isUsingGitHub } = useFilteredStories(activeCategory);

  // 搜索过滤
  const filteredStories = stories.filter((story) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      story.title.toLowerCase().includes(query) ||
      story.excerpt?.toLowerCase().includes(query) ||
      story.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <Layout>
      {/* 页面头部 */}
      <section className="py-16 bg-secondary/30 border-b border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              经验分享
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              汇集项目管理、技术创新、安全生产等方面的实践经验，
              为行业同仁提供参考和借鉴。
            </p>
          </motion.div>
        </div>
      </section>

      {/* 筛选和搜索 */}
      <section className="py-6 bg-background border-b border-border sticky top-20 z-40">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* 分类筛选 */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(categoryConfig).map(([key, { name, icon: Icon }]) => (
                <Button
                  key={key}
                  variant={activeCategory === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(key)}
                  className={activeCategory === key ? "bg-primary text-white" : ""}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {name}
                </Button>
              ))}
            </div>

            {/* 搜索框 */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 数据来源提示 */}
      {!isUsingGitHub && (
        <section className="py-3 bg-primary/5 border-b border-primary/10">
          <div className="container">
            <div className="flex items-center gap-3 text-sm">
              <AlertCircle className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">
                当前显示的是示例数据。配置 GitHub 仓库后，将自动加载您的 Markdown 文档。
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 文章列表 */}
      <section className="py-12 min-h-[60vh]">
        <div className="container">
          {loading ? (
            // 加载状态
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border border-border p-6 animate-pulse">
                  <div className="h-48 bg-secondary mb-4" />
                  <div className="h-6 bg-secondary mb-2 w-3/4" />
                  <div className="h-4 bg-secondary w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredStories.length === 0 ? (
            // 空状态
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">未找到相关文章</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? `没有找到包含"${searchQuery}"的文章`
                  : "该分类下暂无文章"}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                查看全部文章
              </Button>
            </div>
          ) : (
            // 文章网格
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredStories.map((story) => (
                <motion.div key={story.slug} variants={fadeInUp}>
                  <Link href={`/stories/${story.slug}`}>
                    <article className="border border-border overflow-hidden card-hover group h-full flex flex-col bg-background">
                      {/* 封面图 */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={story.coverImage || "/images/blueprint-pattern.jpg"}
                          alt={story.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {story.category && categoryConfig[story.category] && (
                          <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-medium">
                            {categoryConfig[story.category].name}
                          </span>
                        )}
                      </div>

                      {/* 内容 */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                          <time>{story.date}</time>
                          {story.author && (
                            <>
                              <span>·</span>
                              <span>{story.author}</span>
                            </>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {story.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                          {story.excerpt}
                        </p>

                        {/* 标签 */}
                        {story.tags && story.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                            {story.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-secondary text-xs text-muted-foreground rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* 文章数量统计 */}
          {!loading && filteredStories.length > 0 && (
            <div className="mt-12 text-center">
              <span className="text-sm text-muted-foreground">
                共 {filteredStories.length} 篇文章
                {activeCategory !== "all" && ` · ${categoryConfig[activeCategory]?.name || activeCategory}`}
              </span>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
