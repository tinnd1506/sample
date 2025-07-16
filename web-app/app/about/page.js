import Link from 'next/link';

async function getAboutSections() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/about`, {
      cache: 'no-store', // Ensures fresh data on each request
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch about sections');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching about sections:', error);
    return [];
  }
}

export default async function About() {
  const aboutSections = await getAboutSections();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <main className="text-center max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          About Us
        </h1>
        <p className="text-gray-500 mb-8">
          Learn more about our company and what we stand for.
        </p>

        <div className="grid gap-4 mb-8">
          {aboutSections.map((section) => (
            <Link
              key={section.id}
              href={`/about/${section.id}`}
              className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
              <p className="text-gray-600 mt-1">{section.description}</p>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-block text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>
      </main>
    </div>
  );
}