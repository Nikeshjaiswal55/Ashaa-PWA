import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

('use client');

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as 'light' | 'dark' | 'system'}
      toastOptions={{
        classNames: {
          toast: 'bg-[#005B24] text-white border border-white shadow-lg rounded-md font-medium',
          description: 'text-white/80 text-sm',
          actionButton: 'bg-white text-[#005B24] hover:bg-gray-100 font-semibold',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
