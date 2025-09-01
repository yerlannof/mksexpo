export default function StudentIllustration() {
  return (
    <svg viewBox="0 0 400 500" className="w-full h-full max-w-[400px]">
      {/* Background circle */}
      <circle cx="200" cy="250" r="180" fill="#E6EEFB" opacity="0.5" />
      
      {/* Hair back */}
      <path
        d="M200 80 Q120 90 100 150 Q100 200 120 220 L120 250 Q150 260 200 260 Q250 260 280 250 L280 220 Q300 200 300 150 Q280 90 200 80"
        fill="#2C3E50"
      />
      
      {/* Face */}
      <ellipse cx="200" cy="160" rx="65" ry="75" fill="#FDBCB4" />
      
      {/* Hair front */}
      <path
        d="M200 80 Q150 85 130 110 Q125 125 135 130 Q150 120 200 115 Q250 120 265 130 Q275 125 270 110 Q250 85 200 80"
        fill="#2C3E50"
      />
      
      {/* Eyes */}
      <circle cx="175" cy="155" r="4" fill="#2C3E50" />
      <circle cx="225" cy="155" r="4" fill="#2C3E50" />
      
      {/* Glasses */}
      <g fill="none" stroke="#2C3E50" strokeWidth="3">
        <circle cx="175" cy="155" r="20" />
        <circle cx="225" cy="155" r="20" />
        <path d="M195 155 L205 155" />
        <path d="M155 155 L140 150" />
        <path d="M245 155 L260 150" />
      </g>
      
      {/* Smile */}
      <path
        d="M185 175 Q200 185 215 175"
        fill="none"
        stroke="#2C3E50"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Body */}
      <path
        d="M150 230 Q200 220 250 230 L260 380 Q200 390 140 380 Z"
        fill="#8E7CC3"
      />
      
      {/* Collar */}
      <path
        d="M150 230 Q200 240 250 230 L240 260 Q200 250 160 260 Z"
        fill="#5B4B8A"
      />
      
      {/* Arms */}
      <path
        d="M150 270 Q120 290 110 320 Q105 340 115 345 Q125 340 130 320 Q135 300 150 290"
        fill="#FDBCB4"
      />
      <path
        d="M250 270 Q280 290 290 320 Q295 340 285 345 Q275 340 270 320 Q265 300 250 290"
        fill="#FDBCB4"
      />
      
      {/* Books */}
      <rect x="160" y="320" width="80" height="15" rx="2" fill="#4A90E2" />
      <rect x="160" y="338" width="80" height="15" rx="2" fill="#50C878" />
      <rect x="160" y="356" width="80" height="15" rx="2" fill="#FF6B6B" />
      
      {/* Book details */}
      <rect x="165" y="324" width="70" height="7" rx="1" fill="#3A7BC8" />
      <rect x="165" y="342" width="70" height="7" rx="1" fill="#3BA55D" />
      <rect x="165" y="360" width="70" height="7" rx="1" fill="#E85353" />
    </svg>
  );
}