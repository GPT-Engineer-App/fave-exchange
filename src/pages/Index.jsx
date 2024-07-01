import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import { Button } from '@/components/ui/button';
import { FaRocket, FaStar, FaUsers } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestimonialCard } from '@/components/TestimonialCard';

const Index = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto p-8 spacing-md">
      <header className="text-center mb-12 spacing-y-sm">
        <h1 className="text-4xl font-bold mb-4"><FaRocket /> Welcome to Faving</h1>
        <p className="text-lg spacing-y-xs">Discover, connect, and grow with Faving. Your ultimate platform for finding and offering services.</p>
        <Link to="/signup">
          <Button className="mt-6">Sign Up Now</Button>
        </Link>
      </header>

      <section className="mb-12 spacing-y-sm">
        <h2 className="text-3xl font-bold mb-4"><FaStar /> Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 spacing-y-xs">
          <Card>
            <CardHeader>
              <CardTitle>Feature 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Discover a wide range of services tailored to your needs.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Feature 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Connect with service providers and clients seamlessly.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Feature 3</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Grow your network and expand your opportunities.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12 spacing-y-sm">
        <h2 className="text-3xl font-bold mb-4"><FaUsers /> User Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 spacing-y-xs">
          <TestimonialCard
            name="John Doe"
            testimonial="Faving has transformed the way I find and offer services. It's user-friendly and highly effective."
          />
          <TestimonialCard
            name="Jane Smith"
            testimonial="Thanks to Faving, I've connected with amazing clients and grown my business exponentially."
          />
        </div>
      </section>

      <section className="text-center spacing-y-sm">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <Link to="/signup">
          <Button className="mt-6">Sign Up Now</Button>
        </Link>
      </section>
    </div>
  );
};

export default Index;