/**
 * 工程案例数据
 * 
 * 定义公司的代表性工程项目
 */

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'residential' | 'municipal' | 'commercial' | 'decoration';
  location: string;
  year: number;
  scale: string;
  description: string;
  image: string;
  highlights: string[];
  status: 'completed' | 'ongoing' | 'planning';
}

export const projectCategories = {
  residential: '房屋建筑',
  municipal: '市政工程',
  commercial: '商业综合',
  decoration: '装饰装修',
};

export const sampleProjects: Project[] = [
  {
    id: 'project-001',
    slug: 'zhengzhou-residential-complex',
    title: '郑州金水区高层住宅综合体',
    category: 'residential',
    location: '郑州市金水区',
    year: 2025,
    scale: '12万㎡',
    description: '包含4栋32层高层住宅楼及配套商业裙房，总建筑面积约12万平方米。项目采用先进的施工工艺和质量管理体系，确保工程质量优良。',
    image: '/images/hero-construction.jpg',
    highlights: [
      '工程质量评定：优良',
      '安全生产：零事故',
      '工期：提前15天完工',
      '客户满意度：98%',
    ],
    status: 'completed',
  },
  {
    id: 'project-002',
    slug: 'city-main-road-expansion',
    title: '城市主干道扩建工程',
    category: 'municipal',
    location: '郑州市中原区',
    year: 2024,
    scale: '8.5km',
    description: '城市主干道全长8.5公里的扩建工程，包括路基处理、路面铺装、排水系统等。项目采用国际先进的施工技术，确保道路使用寿命。',
    image: '/images/municipal-project.jpg',
    highlights: [
      '路面平整度达标率：99%',
      '压实度：≥98%',
      '工期控制：按时完成',
      '通车评价：优秀',
    ],
    status: 'completed',
  },
  {
    id: 'project-003',
    slug: 'commercial-complex-downtown',
    title: '市中心商业综合体',
    category: 'commercial',
    location: '郑州市二七区',
    year: 2024,
    scale: '15万㎡',
    description: '集办公、商业、酒店、公寓于一体的大型商业综合体，总建筑面积15万平方米。项目融合现代建筑设计与高效施工管理。',
    image: '/images/success-story-bg.jpg',
    highlights: [
      '建筑设计获奖',
      '绿色建筑认证',
      '智能化系统完整',
      '商业运营成功',
    ],
    status: 'completed',
  },
  {
    id: 'project-004',
    slug: 'office-building-renovation',
    title: '办公楼装饰装修工程',
    category: 'decoration',
    location: '郑州市金水区',
    year: 2024,
    scale: '5万㎡',
    description: '大型办公楼的全面装饰装修，包括办公区、会议室、休闲区等多功能空间。项目注重功能性、安全性和美观性的统一。',
    image: '/images/team-work.jpg',
    highlights: [
      '设计风格现代',
      '施工工艺精细',
      '环保材料应用',
      '业主满意度高',
    ],
    status: 'completed',
  },
  {
    id: 'project-005',
    slug: 'residential-district-phase2',
    title: '住宅小区二期工程',
    category: 'residential',
    location: '郑州市惠济区',
    year: 2025,
    scale: '8万㎡',
    description: '大型住宅小区的二期开发项目，包含多栋高层住宅和配套设施。项目延续一期的高质量标准，进一步提升居住品质。',
    image: '/images/blueprint-pattern.jpg',
    highlights: [
      '配套设施完善',
      '绿化覆盖率高',
      '安全防护到位',
      '社区评价优秀',
    ],
    status: 'ongoing',
  },
  {
    id: 'project-006',
    slug: 'bridge-reconstruction',
    title: '跨河大桥改造工程',
    category: 'municipal',
    location: '郑州市',
    year: 2025,
    scale: '1.2km',
    description: '城市跨河大桥的全面改造升级，包括桥体加固、路面更新、安全设施改造等。项目采用先进的桥梁施工技术。',
    image: '/images/hero-construction.jpg',
    highlights: [
      '结构安全性提升',
      '通行能力增加',
      '交通组织完善',
      '居民出行便利',
    ],
    status: 'ongoing',
  },
];

/**
 * 按分类筛选工程案例
 */
export function filterProjectsByCategory(category: string): Project[] {
  if (category === 'all') {
    return sampleProjects;
  }
  return sampleProjects.filter((project) => project.category === category);
}

/**
 * 按年份筛选工程案例
 */
export function filterProjectsByYear(year: number): Project[] {
  return sampleProjects.filter((project) => project.year === year);
}

/**
 * 按状态筛选工程案例
 */
export function filterProjectsByStatus(status: string): Project[] {
  if (status === 'all') {
    return sampleProjects;
  }
  return sampleProjects.filter((project) => project.status === status);
}

/**
 * 搜索工程案例
 */
export function searchProjects(keyword: string): Project[] {
  const lowerKeyword = keyword.toLowerCase();
  return sampleProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(lowerKeyword) ||
      project.location.toLowerCase().includes(lowerKeyword) ||
      project.description.toLowerCase().includes(lowerKeyword) ||
      project.highlights.some((h) => h.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * 获取单个工程案例
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return sampleProjects.find((project) => project.slug === slug);
}

/**
 * 获取最新的工程案例
 */
export function getLatestProjects(limit: number = 3): Project[] {
  return sampleProjects
    .sort((a, b) => b.year - a.year)
    .slice(0, limit);
}
