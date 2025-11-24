/**
 * Mock Data for Development and Testing
 * This file provides sample data when the backend is not available
 */

import type { NewsArticle, Comment, Category } from '@/types'

export const mockCategories: Category[] = [
    { id: 1, name: 'Artificial Intelligence', slug: 'ai', description: 'AI and Machine Learning news' },
    { id: 2, name: 'Web Development', slug: 'web-dev', description: 'Web technologies and frameworks' },
    { id: 3, name: 'Mobile', slug: 'mobile', description: 'Mobile app development' },
    { id: 4, name: 'Cloud Computing', slug: 'cloud', description: 'Cloud services and infrastructure' },
    { id: 5, name: 'Cybersecurity', slug: 'security', description: 'Security and privacy news' },
    { id: 6, name: 'DevOps', slug: 'devops', description: 'DevOps tools and practices' },
]

export const mockNews: NewsArticle[] = [
    {
        id: 1,
        title: 'Revolutionary AI Model Achieves Human-Level Performance in Complex Tasks',
        summary: 'A groundbreaking new AI model has demonstrated unprecedented capabilities in understanding and solving complex problems, marking a significant milestone in artificial intelligence research.',
        content: `Researchers at leading tech institutions have unveiled a revolutionary AI model that achieves human-level performance across a wide range of complex cognitive tasks. This breakthrough represents years of dedicated research and development in the field of artificial intelligence.

The new model, which utilizes advanced neural network architectures and innovative training methodologies, has shown remarkable abilities in natural language understanding, logical reasoning, and creative problem-solving. In extensive testing, it has consistently matched or exceeded human performance on standardized benchmarks.

Key features of this AI system include:
- Enhanced contextual understanding
- Improved reasoning capabilities
- Better generalization across different domains
- More efficient learning from limited data

Industry experts believe this development could have far-reaching implications for various sectors, including healthcare, education, and scientific research. The technology promises to accelerate innovation and enable new applications that were previously thought impossible.

However, researchers also emphasize the importance of responsible AI development, highlighting the need for robust safety measures and ethical guidelines as these systems become more powerful and widely deployed.`,
        author: 'Dr. Sarah Chen',
        category: 'Artificial Intelligence',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
        publishedDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        views: 15420,
        likes: 892,
        tags: ['AI', 'Machine Learning', 'Research', 'Innovation'],
        featured: true,
    },
    {
        id: 2,
        title: 'Next.js 15 Released with Game-Changing Performance Improvements',
        summary: 'The latest version of Next.js brings significant performance enhancements, new features, and improved developer experience for building modern web applications.',
        content: `Vercel has officially released Next.js 15, the latest major version of the popular React framework. This release introduces substantial performance improvements and several highly anticipated features that promise to revolutionize web development.

Major highlights include:
- Turbopack integration for faster builds
- Enhanced server components
- Improved image optimization
- Better caching strategies
- Advanced routing capabilities

The new version focuses heavily on performance optimization, with build times reduced by up to 70% in large applications. The enhanced server components provide better data fetching patterns and improved SEO capabilities.

Developers can now leverage more powerful caching mechanisms, allowing for better control over data freshness and revalidation. The improved image optimization automatically handles responsive images and lazy loading, significantly improving page load times.

The Next.js team has also introduced new APIs for metadata management, making it easier to implement SEO best practices. The framework's routing system has been refined to provide more flexibility while maintaining the simplicity that developers love.

Migration guides and comprehensive documentation are available to help teams upgrade their existing applications. Early adopters report smooth transitions and immediate performance benefits.`,
        author: 'Michael Rodriguez',
        category: 'Web Development',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
        publishedDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        views: 12350,
        likes: 654,
        tags: ['Next.js', 'React', 'Web Development', 'Performance'],
        featured: true,
    },
    {
        id: 3,
        title: 'Flutter 4.0 Brings Native Desktop Support and Enhanced Performance',
        summary: 'Google announces Flutter 4.0 with full native desktop support, improved performance, and new tools for cross-platform development.',
        content: `Google has launched Flutter 4.0, marking a significant milestone in cross-platform development. This release brings production-ready desktop support and numerous performance enhancements.

The framework now offers seamless development across mobile, web, and desktop platforms with a single codebase. Performance improvements include faster rendering, reduced memory usage, and optimized build processes.

New features include enhanced Material Design 3 support, improved state management options, and better integration with native platform features. The development tools have also been upgraded with better debugging capabilities and performance profiling.`,
        author: 'Emily Watson',
        category: 'Mobile',
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
        publishedDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        views: 9870,
        likes: 521,
        tags: ['Flutter', 'Mobile', 'Cross-Platform', 'Google'],
    },
    {
        id: 4,
        title: 'AWS Announces Revolutionary Serverless Database Service',
        summary: 'Amazon Web Services unveils a new serverless database that automatically scales and optimizes costs based on actual usage patterns.',
        content: `AWS has introduced a groundbreaking serverless database service that promises to transform how developers build and scale applications. The new service automatically adjusts capacity based on workload demands.

Key benefits include zero database administration, automatic scaling, pay-per-request pricing, and built-in high availability. The service supports both SQL and NoSQL workloads with seamless migration paths from existing databases.

Early benchmarks show impressive performance with sub-millisecond latency and the ability to handle millions of requests per second. The service integrates seamlessly with other AWS offerings and provides comprehensive monitoring and analytics.`,
        author: 'David Kim',
        category: 'Cloud Computing',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
        publishedDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        views: 11200,
        likes: 687,
        tags: ['AWS', 'Cloud', 'Database', 'Serverless'],
        featured: true,
    },
    {
        id: 5,
        title: 'Critical Security Vulnerability Discovered in Popular JavaScript Library',
        summary: 'Security researchers have identified a critical vulnerability affecting millions of websites using a widely-adopted JavaScript library.',
        content: `Cybersecurity experts have uncovered a severe security flaw in a popular JavaScript library used by millions of websites worldwide. The vulnerability could potentially allow attackers to execute arbitrary code.

The issue has been assigned a critical severity rating and affects all versions released in the past two years. Developers are urged to update to the patched version immediately to protect their applications.

The library maintainers have released an emergency patch and are working with major CDN providers to ensure rapid distribution. Security teams recommend conducting thorough audits of applications using the affected library.`,
        author: 'Jennifer Martinez',
        category: 'Cybersecurity',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
        publishedDate: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        views: 18900,
        likes: 1243,
        tags: ['Security', 'JavaScript', 'Vulnerability', 'Alert'],
        featured: true,
    },
    {
        id: 6,
        title: 'Kubernetes 1.30 Released with Enhanced Security and Automation',
        summary: 'The latest version of Kubernetes introduces advanced security features and improved automation capabilities for container orchestration.',
        content: `The Cloud Native Computing Foundation has released Kubernetes 1.30, bringing significant improvements to security, automation, and operational efficiency.

New features include enhanced RBAC controls, improved secrets management, automated certificate rotation, and better resource optimization. The release also introduces new APIs for advanced workload management.

Performance improvements include faster pod startup times, more efficient resource allocation, and reduced cluster overhead. The update maintains backward compatibility while providing clear migration paths for deprecated features.`,
        author: 'Robert Thompson',
        category: 'DevOps',
        imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop',
        publishedDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        views: 8450,
        likes: 432,
        tags: ['Kubernetes', 'DevOps', 'Containers', 'Cloud Native'],
    },
    {
        id: 7,
        title: 'TypeScript 5.5 Introduces Powerful New Type System Features',
        summary: 'Microsoft releases TypeScript 5.5 with advanced type inference, better performance, and new language features for safer code.',
        content: `Microsoft has announced TypeScript 5.5, featuring significant enhancements to the type system and compiler performance. The update introduces more sophisticated type inference and new utility types.

Developers can now leverage improved const assertions, better template literal types, and enhanced discriminated unions. The compiler has been optimized for faster build times and reduced memory usage.

New language features include advanced pattern matching, improved error messages, and better IDE integration. The release maintains full backward compatibility with previous versions.`,
        author: 'Lisa Anderson',
        category: 'Web Development',
        imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
        publishedDate: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
        views: 10300,
        likes: 578,
        tags: ['TypeScript', 'JavaScript', 'Programming', 'Microsoft'],
    },
    {
        id: 8,
        title: 'Quantum Computing Breakthrough: New Algorithm Solves Complex Problems',
        summary: 'Researchers develop a quantum algorithm that dramatically outperforms classical computers in solving optimization problems.',
        content: `A team of quantum computing researchers has developed a revolutionary algorithm that demonstrates quantum supremacy in practical applications. The breakthrough could accelerate solutions to previously intractable problems.

The new algorithm shows exponential speedup for certain optimization tasks, with potential applications in drug discovery, financial modeling, and logistics. Initial tests have validated the approach on current quantum hardware.

Industry leaders are already exploring commercial applications, though researchers caution that widespread adoption will require further advances in quantum hardware stability and error correction.`,
        author: 'Dr. James Wilson',
        category: 'Artificial Intelligence',
        imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
        publishedDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        views: 14200,
        likes: 891,
        tags: ['Quantum Computing', 'AI', 'Research', 'Innovation'],
    },
    {
        id: 9,
        title: 'GitHub Copilot X: AI-Powered Development Reaches New Heights',
        summary: 'GitHub unveils Copilot X with GPT-4 integration, bringing conversational AI assistance directly into the development workflow.',
        content: `GitHub has launched Copilot X, the next generation of AI-powered coding assistance. Built on GPT-4, it offers conversational programming support and context-aware code generation.

New capabilities include chat-based code explanations, automated pull request descriptions, and intelligent code reviews. The system can now understand entire codebases and provide architectural suggestions.

Developers report significant productivity gains, with the AI handling routine tasks and offering creative solutions to complex problems. The tool integrates seamlessly with popular IDEs and supports multiple programming languages.`,
        author: 'Amanda Foster',
        category: 'Web Development',
        imageUrl: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=600&fit=crop',
        publishedDate: new Date(Date.now() - 60 * 60 * 60 * 1000).toISOString(),
        views: 16800,
        likes: 1024,
        tags: ['GitHub', 'AI', 'Developer Tools', 'GPT-4'],
        featured: true,
    },
]

