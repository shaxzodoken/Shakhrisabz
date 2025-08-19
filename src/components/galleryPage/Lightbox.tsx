import { component$, useSignal, $, useVisibleTask$, useOnWindow } from '@builder.io/qwik';

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export default component$<LightboxProps>(({ images, initialIndex = 0, onClose }) => {
  const currentIndex = useSignal(initialIndex);
  const isZoomed = useSignal(false);
  const zoomLevel = useSignal(1);
  const isFullscreen = useSignal(false);

  const nextImage = $(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
    resetZoom();
  });

  const prevImage = $(() => {
    currentIndex.value = currentIndex.value === 0 ? images.length - 1 : currentIndex.value - 1;
    resetZoom();
  });

  const resetZoom = $(() => {
    isZoomed.value = false;
    zoomLevel.value = 1;
  });

  const zoomIn = $(() => {
    if (zoomLevel.value < 3) {
      zoomLevel.value += 0.5;
      isZoomed.value = true;
    }
  });

  const zoomOut = $(() => {
    if (zoomLevel.value > 0.5) {
      zoomLevel.value -= 0.5;
      if (zoomLevel.value === 1) {
        isZoomed.value = false;
      }
    }
  });

  const toggleFullscreen = $(() => {
    isFullscreen.value = !isFullscreen.value;
  });

  // Keyboard controls
  useOnWindow(
    'keydown',
    $((event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case '+':
        case '=':
          zoomIn();
          break;
        case '-':
          zoomOut();
          break;
        case 'f':
          toggleFullscreen();
          break;
        case '0':
          resetZoom();
          break;
      }
    })
  );

  // Prevent body scroll when lightbox is open
  useVisibleTask$(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  });

  return (
    <div class={`fixed inset-0 z-50 bg-black/90 backdrop-blur-sm ${isFullscreen.value ? 'fullscreen' : ''}`}>
      {/* Header Controls */}
      <div class="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button
            onClick$={onClose}
            class="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200"
            title="Close (Esc)"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <span class="text-white text-sm">
            {currentIndex.value + 1} / {images.length}
          </span>
        </div>

        <div class="flex items-center space-x-2">
          <button
            onClick$={zoomOut}
            class="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200"
            title="Zoom Out (-)"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
            </svg>
          </button>
          
          <span class="text-white text-sm min-w-[3rem] text-center">
            {Math.round(zoomLevel.value * 100)}%
          </span>
          
          <button
            onClick$={zoomIn}
            class="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200"
            title="Zoom In (+)"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
          
          <button
            onClick$={resetZoom}
            class="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200"
            title="Reset Zoom (0)"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
            </svg>
          </button>
          
          <button
            onClick$={toggleFullscreen}
            class="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen.value ? (
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Main Image */}
      <div class="flex items-center justify-center h-full p-4">
        <div class="relative max-w-full max-h-full">
          <img
            src={images[currentIndex.value]}
            alt={`Image ${currentIndex.value + 1}`}
            class={`max-w-full max-h-full object-contain transition-all duration-300 ${
              isZoomed.value ? 'cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            style={{
              transform: `scale(${zoomLevel.value})`,
              transformOrigin: 'center'
            }}
            onClick$={() => {
              if (isZoomed.value) {
                resetZoom();
              } else {
                zoomIn();
              }
            }}
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick$={prevImage}
        class="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200"
        title="Previous (←)"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      
      <button
        onClick$={nextImage}
        class="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200"
        title="Next (→)"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

      {/* Thumbnail Navigation */}
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div class="flex space-x-2 bg-black/50 backdrop-blur-sm rounded-lg p-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick$={() => {
                currentIndex.value = index;
                resetZoom();
              }}
              class={`w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                index === currentIndex.value
                  ? 'ring-2 ring-yellow-400 scale-110'
                  : 'hover:scale-105'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                class="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div class="absolute bottom-4 right-4 text-white text-xs opacity-60">
        <div>Esc: Close</div>
        <div>← →: Navigate</div>
        <div>+ -: Zoom</div>
        <div>F: Fullscreen</div>
        <div>0: Reset</div>
      </div>
    </div>
  );
});
