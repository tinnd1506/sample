// This is a Next.js API route
import { NextResponse } from 'next/server';

// Sample data - in a real app, this would come from a database
const aboutData = {
  sections: [
    {
      id: 'team',
      title: 'Our Team',
      description: 'Meet the people behind our success'
    },
    {
      id: 'mission',
      title: 'Our Mission',
      description: 'What drives us forward'
    },
    {
      id: 'history',
      title: 'Our History',
      description: 'How it all began'
    }
  ],
  items: {
    'team': {
      title: 'Our Team',
      description: 'Learn about the amazing people behind our company.',
      content: 'Our team is composed of passionate individuals dedicated to creating amazing experiences for our users.',
      image: '/images/team.jpg'
    },
    'mission': {
      title: 'Our Mission',
      description: 'What drives us forward every day.',
      content: 'Our mission is to build simple, elegant, and effective solutions that make a difference in people\'s lives.',
      image: '/images/mission.jpg'
    },
    'history': {
      title: 'Our History',
      description: 'How it all began.',
      content: 'Founded in 2023, we started with a simple idea and a passion for great design and user experience.',
      image: '/images/history.jpg'
    }
  }
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (id) {
    // Return specific item if ID is provided
    const item = aboutData.items[id] || null;
    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(item);
  }
  
  // Return all sections if no ID is provided
  return NextResponse.json(aboutData.sections);
}
