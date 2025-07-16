import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <main className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome
        </h1>
        <p className="text-gray-600 mb-8">
          A minimal Next.js starter
        </p>
        <Link 
          href="/about" 
          className="text-blue-600 hover:underline"
        >
          About Us →
        </Link>
      </main>
    </div>
  );
}
