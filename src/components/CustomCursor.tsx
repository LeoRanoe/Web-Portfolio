import React from 'react';
import styled from 'styled-components';

type CursorType = 'default' | 'hover' | 'click';

const CursorContainer = styled.div<{ type: CursorType }>`
  width: 20px;
  height: 20px;
  border: 2px solid #00ff00;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: transform 0.1s ease;
  mix-blend-mode: difference;
  transform: ${props => props.type === 'click' ? 'scale(0.8)' : props.type === 'hover' ? 'scale(1.2)' : 'scale(1)'};
`;

const CustomCursor: React.FC = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = React.useState<CursorType>('default');

  React.useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setCursorType('click');
    const handleMouseUp = () => setCursorType('default');
    const handleMouseEnter = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a, input')) {
        setCursorType('hover');
      }
    };
    const handleMouseLeave = () => setCursorType('default');

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <CursorContainer
      type={cursorType}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) ${cursorType === 'click' ? 'scale(0.8)' : cursorType === 'hover' ? 'scale(1.2)' : 'scale(1)'}`,
      }}
    />
  );
};

export default CustomCursor; 