export const mockComments: Record<number, Comment[]> = {
    1: [
        {
            id: 1,
            newsId: 1,
            author: 'Tech Enthusiast',
            content: 'This is absolutely fascinating! The implications for healthcare and scientific research are enormous. Can\'t wait to see how this technology evolves.',
            createdDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            likes: 24,
            replies: [
                {
                    id: 2,
                    newsId: 1,
                    author: 'AI Researcher',
                    content: 'Agreed! We\'re working on similar projects and the potential is incredible. The key will be ensuring responsible development and deployment.',
                    createdDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    likes: 12,
                },
            ],
        },
        {
            id: 3,
            newsId: 1,
            author: 'Skeptical Developer',
            content: 'While impressive, we need to be cautious about the ethical implications. How do we ensure these systems are used responsibly?',
            createdDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            likes: 18,
        },
    ],
    2: [
        {
            id: 4,
            newsId: 2,
            author: 'Frontend Dev',
            content: 'Just migrated our app to Next.js 15 and the performance improvements are real! Build times cut in half.',
            createdDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            likes: 31,
        },
    ],
}

// Helper function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock API functions
export const mockApi = {
    async getNews (params?: any) {
        await delay(800)
        let filtered = [...mockNews]

        if (params?.query) {
            const query = params.query.toLowerCase()
            filtered = filtered.filter(news =>
                news.title.toLowerCase().includes(query) ||
                news.summary.toLowerCase().includes(query) ||
                news.content.toLowerCase().includes(query)
            )
        }

        if (params?.category) {
            filtered = filtered.filter(news => news.category === params.category)
        }

        if (params?.sortBy === 'views') {
            filtered.sort((a, b) => b.views - a.views)
        } else if (params?.sortBy === 'likes') {
            filtered.sort((a, b) => b.likes - a.likes)
        } else {
            filtered.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
        }

        const page = params?.page || 1
        const pageSize = params?.pageSize || 9
        const start = (page - 1) * pageSize
        const end = start + pageSize

        return {
            success: true,
            data: filtered.slice(start, end),
            total: filtered.length,
            page,
            pageSize,
        }
    },

    async getNewsById (id: number | string) {
        await delay(500)
        const news = mockNews.find(n => n.id === Number(id))
        return {
            success: !!news,
            data: news || null,
        }
    },

    async getTrendingNews (limit: number = 5) {
        await delay(600)
        const trending = mockNews
            .filter(n => n.featured)
            .sort((a, b) => b.views - a.views)
            .slice(0, limit)

        return {
            success: true,
            data: trending,
        }
    },

    async getCategories () {
        await delay(400)
        return {
            success: true,
            data: mockCategories,
        }
    },

    async getComments (newsId: number | string) {
        await delay(500)
        return {
            success: true,
            data: mockComments[Number(newsId)] || [],
        }
    },

    async createComment (newsId: number | string, comment: any) {
        await delay(600)
        const newComment: Comment = {
            id: Date.now(),
            newsId: Number(newsId),
            author: comment.author,
            content: comment.content,
            createdDate: new Date().toISOString(),
            likes: 0,
        }

        if (!mockComments[Number(newsId)]) {
            mockComments[Number(newsId)] = []
        }
        mockComments[Number(newsId)].unshift(newComment)

        return {
            success: true,
            data: newComment,
        }
    },

    async deleteComment (newsId: number | string, commentId: number | string) {
        await delay(500)
        const comments = mockComments[Number(newsId)]
        if (comments) {
            const index = comments.findIndex(c => c.id === Number(commentId))
            if (index > -1) {
                comments.splice(index, 1)
            }
        }

        return {
            success: true,
            data: null,
        }
    },
}
