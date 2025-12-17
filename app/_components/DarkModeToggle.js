'use client';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import { useTheme } from './ThemeProvider';

function DarkModeToggle() {
  const { theme, cycleTheme } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <FiSun size={20} />;
      case 'dark':
        return <FiMoon size={20} />;
      case 'system':
        return <FiMonitor size={20} />;
      default:
        return <FiSun size={20} />;
    }
  };

  const getTitle = () => {
    switch (theme) {
      case 'light':
        return 'Light mode (click for dark)';
      case 'dark':
        return 'Dark mode (click for system)';
      case 'system':
        return 'System mode (click for light)';
      default:
        return 'Toggle theme';
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
      title={getTitle()}
      aria-label={getTitle()}
    >
      {getIcon()}
    </button>
  );
}

export default DarkModeToggle;
