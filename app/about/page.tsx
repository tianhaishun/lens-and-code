import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cinema-black flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden flex-shrink-0">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-cinema-black/50 to-cinema-black" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20" />
        </div>
        <div className="relative text-center px-4">
          <div className="w-32 h-32 mx-auto mb-6 bg-cinema-gold rounded-full flex items-center justify-center">
            <span className="text-cinema-black font-bold text-7xl">J</span>
          </div>
          <h1 className="cinema-title text-5xl text-white mb-4 text-shadow">Justin Tian</h1>
          <p className="text-cinema-silver text-xl">全栈开发者 | 摄影爱好者 | 终身学习者</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-cinema-silver text-lg leading-relaxed space-y-6">
              <p className="text-2xl text-cinema-gold italic text-center">
                "用代码构建世界，用镜头记录生活"
              </p>

              <h2 className="cinema-title text-3xl text-white mt-12 mb-6">关于我</h2>
              <p>
                你好！我是 Justin Tian，一名热爱技术与创造的全栈开发者。我相信技术是改变世界的力量，
                而优秀的代码如同诗歌，优雅而富有表现力。
              </p>
              <p>
                在日常工作中，我专注于 Web 前端开发，使用 React、Next.js、TypeScript 等技术栈构建现代化的应用。
                我对用户体验和视觉设计有着执着的追求，致力于创造出既美观又实用的产品。
              </p>

              <h2 className="cinema-title text-3xl text-white mt-12 mb-6">技术栈</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
                {[
                  'React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL',
                  'MongoDB', 'Docker', 'Git', 'GraphQL', 'Redis', 'AWS'
                ].map((tech) => (
                  <div key={tech} className="bg-cinema-dark px-4 py-3 rounded border border-cinema-gray text-center">
                    <span className="text-cinema-gold">{tech}</span>
                  </div>
                ))}
              </div>

              <h2 className="cinema-title text-3xl text-white mt-12 mb-6">兴趣爱好</h2>
              <p>
                除了编程，我还有许多热爱的事物：
              </p>
              <ul className="list-disc list-inside space-y-2 text-cinema-silver">
                <li>摄影 - 用镜头捕捉生活中的美好瞬间</li>
                <li>阅读 - 从技术书籍到文学作品，保持好奇心</li>
                <li>电影 - 欣赏优秀的叙事和视觉艺术</li>
                <li>音乐 - 在旋律中寻找灵感</li>
                <li>旅行 - 探索不同的文化和风景</li>
              </ul>

              <h2 className="cinema-title text-3xl text-white mt-12 mb-6">联系方式</h2>
              <p>
                无论是技术交流、项目合作，还是简单的打个招呼，欢迎随时联系我！
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href="https://github.com/tianhaishun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cinema-gray hover:bg-cinema-gold hover:text-cinema-black rounded transition-all"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cinema-gray hover:bg-cinema-gold hover:text-cinema-black rounded transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
