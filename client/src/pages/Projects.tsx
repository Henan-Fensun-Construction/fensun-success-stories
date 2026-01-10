/**
 * 工程案例列表页面
 * 
 * 展示公司所有工程案例，支持分类、年份、状态筛选和搜索
 */

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  sampleProjects,
  projectCategories,
  filterProjectsByCategory,
  filterProjectsByStatus,
  searchProjects,
  type Project,
} from '@/lib/projects';
import { Link } from 'wouter';
import { ChevronRight, MapPin, Calendar, Ruler } from 'lucide-react';

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

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 获取所有年份用于筛选
  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(sampleProjects.map((p) => p.year)));
    return uniqueYears.sort((a, b) => b - a);
  }, []);

  // 过滤工程案例
  const filteredProjects = useMemo(() => {
    let results = sampleProjects;

    // 按分类筛选
    if (selectedCategory !== 'all') {
      results = filterProjectsByCategory(selectedCategory);
    }

    // 按状态筛选
    if (selectedStatus !== 'all') {
      results = filterProjectsByStatus(selectedStatus);
    }

    // 按搜索关键词筛选
    if (searchQuery.trim()) {
      results = results.filter((project) => {
        const query = searchQuery.toLowerCase();
        return (
          project.title.toLowerCase().includes(query) ||
          project.location.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query)
        );
      });
    }

    return results;
  }, [selectedCategory, selectedStatus, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* 页面头部 */}
      <div className="bg-gradient-to-b from-slate-50 to-background py-12 md:py-16 border-b border-border">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            工程案例
          </h1>
          <p className="text-muted-foreground text-lg">
            展示我们的代表性工程项目和施工成果
          </p>
        </div>
      </div>

      {/* 筛选区域 */}
      <div className="bg-background border-b border-border sticky top-0 z-40">
        <div className="container py-6">
          {/* 搜索框 */}
          <div className="mb-6">
            <Input
              type="text"
              placeholder="搜索工程案例..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* 分类筛选 */}
          <div className="mb-4">
            <p className="text-sm font-medium text-foreground mb-3">工程类型</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                全部
              </Button>
              {Object.entries(projectCategories).map(([key, label]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(key)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* 状态筛选 */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">工程状态</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus('all')}
              >
                全部
              </Button>
              {Object.entries(statusConfig).map(([key, { label }]) => (
                <Button
                  key={key}
                  variant={selectedStatus === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStatus(key)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 工程案例列表 */}
      <div className="container py-12">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col">
                  {/* 项目图片 */}
                  <div className="relative w-full h-48 overflow-hidden bg-slate-200">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={statusConfig[project.status].color}>
                        {statusConfig[project.status].label}
                      </Badge>
                    </div>
                  </div>

                  {/* 项目信息 */}
                  <div className="flex-1 p-4 flex flex-col">
                    {/* 分类标签 */}
                    <div className="mb-2">
                      <Badge className={categoryConfig[project.category].color}>
                        {categoryConfig[project.category].label}
                      </Badge>
                    </div>

                    {/* 项目标题 */}
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                      {project.title}
                    </h3>

                    {/* 项目描述 */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                      {project.description}
                    </p>

                    {/* 项目信息 */}
                    <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{project.year}年</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4" />
                        <span>{project.scale}</span>
                      </div>
                    </div>

                    {/* 查看详情按钮 */}
                    <div className="flex items-center text-primary font-medium text-sm hover:gap-1 transition-all">
                      查看详情
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              没有找到匹配的工程案例
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStatus('all');
                setSearchQuery('');
              }}
              className="mt-4"
            >
              清除筛选条件
            </Button>
          </div>
        )}

        {/* 统计信息 */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground">
            共 <span className="font-semibold text-foreground">{filteredProjects.length}</span> 个工程案例
          </p>
        </div>
      </div>
    </div>
  );
}
