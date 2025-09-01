export default function TriangleDecoration({ 
  className = "", 
  color = "primary",
  opacity = 0.05,
  size = "large" 
}: { 
  className?: string; 
  color?: "primary" | "secondary" | "accent";
  opacity?: number;
  size?: "small" | "medium" | "large";
}) {
  const colorClasses = {
    primary: "#003082",
    secondary: "#a62842",
    accent: "#fbec5a"
  };

  const sizeClasses = {
    small: { width: 200, height: 200 },
    medium: { width: 400, height: 400 },
    large: { width: 600, height: 600 }
  };

  const { width, height } = sizeClasses[size];

  return (
    <svg
      className={`absolute ${className}`}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <path
        d={`M0 0L${width} 0L${width / 2} ${height}Z`}
        fill={colorClasses[color]}
      />
    </svg>
  );
}