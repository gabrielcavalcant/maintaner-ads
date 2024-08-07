import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type useColorProps = {
  variable: string;
};

export default function useColor({ variable }: useColorProps) {
  const { theme } = useTheme();
  const [primaryColor, setPrimaryColor] = useState(
    getComputedStyle(document.documentElement).getPropertyValue(`--${variable}`)
  );

  useEffect(() => {
    const updateColor = () => {
      if (theme) {
        const color = getComputedStyle(
          document.documentElement
        ).getPropertyValue(`--${variable}`);
        setPrimaryColor(color);
      } else {
        setPrimaryColor("229 100% 62%");
      }
    };

    // Adiciona um pequeno atraso para garantir que a mudança de tema seja aplicada
    const timeoutId = setTimeout(updateColor, 100);

    return () => clearTimeout(timeoutId);
  }, [theme, variable]);

  return primaryColor;
}
