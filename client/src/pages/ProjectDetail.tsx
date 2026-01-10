/**
 * 工程案例详情页面
 * 
 * 展示单个工程案例的详细信息
 */

import { useParams, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { getProjectBySlug, projectCategories } from '@/lib/projects';
import { ArrowLeft, MapPin, Calendar, Ruler, CheckCircle2, Share2 } from 'lucide-react';

const categoryConfig: Record<string, { label: string; color: string }> = {
  residential: { label: '房屋建筑', color: 'bg-blue-100 text-blue-800' },
  municipal: { label: '市政工程', color: 'bg-green-100 text-green-800' },
  commercial: { label: '商业综合', color: 'bg-purple-100 text-purple-800' },
  decoration: { label: '装饰装修', color: 'bg-orange-100 text-orange-800' },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  completed: { label: '已完成', color: 'bg-emerald-100 text-emerald-800' },
  ongoing: { label: '进行中', color: 'bg-amber-100 text-amber-800' },
  planning: { label: '规划中', color: 'bg-slate-100 text-slate-800' },
};

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;

  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">工程案例未找到</h1>
            <p className="text-muted-foreground mb-6">
              抱歉，您访问的工程案例不存在
            </p>
            <Link href="/projects">
              <Button>返回工程案例列表</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* 导航栏 */}
        <div className="bg-background border-b border-border sticky top-0 z-40">
          <div className="container py-4 flex items-center justify-between">
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                返回工程案例列表
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              分享工程案例
            </Button>
          </div>
        </div>

        {/* 项目头部 */}
        <div className="w-full">
          {/* 项目图片 */}
          <div className="relative w-full h-96 overflow-hidden bg-slate-200">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <div className="container">
                <div className="mb-3 flex gap-2">
                  <Badge className={categoryConfig[project.category].color}>
                    {categoryConfig[project.category].label}
                  </Badge>
                  <Badge className={statusConfig[project.status].color}>
                    {statusConfig[project.status].label}
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {project.title}
                </h1>
                <p className="text-lg opacity-90">{project.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 项目信息 */}
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 主要内容 */}
            <div className="lg:col-span-2">
              {/* 项目概况 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">项目概况</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.description}
                </p>
              </section>

              {/* 项目亮点 */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">项目亮点</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-border"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 联系我们 */}
              <section className="bg-slate-50 border border-border rounded-lg p-6 md:p-8">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  对此项目感兴趣？
                </h3>
                <p className="text-muted-foreground mb-4">
                  欢迎联系我们了解更多项目详情和合作机会
                </p>
                <Link href="/#contact">
                  <Button>联系我们了解更多 →</Button>
                </Link>
              </section>
            </div>

            {/* 侧边栏 */}
            <div>
              {/* 项目信息卡片 */}
              <div className="bg-slate-50 border border-border rounded-lg p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  项目信息
                </h3>

                <div className="space-y-4">
                  {/* 项目位置 */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">项目位置</p>
                    <div className="flex items-center gap-2 text-foreground font-medium">
                      <MapPin className="w-4 h-4 text-primary" />
                      {project.location}
                    </div>
                  </div>

                  {/* 竣工年份 */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">竣工年份</p>
                    <div className="flex items-center gap-2 text-foreground font-medium">
                      <Calendar className="w-4 h-4 text-primary" />
                      {project.year}年
                    </div>
                  </div>

                  {/* 项目规模 */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">项目规模</p>
                    <div className="flex items-center gap-2 text-foreground font-medium">
                      <Ruler className="w-4 h-4 text-primary" />
                      {project.scale}
                    </div>
                  </div>

                  {/* 工程类型 */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">工程类型</p>
                    <Badge className={categoryConfig[project.category].color}>
                      {categoryConfig[project.category].label}
                    </Badge>
                  </div>

                  {/* 工程状态 */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">工程状态</p>
                    <Badge className={statusConfig[project.status].color}>
                      {statusConfig[project.status].label}
                    </Badge>
                  </div>
                </div>

                {/* 分割线 */}
                <div className="my-6 border-t border-border" />

                {/* 行动按钮 */}
                <div className="space-y-3">
                  <Link href="/#contact">
                    <Button className="w-full">咨询项目详情</Button>
                  </Link>
                  <Link href="/projects">
                    <Button variant="outline" className="w-full">
                      查看其他案例
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
