/**
 * 首页组件
 * 
 * 工业建筑主义设计风格:
 * - 震撼的英雄区展示
 * - 斜切卡片布局
 * - 蓝图网格背景
 * - 吊装动画效果
 */

import Layout from "@/components/Layout";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Building2, FileText, Users, Shield, Award, TrendingUp } from "lucide-react";
import { useStories } from "@/hooks/useStories";
import { Button } from "@/components/ui/button";

// 动画变体
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 100,
    },
  },
};

// 统计数据
const stats = [
  { label: "工程经验", value: "500+", icon: Building2 },
  { label: "专业人员", value: "100+", icon: Users },
  { label: "客户满意度", value: "98%", icon: TrendingUp },
  { label: "安全记录", value: "零事故", icon: Shield },
];

// 特色板块
const features = [
  {
    icon: FileText,
    title: "项目经验",
    description: "分享各类建筑工程项目的施工管理经验，包括高层住宅、商业综合体、市政工程等。",
  },
  {
    icon: Award,
    title: "技术分享",
    description: "探讨建筑施工新技术、新工艺、新材料的应用，推动行业技术进步。",
  },
  {
    icon: Shield,
    title: "安全管理",
    description: "总结安全生产管理经验，分享安全事故预防措施和应急处理方案。",
  },
];

export default function Home() {
  const { stories, loading } = useStories();
  const latestStories = stories.slice(0, 3);

  return (
    <Layout>
      {/* 英雄区 */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* 背景图片 */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-construction.jpg"
            alt="Construction site"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="absolute inset-0 blueprint-grid opacity-30" />
        </div>

        {/* 内容 */}
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-3xl"
          >
            {/* 标签 */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-1 bg-primary/20 text-primary font-mono text-sm tracking-wider uppercase border border-primary/30">
                河南奋隼建筑工程有限公司
              </span>
            </motion.div>

            {/* 主标题 */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6"
            >
              成功经验
              <span className="text-primary block mt-2">分享平台</span>
            </motion.h1>

            {/* 副标题 */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              专注建筑施工与市政工程，以质量与责任筑就每一项工程。
              <br />
              在这里，我们分享项目经验、技术心得和管理智慧。
            </motion.p>

            {/* 按钮组 */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Link href="/stories">
                <Button
                  size="lg"
                  className="btn-industrial bg-primary hover:bg-primary/90 text-primary-foreground font-heading tracking-wider"
                >
                  浏览经验分享
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a
                href="https://direct.fensun.anycast.nyc.mn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-industrial font-heading tracking-wider border-primary/50 hover:bg-primary/10"
                >
                  了解公司详情
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* 装饰元素 - 斜切线 */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        <div 
          className="absolute bottom-0 left-0 right-0 h-16 bg-background"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* 统计数据 */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-primary/10 text-primary btn-industrial">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="data-label">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 特色板块 */}
      <section className="py-20 blueprint-grid">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {/* 标题 */}
            <motion.div variants={itemVariants} className="text-center mb-12">
              <span className="data-label text-primary mb-2 block">WHAT WE SHARE</span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold">
                分享内容
              </h2>
            </motion.div>

            {/* 特色卡片 */}
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    className="card-industrial p-8 hover-mechanical"
                  >
                    <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center mb-6 btn-industrial">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 最新文章 */}
      <section className="py-20 bg-card">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {/* 标题 */}
            <motion.div variants={itemVariants} className="flex items-end justify-between mb-12">
              <div>
                <span className="data-label text-primary mb-2 block">LATEST STORIES</span>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold">
                  最新分享
                </h2>
              </div>
              <Link href="/stories">
                <Button variant="ghost" className="font-heading tracking-wider text-primary hover:text-primary/80">
                  查看全部
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            {/* 文章列表 */}
            {loading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="card-industrial p-6 animate-pulse">
                    <div className="h-48 bg-secondary mb-4" />
                    <div className="h-6 bg-secondary mb-2 w-3/4" />
                    <div className="h-4 bg-secondary w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {latestStories.map((story, index) => (
                  <motion.div
                    key={story.slug}
                    variants={itemVariants}
                  >
                    <Link href={`/stories/${story.slug}`}>
                      <article className="card-industrial overflow-hidden hover-mechanical group">
                        {/* 封面图 */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={story.coverImage || "/images/blueprint-pattern.jpg"}
                            alt={story.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                          {story.category && (
                            <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-mono uppercase tracking-wider">
                              {story.category === 'project' && '项目经验'}
                              {story.category === 'technology' && '技术分享'}
                              {story.category === 'safety' && '安全管理'}
                              {story.category === 'quality' && '质量控制'}
                              {story.category === 'management' && '管理心得'}
                            </span>
                          )}
                        </div>

                        {/* 内容 */}
                        <div className="p-6">
                          <time className="data-label block mb-2">{story.date}</time>
                          <h3 className="font-heading text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {story.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {story.excerpt}
                          </p>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-20 relative overflow-hidden">
        {/* 背景 */}
        <div className="absolute inset-0">
          <img
            src="/images/team-work.jpg"
            alt="Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/90" />
          <div className="absolute inset-0 blueprint-grid opacity-20" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.span variants={itemVariants} className="data-label text-primary mb-4 block">
              JOIN US
            </motion.span>
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-heading font-bold mb-6">
              分享您的经验
            </motion.h2>
            <motion.p variants={itemVariants} className="text-muted-foreground mb-8 leading-relaxed">
              如果您有宝贵的项目经验或技术心得想要分享，欢迎投稿。
              我们期待与更多行业同仁交流学习，共同进步。
            </motion.p>
            <motion.div variants={itemVariants}>
              <a
                href="https://direct.fensun.anycast.nyc.mn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="btn-industrial bg-primary hover:bg-primary/90 text-primary-foreground font-heading tracking-wider"
                >
                  联系我们
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
