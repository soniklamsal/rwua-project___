import Link from 'next/link';

export default function PostNotFound() {
    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-24">
            <div className="container mx-auto px-8 md:px-16 lg:px-24">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif-impact text-deep-purple mb-6">
                        Post Not Found
                    </h1>
                    <p className="text-stone-600 text-lg mb-8">
                        The post you're looking for doesn't exist or may have been moved.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/news"
                            className="bg-rwua-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
                        >
                            Browse All Posts
                        </Link>
                        <Link
                            href="/"
                            className="border border-stone-300 text-stone-700 px-6 py-3 rounded-lg hover:bg-stone-100 transition-colors"
                        >
                            Go Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}