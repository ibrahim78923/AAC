import { useEffect, useRef, useState } from 'react';

const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<any>(null);
  const handleScroll = (scrollAmount: any) => {
    const newScrollPosition = scrollPosition + scrollAmount;
    setScrollPosition(newScrollPosition);
    containerRef?.current?.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  };
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(true);
  useEffect(() => {
    const container = containerRef?.current;
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
  };
};

export default useScroll;
