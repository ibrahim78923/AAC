import { useEffect, useRef, useState } from 'react';

const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(true);
  const [isScrollAvailable, setIsScrollAvailable] = useState(false);

  const containerRef = useRef<any>(null);

  const handleScroll = (scrollAmount: any) => {
    const newScrollPosition = scrollPosition + scrollAmount;
    setScrollPosition(newScrollPosition);
    containerRef?.current?.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const container = containerRef?.current;

    const checkScrollAvailability = () => {
      if (container) {
        setIsScrollAvailable(container.scrollWidth > container.clientWidth);
      }
    };
    checkScrollAvailability();

    if (container) {
      container.addEventListener('scroll', handleScrollEvent);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScrollEvent);
      }
    };
  }, []);
  const handleScrollEvent = () => {
    const container = containerRef?.current;
    if (container) {
      const maxScroll = container?.scrollWidth - container?.clientWidth;
      const currentScroll = container?.scrollLeft;

      if (currentScroll <= 0) {
        setIsLeftButtonDisabled(true);
      } else {
        setIsLeftButtonDisabled(false);
      }

      if (currentScroll >= maxScroll) {
        setIsRightButtonDisabled(true);
      } else {
        setIsRightButtonDisabled(false);
      }
    }
  };

  return {
    containerRef,
    handleScroll,
    isRightButtonDisabled,
    isLeftButtonDisabled,
    isScrollAvailable,
  };
};

export default useScroll;
