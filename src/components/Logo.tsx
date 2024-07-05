import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { useDarkMode } from '../utils/useDarkMode';

type Props = {
  slot?: 'end' | 'start';
  style?: CSSProperties;
};

export function Logo({ slot, style }: Props) {
  const { darkMode } = useDarkMode();

  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRotate(false);
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [rotate]);

  return (
    <span
      role="button"
      slot={slot}
      tabIndex={0}
      onClick={() => {
        setRotate(true);
      }}
      onKeyDown={() => {
        setRotate(true);
      }}
    >
      <img
        alt="Jobber logo"
        src={darkMode ? '/assets/jobber-dark.svg' : '/assets/jobber.svg'}
        style={{ height: '3rem', rotate: rotate ? '30deg' : undefined, transition: 'rotate 0.25s ease', ...style }}
      />
    </span>
  );
}
