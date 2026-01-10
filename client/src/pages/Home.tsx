/**
 * 首页组件
 * 
 * 整合官网内容与经验分享预览:
 * - 英雄区 (Hero)
 * - 业务领域 (Services)
 * - 工程案例 (Projects)
 * - 公司简介 (About)
 * - 经验分享预览 (Stories Preview)
 * - 联系我们 (Contact)
 */

import Layout from "@/components/Layout";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Landmark, PaintBucket, FileText, Shield, Award } from "lucide-react";
import { useStories } from "@/hooks/useStories";
import { Button } from "@/components/ui/button";

// 动画变体
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// 业务领域数据
const services = [
  {
    icon: Building2,
    title: "房屋建筑工程",
    description: "承接住宅、商业及公共建筑施工，严格执行国家施工规范与质量标准。"
  },
  {
    icon: Landmark,
    title: "市政工程施工",
    description: "道路、桥梁、管网等市政基础设施工程，具备系统化施工管理能力。"
  },
  {
    icon: PaintBucket,
    title: "装饰装修工程",
    description: "室内外装饰装修施工，注重功能、安全与整体效果统一。"
  }
];

// 工程案例数据
const projects = [
  {
    title: "住宅小区建设项目",
    category: "住宅建筑工程",
    description: "多栋住宅楼及配套设施施工，按期交付并通过验收。",
    image: "/images/success-story-bg.jpg"
  },
  {
    title: "商业综合体项目",
    category: "商业建筑工程",
    description: "集商业、办公于一体的综合性建筑工程。",
    image: "/images/hero-construction.jpg"
  },
  {
    title: "城市道路改造工程",
    category: "市政工程",
    description: "城市主干道路施工及配套管网工程。",
    image: "/images/municipal-project.jpg"
  }
];

// 统计数据
const stats = [
  { value: "500+", label: "工程经验" },
  { value: "100+", label: "专业人员" },
  { value: "98%", label: "客户满意度" },
  { value: "多年", label: "行业经验" }
];

// 分类名称映射
const categoryNames: Record<string, string> = {
  project: "项目经验",
  technology: "技术分享",
  management: "管理心得",
  safety: "安全管理",
  quality: "质量控制",
};

export default function Home() {
  const { stories, loading } = useStories();
  const latestStories = stories.slice(0, 3);

  return (
    <Layout>
      {/* 英雄区 */}
      <section id="home" className="relative h-[520px] flex items-center">
        {/* 背景图片 */}
        <div className="absolute inset-0">
          <img
            src="https://cdn.jsdelivr.net/gh/Henan-Fensun-Construction/resource/Company%20Wall.jpg"
            alt="河南奋隼建筑"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* 内容 */}
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl text-white"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-semibold mb-5 leading-tight"
            >
              河南奋隼建筑工程有限公司
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl text-white/85 mb-8"
            >
              专注建筑施工与市政工程 · 以质量与责任筑就每一项工程
            </motion.p>
            <motion.div variants={fadeInUp}>
              <a 
                href="#contact" 
                className="btn-outline text-white border-white hover:bg-white hover:text-black"
              >
                业务咨询
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 业务领域 */}
      <section id="services" className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="section-title">
              <h2>业务领域</h2>
              <p>覆盖建筑工程全流程的专业施工服务</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    variants={fadeInUp}
                    className="p-10 border border-border text-center card-hover hover:shadow-xl"
                  >
                    <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 工程案例 */}
      <section id="projects" className="py-20 bg-secondary/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="section-title">
              <h2>工程案例</h2>
              <p>部分代表性项目展示</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={fadeInUp}
                  className="bg-background border border-border overflow-hidden card-hover"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-semibold mt-2 mb-3 text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="mt-12 text-center">
              <Link href="/projects">
                <Button size="lg" className="gap-2">
                  查看全部工程案例
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 公司简介 */}
      <section id="about" className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="section-title">
              <h2>公司简介</h2>
              <p>稳健经营 · 注重质量 · 持续发展</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeInUp}>
                <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-foreground">
                  专业施工管理团队
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  河南奋隼建筑工程有限公司成立于2020年，专注于建筑工程、市政工程及装饰装修施工。
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  公司建立了完善的施工管理与质量控制体系，坚持安全生产与规范施工。
                </p>

                {/* 统计数据 */}
                <div className="grid grid-cols-2 gap-5">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-5 border border-border text-center"
                    >
                      <strong className="block text-3xl font-semibold text-foreground mb-1">
                        {stat.value}
                      </strong>
                      <span className="text-sm text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <img
                  src="/images/team-work.jpg"
                  alt="河南奋隼建筑团队"
                  className="w-full rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 经验分享预览 */}
      <section id="stories-preview" className="py-20 bg-secondary/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex items-end justify-between mb-16">
              <div className="section-title text-left mb-0">
                <h2>经验分享</h2>
                <p>项目管理、技术创新、安全生产等方面的实践经验</p>
              </div>
              <Link href="/stories">
                <Button variant="ghost" className="text-primary hover:text-primary/80 hidden sm:flex">
                  查看全部
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            {/* 文章列表 */}
            {loading ? (
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-background border border-border p-6 animate-pulse">
                    <div className="h-48 bg-secondary mb-4" />
                    <div className="h-6 bg-secondary mb-2 w-3/4" />
                    <div className="h-4 bg-secondary w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {latestStories.map((story) => (
                  <motion.div key={story.slug} variants={fadeInUp}>
                    <Link href={`/stories/${story.slug}`}>
                      <article className="bg-background border border-border overflow-hidden card-hover group h-full flex flex-col">
                        {/* 封面图 */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={story.coverImage || "/images/blueprint-pattern.jpg"}
                            alt={story.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {story.category && (
                            <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-medium">
                              {categoryNames[story.category] || story.category}
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
                          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                            {story.excerpt}
                          </p>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* 移动端查看全部按钮 */}
            <motion.div variants={fadeInUp} className="mt-8 text-center sm:hidden">
              <Link href="/stories">
                <Button variant="outline" className="w-full">
                  查看全部经验分享
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 联系我们 */}
      <section id="contact" className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="section-title">
              <h2>联系我们</h2>
              <p>欢迎洽谈合作</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div variants={fadeInUp} className="p-6 border border-border">
                <h4 className="font-semibold mb-2 text-foreground">公司地址</h4>
                <p className="text-muted-foreground text-sm">
                  河南省郑州市金水区
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="p-6 border border-border">
                <h4 className="font-semibold mb-2 text-foreground">联系电话</h4>
                <p className="text-muted-foreground text-sm">
                  0371-XXXXXXXX<br />
                  138-XXXX-XXXX
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="p-6 border border-border">
                <h4 className="font-semibold mb-2 text-foreground">电子邮箱</h4>
                <p className="text-muted-foreground text-sm">
                  info@fensun-construction.com
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="p-6 border border-border">
                <h4 className="font-semibold mb-2 text-foreground">工作时间</h4>
                <p className="text-muted-foreground text-sm">
                  周一至周五 8:00–18:00
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
