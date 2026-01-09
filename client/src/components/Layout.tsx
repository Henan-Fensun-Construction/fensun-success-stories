/**
 * 工业建筑主义布局组件
 * 
 * 设计特点:
 * - 固定顶部导航栏，深色背景
 * - 斜切角装饰元素
 * - 蓝图网格背景
 */

import { Link, useLocation } from "wouter";
import { Menu, X, Building2, FileText, Home as HomeIcon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: "/", label: "首页", icon: HomeIcon },
  { href: "/stories", label: "经验分享", icon: FileText },
];

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-primary flex items-center justify-center btn-industrial">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <div className="font-heading text-lg font-bold tracking-wider text-foreground group-hover:text-primary transition-colors">
                  奋隼建筑
                </div>
                <div className="text-xs text-muted-foreground tracking-widest">
                  SUCCESS STORIES
                </div>
              </div>
            </Link>

            {/* 桌面端导航 */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location === item.href || 
                  (item.href !== "/" && location.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative px-4 py-2 font-heading text-sm tracking-wider uppercase
                      transition-colors duration-200
                      ${isActive 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
              <a
                href="https://direct.fensun.anycast.nyc.mn/"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-4 py-2 bg-primary text-primary-foreground font-heading text-sm tracking-wider uppercase btn-industrial hover:bg-primary/90 transition-colors"
              >
                公司官网
              </a>
            </nav>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-card border-t border-border overflow-hidden"
            >
              <nav className="container py-4 flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.href || 
                    (item.href !== "/" && location.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 font-heading text-sm tracking-wider uppercase
                        transition-colors duration-200
                        ${isActive 
                          ? "text-primary bg-primary/10" 
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}
                <a
                  href="https://direct.fensun.anycast.nyc.mn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 mt-2 bg-primary text-primary-foreground font-heading text-sm tracking-wider uppercase"
                >
                  <Building2 className="w-5 h-5" />
                  公司官网
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 主内容区域 */}
      <main className="pt-16">
        {children}
      </main>

      {/* 页脚 */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 公司信息 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary flex items-center justify-center btn-industrial">
                  <Building2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-heading text-lg font-bold tracking-wider">
                    奋隼建筑
                  </div>
                  <div className="text-xs text-muted-foreground tracking-widest">
                    FENSUN CONSTRUCTION
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                河南奋隼建筑工程有限公司成立于2020年，专注于建筑工程、市政工程及装饰装修施工。
              </p>
            </div>

            {/* 快速链接 */}
            <div>
              <h3 className="font-heading text-sm font-bold tracking-wider uppercase mb-4 text-primary">
                快速链接
              </h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://direct.fensun.anycast.nyc.mn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    公司官网
                  </a>
                </li>
              </ul>
            </div>

            {/* 联系信息 */}
            <div>
              <h3 className="font-heading text-sm font-bold tracking-wider uppercase mb-4 text-primary">
                联系我们
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>河南省郑州市金水区</li>
                <li>info@fensun-construction.com</li>
                <li>周一至周五 8:00–18:00</li>
              </ul>
            </div>
          </div>

          {/* 版权信息 */}
          <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} 河南奋隼建筑工程有限公司 版权所有
            </p>
            <div className="flex items-center gap-4">
              <span className="data-label">专注建筑施工与市政工程</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
