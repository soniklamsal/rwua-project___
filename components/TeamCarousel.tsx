'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Emily Kim",
    role: "Founder",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o1.jpeg?updatedAt=1754289569411"
  },
  {
    name: "Michael Chen",
    role: "Creative Director",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o2.jpeg?updatedAt=1754289569307"
  },
  {
    name: "Sarah Johnson",
    role: "Lead Developer",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o4.jpeg?updatedAt=1754289569398"
  },
  {
    name: "David Wilson",
    role: "UX Designer",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o3.jpeg?updatedAt=1754289569422"
  },
  {
    name: "Lisa Rodriguez",
    role: "Marketing Manager",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o5.jpeg?updatedAt=1754289569406"
  },
  {
    name: "James Park",
    role: "Product Manager",
    image: "https://ik.imagekit.io/gopichakradhar/luffy/o6.jpeg?updatedAt=1754289569438"
  }
];

export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const updateCarousel = useCallback((newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((newIndex + teamMembers.length) % teamMembers.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  }, [isAnimating]);

  const handlePrevious = useCallback(() => {
    updateCarousel(currentIndex - 1);
  }, [currentIndex, updateCarousel]);

  const handleNext = useCallback(() => {
    updateCarousel(currentIndex + 1);
  }, [currentIndex, updateCarousel]);

  const handleDotClick = useCallback((index: number) => {
    updateCarousel(index);
  }, [updateCarousel]);

  const handleCardClick = useCallback((index: number) => {
    updateCarousel(index);
  }, [updateCarousel]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        handlePrevious();
      } else if (e.key === 'ArrowDown') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext]);

  const getCardClass = (index: number) => {
    const offset = (index - currentIndex + teamMembers.length) % teamMembers.length;

    if (offset === 0) return 'center';
    if (offset === 1) return 'down-1';
    if (offset === 2) return 'down-2';
    if (offset === teamMembers.length - 1) return 'up-1';
    if (offset === teamMembers.length - 2) return 'up-2';
    return 'hidden';
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        gap: '60px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        {/* Carousel Section */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '400px',
            height: '400px',
            position: 'relative',
            perspective: '1000px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div style={{
              width: '350px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}>
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`card ${getCardClass(index)}`}
                  onClick={() => handleCardClick(index)}
                  style={{
                    position: 'absolute',
                    width: '300px',
                    height: '180px',
                    background: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    cursor: 'pointer'
                  }}
                >
                  <Image
                    src={member.image}
                    alt={`Team Member ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          paddingLeft: '40px'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '30px',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <button
              onClick={handlePrevious}
              style={{
                position: 'relative',
                background: 'transparent',
                color: 'white',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20,
                transition: 'all 0.3s ease',
                fontSize: '1.5rem',
                border: 'none',
                outline: 'none',
                margin: 0,
                padding: 0,
                overflow: 'visible',
                boxShadow: 'none'
              }}
            >
              <Image
                src="https://ik.imagekit.io/gopichakradhar/icons/top.png?updatedAt=1754290522765"
                alt="Up"
                width={60}
                height={60}
              />
            </button>
            <button
              onClick={handleNext}
              style={{
                position: 'relative',
                background: 'transparent',
                color: 'white',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20,
                transition: 'all 0.3s ease',
                fontSize: '1.5rem',
                border: 'none',
                outline: 'none',
                margin: 0,
                padding: 0,
                overflow: 'visible',
                boxShadow: 'none'
              }}
            >
              <Image
                src="https://ik.imagekit.io/gopichakradhar/icons/down.png?updatedAt=1754290523249"
                alt="Down"
                width={60}
                height={60}
              />
            </button>
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '20px',
            transition: 'all 0.5s ease-out'
          }}>
            <h2 style={{
              color: 'rgb(8, 42, 123)',
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '8px',
              position: 'relative',
              display: 'inline-block'
            }}>
              {teamMembers[currentIndex].name}
            </h2>
            <p style={{
              color: '#848696',
              fontSize: '1.2rem',
              fontWeight: 500,
              opacity: 0.8,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '5px 0',
              marginTop: '-10px',
              position: 'relative'
            }}>
              {teamMembers[currentIndex].role}
            </p>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '30px'
          }}>
            {teamMembers.map((_, index) => (
              <div
                key={index}
                onClick={() => handleDotClick(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: index === currentIndex ? 'rgb(8, 42, 123)' : 'rgba(8, 42, 123, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .card.center {
          z-index: 10;
          transform: scale(1.1) translateZ(0);
        }

        .card.up-2 {
          z-index: 1;
          transform: translateY(-200px) scale(0.8) translateZ(-300px);
          opacity: 0.7;
        }

        .card.up-2 img {
          filter: grayscale(100%);
        }

        .card.up-1 {
          z-index: 5;
          transform: translateY(-100px) scale(0.9) translateZ(-100px);
          opacity: 0.9;
        }

        .card.up-1 img {
          filter: grayscale(100%);
        }

        .card.down-1 {
          z-index: 5;
          transform: translateY(100px) scale(0.9) translateZ(-100px);
          opacity: 0.9;
        }

        .card.down-1 img {
          filter: grayscale(100%);
        }

        .card.down-2 {
          z-index: 1;
          transform: translateY(200px) scale(0.8) translateZ(-300px);
          opacity: 0.7;
        }

        .card.down-2 img {
          filter: grayscale(100%);
        }

        .card.hidden {
          opacity: 0;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          /* Mobile styles would go here */
        }
      `}</style>
    </div>
  );
}