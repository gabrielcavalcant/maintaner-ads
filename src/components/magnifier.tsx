// Import dependencies
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  initialZoomFactor?: number; // Renomeado para indicar que é o valor inicial
  magSize?: number;
  width?: number; // Adicionada prop para largura da imagem
  height?: number; // Adicionada prop para altura da imagem
  className?: string;
};

// ImageEffect component
export default function Magnifier({
  src,
  initialZoomFactor = 2,
  magSize = 150,
  width, // Largura opcional
  height, // Altura opcional
  className,
}: Readonly<Props>) {
  const [zoomable, setZoomable] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({
    x: 100,
    y: 100,
    mouseX: 0,
    mouseY: 0,
  });
  const [zoomFactor, setZoomFactor] = useState(initialZoomFactor);
  const [isLocked, setIsLocked] = useState(false); // Estado para controlar a trava da lupa
  const scrollRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    const disableScroll = (e: WheelEvent) => {
      e.preventDefault();
    };

    if (scrollElement) {
      scrollElement.addEventListener("wheel", disableScroll, {
        passive: false,
      });
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("wheel", disableScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      const { naturalWidth, naturalHeight } = imageRef.current;
      const aspectRatio = naturalHeight / naturalWidth;

      if (width && height) {
        setImageSize({ width, height });
      } else if (width) {
        setImageSize({ width, height: width * aspectRatio });
      } else if (height) {
        setImageSize({ width: height / aspectRatio, height });
      } else {
        setImageSize({ width: naturalWidth, height: naturalHeight });
      }
    }
  }, [width, height]);

  const handleMouseEnter = (e: MouseEvent) => {
    if (!isLocked) {
      // Atualiza apenas se a lupa não estiver travada
      let element = e.currentTarget;
      let { width, height } = element.getBoundingClientRect();
      setImageSize({ width, height });
      setZoomable(true);
      updatePosition(e);
    }
  };

  const handleMouseLeave = (e: MouseEvent) => {
    if (!isLocked) {
      // Atualiza apenas se a lupa não estiver travada
      setZoomable(false);
      updatePosition(e);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isLocked) {
      // Atualiza apenas se a lupa não estiver travada
      updatePosition(e);
    }
  };

  const handleMouseClick = (e: MouseEvent) => {
    if (e.button === 0) {
      // Verifica se o clique foi com o botão esquerdo
      setIsLocked(!isLocked); // Alterna o estado de trava da lupa
    }
  };

  const updatePosition = (e: MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - left;
    let y = e.clientY - top;
    setPosition({
      x: -x * zoomFactor + magSize / 2,
      y: -y * zoomFactor + magSize / 2,
      mouseX: x - magSize / 2,
      mouseY: y - magSize / 2,
    });
  };

  const handleWheel = (e: any) => {
    // Evita o scroll padrão da página
    e.preventDefault();
    // Ajusta o zoomFactor, aumentando se o scroll é para cima, diminuindo se para baixo
    setZoomFactor(prevZoomFactor => {
      let newZoomFactor = prevZoomFactor + e.deltaY * -0.005; // Ajuste conforme necessário
      // Limita o zoomFactor para evitar valores negativos ou muito altos
      return Math.min(Math.max(newZoomFactor, 2), 5); // Ajuste os limites conforme necessário
    });
  };

  // Render method
  return (
    <div className={`flex items-center justify-center`} ref={scrollRef}>
      <button
        onClick={handleMouseClick} // Adiciona o manipulador de evento de clique
        onWheel={handleWheel} // Adiciona o manipulador de evento wheel
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        className="relative overflow-hidden"
        style={{ width: imageSize.width, height: imageSize.height }}
      >
        <Image
          draggable={false}
          className={
            className +
            `z-10 select-none border object-cover ${
              isLocked ? "cursor-pointer" : "cursor-none"
            } `
          }
          alt=""
          src={src}
          layout="fill"
          ref={imageRef}
          onLoad={() => {
            if (imageRef.current) {
              const { naturalWidth, naturalHeight } = imageRef.current;
              const aspectRatio = naturalHeight / naturalWidth;

              if (width && height) {
                setImageSize({ width, height });
              } else if (width) {
                setImageSize({ width, height: width * aspectRatio });
              } else if (height) {
                setImageSize({ width: height / aspectRatio, height });
              } else {
                setImageSize({ width: naturalWidth, height: naturalHeight });
              }
            }
          }}
        />
        <div
          style={{
            backgroundPosition: `${position.x}px ${position.y}px`,
            backgroundImage: `url(${src})`,
            backgroundSize: `${imageSize.width * zoomFactor}px ${
              imageSize.height * zoomFactor
            }px`,
            backgroundRepeat: "no-repeat",
            display: zoomable ? "block" : "none",
            top: `${position.mouseY}px`,
            left: `${position.mouseX}px`,
            width: `${magSize}px`,
            height: `${magSize}px`,
          }}
          className={`z-50 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] ${
            !isLocked
              ? "border-[1.5px] border-gray-400"
              : "border-[2px] border-primary transition-all"
          } pointer-events-none absolute rounded`}
        >
          <p className="absolute right-0 top-[-20px] text-black">
            {zoomFactor.toFixed(2)}x
          </p>
        </div>
      </button>
    </div>
  );
}
