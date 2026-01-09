/**
 * 网站布局组件
 * 
 * 奋隼建筑官网风格:
 * - 简洁专业的白色背景
 * - 固定顶部导航栏
 * - 统一的页脚设计
 */

import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

// 导航链接配置
const navLinks = [
  { href: "/", label: "首页", isAnchor: false },
  { href: "/#services", label: "业务领域", isAnchor: true },
  { href: "/#projects", label: "工程案例", isAnchor: true },
  { href: "/#about", label: "公司简介", isAnchor: true },
  { href: "/stories", label: "经验分享", isAnchor: false },
  { href: "/#contact", label: "联系我们", isAnchor: true },
];

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 处理导航点击
  const handleNavClick = (href: string, isAnchor: boolean) => {
    setIsMobileMenuOpen(false);
    
    if (isAnchor) {
      const hash = href.split("#")[1];
      
      // 如果当前不在首页，先跳转到首页
      if (location !== "/") {
        window.location.href = href;
        return;
      }
      
      // 如果在首页，直接滚动到锚点
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* 顶部导航 */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-sm shadow-sm border-b border-border"
            : "bg-background border-b border-border"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img
                src="https://cdn.jsdelivr.net/gh/Henan-Fensun-Construction/resource/Logo.jpg"
                alt="河南奋隼建筑工程有限公司"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-lg font-semibold text-foreground">
                河南奋隼建筑
              </span>
            </Link>

            {/* 桌面导航 */}
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-7">
                {navLinks.map((link) => {
                  const isActive = 
                    link.href === location || 
                    (link.href === "/stories" && location.startsWith("/stories"));
                  
                  return (
                    <li key={link.href}>
                      {link.isAnchor ? (
                        <a
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(link.href, link.isAnchor);
                          }}
                          className={`text-sm transition-colors hover:text-foreground ${
                            isActive
                              ? "text-primary font-medium"
                              : "text-muted-foreground"
                          }`}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className={`text-sm transition-colors hover:text-foreground ${
                            isActive
                              ? "text-primary font-medium"
                              : "text-muted-foreground"
                          }`}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* 移动端导航菜单 */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <nav className="container py-4">
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  const isActive = 
                    link.href === location || 
                    (link.href === "/stories" && location.startsWith("/stories"));
                  
                  return (
                    <li key={link.href}>
                      {link.isAnchor ? (
                        <a
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(link.href, link.isAnchor);
                          }}
                          className={`block py-3 px-4 rounded-lg transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-secondary"
                          }`}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block py-3 px-4 rounded-lg transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-secondary"
                          }`}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* 主内容区 */}
      <main className="flex-1">{children}</main>

      {/* 页脚 */}
      <footer className="bg-foreground text-background py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* 公司信息 */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://cdn.jsdelivr.net/gh/Henan-Fensun-Construction/resource/Logo.jpg"
                  alt="河南奋隼建筑工程有限公司"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-lg font-semibold">河南奋隼建筑</span>
              </div>
              <p className="text-background/70 text-sm leading-relaxed max-w-md">
                河南奋隼建筑工程有限公司，专业从事房屋建筑施工、市政工程建设及装饰装修工程，
                具备完善施工管理体系，为客户提供安全、优质、高效的建筑工程服务。
              </p>
            </div>

            {/* 快速链接 */}
            <div>
              <h4 className="font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-background/70 hover:text-background transition-colors">
                    首页
                  </Link>
                </li>
                <li>
                  <Link href="/stories" className="text-background/70 hover:text-background transition-colors">
                    经验分享
                  </Link>
                </li>
                <li>
                  <a href="/#about" className="text-background/70 hover:text-background transition-colors">
                    公司简介
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="text-background/70 hover:text-background transition-colors">
                    联系我们
                  </a>
                </li>
              </ul>
            </div>

            {/* 联系方式 */}
            <div>
              <h4 className="font-semibold mb-4">联系方式</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>河南省郑州市金水区</li>
                <li>info@fensun-construction.com</li>
                <li>周一至周五 8:00-18:00</li>
              </ul>
            </div>
          </div>

          {/* 版权信息 */}
          <div className="pt-8 border-t border-background/20 text-center text-sm text-background/60">
            © {new Date().getFullYear()} 河南奋隼建筑工程有限公司 版权所有
          </div>
        </div>
      </footer>
    </div>
  );
}
