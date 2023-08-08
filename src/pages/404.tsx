// pages/404.tsx
import Link from 'next/link';
import Image from 'next/image';

const Custom404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-6">
          <Image src="/logo.png" alt="Logo" width={150} height={150} />
        </div>

        {/* 404 Text */}
        <h1 className="text-6xl font-bold text-gray-700">404</h1>

        {/* Helpful Message */}
        <p className="mt-4 text-gray-500">Oops! The page you're looking for does not exist.</p>

        {/* Back to Home Link */}
        <Link href="/">
          <span className="mt-6 text-blue-500 hover:underline cursor-pointer">Go back home</span>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
