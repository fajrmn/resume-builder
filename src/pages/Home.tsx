import { Link } from 'react-router-dom';

const Home = () => {
  const templates = [
    { id: 'professional', name: 'Professional', description: 'Traditional business format' },
    { id: 'minimal', name: 'Minimal', description: 'Clean, straightforward layout' },
    { id: 'creative', name: 'Creative', description: 'Modern, visually appealing style' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your Professional Resume
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose a template to get started
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {templates.map((template) => (
            <Link
              key={template.id}
              to={`/editor?template=${template.id}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600">{template.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
