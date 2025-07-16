import Link from 'next/link';

async function getAboutItem(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/about?id=${id}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch about item');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching about item:', error);
    return null;
  }
}

// Generate metadata for each dynamic route
export async function generateMetadata({ params }) {
  // Get the id from params without destructuring
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  
  try {
    const item = await getAboutItem(id);
    
    if (!item) {
      return {
        title: 'Page Not Found | About Us',
        description: 'The requested page could not be found.'
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const imageUrl = `${baseUrl}${item.image || '/images/default-og.jpg'}`;

    return {
      title: `${item.title} | About Us`,
      description: item.description,
      openGraph: {
        title: item.title,
        description: item.description,
        type: 'website',
        url: `${baseUrl}/about/${id}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: item.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: item.title,
        description: item.description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error | About Us',
      description: 'An error occurred while loading this page.'
    };
  }
}

export default async function AboutItem({ params }) {
  // Get the id from params without destructuring
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const item = await getAboutItem(id) || {
    title: 'Page Not Found',
    description: 'The requested page could not be found.',
    content: 'Please check the URL and try again.'
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <main className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {item.title}
        </h1>
        <p className="text-gray-500 mb-6">{item.description}</p>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8 text-left">
          <p className="text-gray-700">{item.content}</p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/about" 
            className="inline-block text-blue-600 hover:underline"
          >
            ← Back to About
          </Link>
          
          {id === 'team' && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Meet the team:</p>
              <div className="flex justify-center gap-4">
                <Link href="/about/team/john" className="text-blue-600 hover:underline">John</Link>
                <Link href="/about/team/sarah" className="text-blue-600 hover:underline">Sarah</Link>
                <Link href="/about/team/mike" className="text-blue-600 hover:underline">Mike</Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}