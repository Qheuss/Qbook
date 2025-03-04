import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Modal.module.scss';
import { MdClose, MdZoomIn, MdZoomOut } from 'react-icons/md';
import { useAppSelector } from '../redux/hooks';

interface ModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
}

const Modal = ({ isOpen, imageSrc, onClose }: ModalProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const theme = useAppSelector((state) => state.theme.theme);

  // Update container size on mount and window resize
  useEffect(() => {
    const updateSizes = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    // Initialize
    updateSizes();

    // Add resize listener
    window.addEventListener('resize', updateSizes);

    // Clean up
    return () => window.removeEventListener('resize', updateSizes);
  }, [isOpen]);

  // Handle image load
  const handleImageLoad = () => {
    if (imageRef.current && containerRef.current) {
      // Get natural dimensions
      const imgWidth = imageRef.current.naturalWidth;
      const imgHeight = imageRef.current.naturalHeight;

      // Get container dimensions
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      // Calculate the dimensions the image will have when fitted
      let displayWidth, displayHeight;

      const aspectRatio = imgWidth / imgHeight;
      const containerRatio = containerWidth / containerHeight;

      if (aspectRatio > containerRatio) {
        // Image is wider than container (relative to height)
        displayWidth = containerWidth;
        displayHeight = containerWidth / aspectRatio;
      } else {
        // Image is taller than container (relative to width)
        displayHeight = containerHeight;
        displayWidth = containerHeight * aspectRatio;
      }

      setImageSize({
        width: displayWidth,
        height: displayHeight,
      });

      setContainerSize({
        width: containerWidth,
        height: containerHeight,
      });
    }
  };

  // Main function to calculate bounds
  const getBoundedPosition = useCallback(
    (x: number, y: number) => {
      if (scale <= 1) return { x: 0, y: 0 };

      // Calculate the scaled dimensions
      const scaledWidth = imageSize.width * scale;
      const scaledHeight = imageSize.height * scale;

      // Calculate the maximum allowed movement in each direction
      const xLimit = Math.max(0, (scaledWidth - containerSize.width) / 2);
      const yLimit = Math.max(0, (scaledHeight - containerSize.height) / 2);

      // Enforce the limits
      return {
        x: Math.min(xLimit, Math.max(-xLimit, x)),
        y: Math.min(yLimit, Math.max(-yLimit, y)),
      };
    },
    [
      containerSize.height,
      containerSize.width,
      imageSize.height,
      imageSize.width,
      scale,
    ]
  );

  // Reset position when scale changes or when returning to scale 1
  useEffect(() => {
    if (scale === 1) {
      setPosition({ x: 0, y: 0 });
    } else {
      // Ensure position is within bounds when scale changes
      const boundedPosition = getBoundedPosition(position.x, position.y);
      if (
        boundedPosition.x !== position.x ||
        boundedPosition.y !== position.y
      ) {
        setPosition(boundedPosition);
      }
    }
  }, [getBoundedPosition, position.x, position.y, scale]);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.5, 5));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.5, 1));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      // Calculate new unbounded position
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Apply bounds and update state
      const boundedPosition = getBoundedPosition(newX, newY);
      setPosition(boundedPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Prevent wheel scrolling when zoomed in
  const handleWheel = (e: React.WheelEvent) => {
    if (scale > 1) {
      e.preventDefault();

      // Calculate new position based on wheel delta
      const newX = position.x;
      const newY = position.y - e.deltaY;

      // Apply bounds and update
      const boundedPosition = getBoundedPosition(newX, newY);
      setPosition(boundedPosition);
    }
  };

  return (
    <div className={styles.modal} onClick={onClose} aria-modal='true'>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={styles.modal__imageContainer}
          ref={containerRef}
          onWheel={handleWheel}
        >
          <div
            className={styles.modal__imageWrapper}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={imageSrc}
              alt='Modal content'
              style={{
                transform: `scale(${scale}) translate(${
                  position.x / scale
                }px, ${position.y / scale}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                cursor: isDragging
                  ? 'grabbing'
                  : scale > 1
                  ? 'grab'
                  : 'default',
              }}
              draggable='false'
              onLoad={handleImageLoad}
            />
          </div>
        </div>
        <div
          className={
            styles.modal__controls +
            ' border-t' +
            (theme === 'dark'
              ? ' bg-searchDark text-fontDarker border-iconsDark'
              : ' bg-searchLight text-fontLighter border-iconsLight')
          }
        >
          <button
            onClick={handleZoomOut}
            className={
              styles.modal__zoomButton +
              '  border' +
              (theme === 'dark'
                ? ' border-iconsDark hover:bg-[#3f3f40]'
                : ' border-iconsLight hover:bg-[#eee]')
            }
            disabled={scale === 1}
          >
            <MdZoomOut />
          </button>
          <button
            onClick={handleZoomIn}
            className={
              styles.modal__zoomButton +
              '  border' +
              (theme === 'dark'
                ? ' hover:bg-[#3f3f40] border-iconsDark'
                : ' hover:bg-[#eee] border-iconsLight')
            }
          >
            <MdZoomIn />
          </button>
          <button
            onClick={handleReset}
            className={
              styles.modal__resetButton +
              '  border' +
              (theme === 'dark'
                ? ' hover:bg-[#3f3f40] border-iconsDark'
                : ' hover:bg-[#eee] border-iconsLight')
            }
            disabled={scale === 1 && position.x === 0 && position.y === 0}
          >
            Reset
          </button>
          <button
            className={
              styles.modal__close +
              '  border' +
              (theme === 'dark'
                ? ' hover:bg-[#3f3f40] border-iconsDark'
                : ' hover:bg-[#eee] border-iconsLight')
            }
            onClick={onClose}
          >
            <MdClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
