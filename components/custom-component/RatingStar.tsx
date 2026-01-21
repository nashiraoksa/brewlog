import { Star } from "lucide-react";

interface RatingStarProps {
  value: number;
  size?: number;
  className?: string;
}

export function RatingStar({
  value,
  size = 18,
  className = "text-primary",
}: RatingStarProps) {
  const percentage = Math.max(0, Math.min(value / 10, 1)) * 100;
  const gradientId = `star-gradient-${percentage}`;

  return (
    <svg width={size} height={size} viewBox="0 0 18 18" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset={`${percentage}%`} stopColor="currentColor" />
          <stop offset={`${percentage}%`} stopColor="transparent" />
        </linearGradient>
      </defs>

      <Star
        stroke="currentColor"
        fill={`url(#${gradientId})`}
        width={size}
        height={size}
      />
    </svg>
  );
}
