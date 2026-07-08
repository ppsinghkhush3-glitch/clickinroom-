import { useState, useEffect, useCallback } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

const Gallery = () => {
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Hotel Data List
  const hotels = [
    {
      id: 1,
      name: 'Hotel Mezbaan, Kasauli',
      mainImage: '/hotel mezbaan/WhatsApp Image 2026-01-31 at 12.26.21.jpeg',
      gallery: [
        '/hotel mezbaan/436c0fb1-a443-409f-980f-9b88cff5ae44.jpeg',
        '/hotel mezbaan/948953f7-3d4a-4f71-a50a-63cf3fe6943c.jpeg',
        '/hotel mezbaan/436c0fb1-a443-409f-980f-9b88cff5ae44.jpeg',
        '/hotel mezbaan/WhatsApp Image 2026-01-31 at 12.26.22.jpeg',
        '/hotel mezbaan/WhatsApp Image 2026-01-31 at 12.26.23.jpeg',
        '/hotel mezbaan/WhatsApp Image 2026-01-31 at 12.26.24.jpeg',
        '/hotel mezbaan/WhatsApp Image 2026-01-31 at 12.26.27.jpeg',
        '/hotel mezbaan/WhatsApp Image 2026-01-31 at 12.26.28.jpeg',
        '/hotel mezbaan/WhatsApp Image 2026-01-31 at 12.26.29.jpeg',
        '/hotel mezbaan/WhatsApp Image 2026-01-31 at 12.26.31.jpeg',
        '/hotel mezbaan/WhatsApp Image 2026-01-31 at 12.26.32.jpeg',
      ],
    },
    {
      id: 2,
      name: 'Hotel Green Garden, Ludhiana',
      mainImage: '/Hotel Green Garden/14.jpg',
      gallery: [
        '/Hotel Green Garden/14.jpg',
        '/Hotel Green Garden/10.jpg',
        '/Hotel Green Garden/20 copy.jpg',
        '/Hotel Green Garden/20.jpg',
        '/Hotel Green Garden/29.jpg',
        '/Hotel Green Garden/45.jpg',
        '/Hotel Green Garden/9.jpg',
        '/Hotel Green Garden/de1.jpeg',
        '/Hotel Green Garden/de2.jpeg',
        '/Hotel Green Garden/de3.jpeg',
        '/Hotel Green Garden/de4.jpeg',
        '/Hotel Green Garden/image copy copy.png',
        '/Hotel Green Garden/image copy.png',
        '/Hotel Green Garden/image.png',
        '/Hotel Green Garden/nr (202).jpeg',
        '/Hotel Green Garden/nr (204).jpeg',
        '/Hotel Green Garden/nr1 (201).jpeg',
        '/Hotel Green Garden/standard2.png',
      ],
    },
    {
      id: 3,
      name: 'The Luxury Stays by Glambirds, Kasauli',
      mainImage: '/varun kasuali/6-min-scaled-1000x667.jpg',
      gallery: [
        '/varun kasuali/10-min-scaled-1000x667.jpg',
        '/varun kasuali/12-min-scaled-1000x667.jpeg',
        '/varun kasuali/13-min-scaled-1000x667.jpg',
        '/varun kasuali/15-min-scaled-1000x667.jpg',
        '/varun kasuali/18-min-scaled-1000x667.jpg',
        '/varun kasuali/10-min-scaled-1000x667.jpg',
        '/varun kasuali/2-min-scaled-1000x667.jpg',
        '/varun kasuali/21-min-scaled-1000x667.jpg',
        '/varun kasuali/19-min-scaled-1000x667.jpg',
        '/varun kasuali/7-min-scaled-1000x667.jpg',
        '/varun kasuali/8-min-scaled-1000x667.jpg',
        '/varun kasuali/9-min-scaled-1000x667.jpg',
        '/varun kasuali/varun kasualli.jpg',
      ],
    },
    {
      id: 4,
      name: 'Family Suite Apartment, Solan',
      mainImage: '/family/f1.jpeg',
      gallery: [
        '/family/f1.jpeg',
        '/family/f10.jpg',
        '/family/f11.jpg',
        '/family/f2.jpeg',
        '/family/f3.jpeg',
        '/family/f4.jpeg',
        '/family/f5.jpeg',
        '/family/f6.jpeg',
        '/family/f7.jpeg',
        '/family/f8.jpeg',
        '/family/f9.jpeg',
      ],
    },
    {
      id: 5,
      name: 'Nirvana Luxury Stage, Solan',
      mainImage: '/nirvana/n1.jpeg',
      gallery: [
        '/nirvana/n1.jpeg',
        '/nirvana/n10.jpeg',
        '/nirvana/n2.jpeg',
        '/nirvana/n3.jpeg',
        '/nirvana/n4.jpeg',
        '/nirvana/n5.jpeg',
        '/nirvana/n6.jpeg',
        '/nirvana/n7.jpeg',
        '/nirvana/n8.jpeg',
        '/nirvana/n9.jpg',
      ],
    },
    {
      id: 6,
      name: 'Luxury Stay Paradise, Solan',
      mainImage: '/paradise/p1.jpeg',
      gallery: [
        '/paradise/p1.jpeg',
        '/paradise/p10.jpg',
        '/paradise/p2.jpeg',
        '/paradise/p3.jpeg',
        '/paradise/p4.jpeg',
        '/paradise/p5.jpeg',
        '/paradise/p6.jpeg',
        '/paradise/p7.jpeg',
        '/paradise/p8.jpeg',
        '/paradise/p9.jpeg',
      ],
    },
  ];

  const openLightbox = (hotel: any) => {
    setSelectedHotel(hotel);
    setCurrentImageIndex(0);
    setImageLoaded(false);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setSelectedHotel(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = '';
  }, []);

  const goToNext = useCallback(() => {
    if (!selectedHotel) return;
    setImageLoaded(false);
    const totalImages = selectedHotel.gallery.length;
    setCurrentImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  }, [selectedHotel]);

  const goToPrevious = useCallback(() => {
    if (!selectedHotel) return;
    setImageLoaded(false);
    const totalImages = selectedHotel.gallery.length;
    setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  }, [selectedHotel]);

  // Touch/swipe support for lightbox
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) goToNext();
    if (touchEnd - touchStart > 75) goToPrevious();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedHotel) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedHotel, closeLightbox, goToNext, goToPrevious]);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-800"></div>
      
      <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl animate-float"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 reveal">
            <span className="px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-sm font-semibold">
              Our Properties
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 reveal" style={{ transitionDelay: '0.1s' }}>
            <span className="text-gradient">Explore Our</span>
            <br />
            <span className="text-white">Clients Hotels</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto reveal" style={{ transitionDelay: '0.15s' }}>
            Select a property to view the full gallery
          </p>
        </div>

        {/* Hotel List Grid */}
        <div className="reveal-stagger reveal" style={{ transitionDelay: '0.2s' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="group relative overflow-hidden rounded-2xl shadow-xl shadow-black/30 cursor-pointer h-[400px]"
                onClick={() => openLightbox(hotel)}
              >
                <img
                  src={encodeURI(hotel.mainImage)}
                  alt={hotel.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-2 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-white text-2xl font-bold mb-2 drop-shadow-lg">{hotel.name}</h3>
                  <div className="flex items-center text-yellow-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ZoomIn className="w-4 h-4 mr-2" />
                    <span>View Gallery ({hotel.gallery.length} Photos)</span>
                  </div>
                </div>
                
                {/* Image count badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                  <ImageIcon className="w-3 h-3 inline mr-1" />
                  {hotel.gallery.length}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedHotel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-fade-in"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all z-50 hover:scale-110 active:scale-95"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous button */}
          <button
            className="absolute left-2 md:left-8 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all z-50 hover:scale-110 active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Next button */}
          <button
            className="absolute right-2 md:right-8 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all z-50 hover:scale-110 active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {/* Loading spinner */}
            {!imageLoaded && (
              <div className="w-16 h-16 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin mb-4"></div>
            )}
            
            {/* Image with crossfade */}
            <img
              key={selectedHotel.gallery[currentImageIndex]}
              src={encodeURI(selectedHotel.gallery[currentImageIndex])}
              alt={`${selectedHotel.name} - Photo ${currentImageIndex + 1}`}
              className={`max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl shadow-black/50 transition-all duration-500 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Bottom info bar */}
            <div className="mt-6 flex flex-col md:flex-row items-center justify-between w-full gap-2">
              <h3 className="text-white text-lg font-semibold">{selectedHotel.name}</h3>
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 text-sm">
                  {currentImageIndex + 1} / {selectedHotel.gallery.length}
                </span>
                {/* Dots navigation */}
                <div className="flex items-center space-x-1.5">
                  {selectedHotel.gallery.slice(0, Math.min(selectedHotel.gallery.length, 7)).map((_: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setImageLoaded(false);
                        setCurrentImageIndex(idx);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentImageIndex
                          ? 'bg-yellow-400 w-6'
                          : 'bg-gray-600 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                  {selectedHotel.gallery.length > 7 && (
                    <span className="text-gray-500 text-xs ml-1">+{selectedHotel.gallery.length - 7}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
