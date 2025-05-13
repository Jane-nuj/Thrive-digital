import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({ className = '', width = 180, height = 40 }: LogoProps) {
  return (
    <div>
      <Image 
        src="/images/thriveHeader logo.png"
        alt="Thrive Digital Logo"
        width={width}
        height={40}
        className={`${className} block`}
        priority
      />
    </div>
  );
}
