'use client';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import { useTheme } from './ThemeProvider';

function DarkModeToggle() {
  const { theme, cycleTheme } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <FiSun size={16} />;
      case 'dark':
        return <FiMoon size={16} />;
      case 'system':
        return <FiMonitor size={16} />;
      default:
        return <FiSun size={16} />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'Auto';
      default:
        return 'Light';
    }
  };

  const getTitle = () => {
    switch (theme) {
      case 'light':
        return 'Light mode (click for dark)';
      case 'dark':
        return 'Dark mode (click for auto)';
      case 'system':
        return 'Auto mode (click for light)';
      default:
        return 'Toggle theme';
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className='flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium'
      title={getTitle()}
      aria-label={getTitle()}
    >
      {getIcon()}
      <span className='hidden sm:inline'>{getLabel()}</span>
    </button>
  );
}

export default DarkModeToggle;
