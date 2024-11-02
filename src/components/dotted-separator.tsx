import { cn } from "@/lib/utils";

type DottedSeparatorProps = {
  className?: string;
  color?: string;
  height?: string;
  dotSize?: string;
  gapSize?: string;
  direction?: "horizontal" | "vertical";
};

/**
 * Componente `DottedSeparator` - Renderiza um separador pontilhado com direção horizontal ou vertical.
 *
 * @param {string} [className] - Classes CSS adicionais para estilização personalizada.
 * @param {string} [color="#E5E5E5"] - Cor dos pontos, valor padrão é `#E5E5E5`.
 * @param {string} [height="2px"] - Altura da linha pontilhada, valor padrão é `2px`.
 * @param {string} [dotSize="2px"] - Tamanho dos pontos, valor padrão é `2px`.
 * @param {string} [gapSize="6px"] - Espaçamento entre os pontos, valor padrão é `6px`.
 * @param {"horizontal" | "vertical"} [direction="horizontal"] - Direção do separador, pode ser `"horizontal"` ou `"vertical"`.
 *
 * @returns {JSX.Element} - O componente `DottedSeparator` renderizado.
 *
 * @example
 * // Exemplo de uso horizontal padrão:
 * <DottedSeparator />
 *
 * @example
 * // Exemplo de uso com configuração vertical e cor personalizada:
 * <DottedSeparator
 *   color="#FF0000"
 *   height="4px"
 *   dotSize="4px"
 *   gapSize="8px"
 *   direction="vertical"
 * />
 */
export const DottedSeparator = ({
  className,
  color = "#E5E5E5",
  height = "2px",
  dotSize = "2px",
  gapSize = "6px",
  direction = "horizontal",
}: DottedSeparatorProps) => {
  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={cn(
        isHorizontal
          ? "w-full flex items-center"
          : "h-full flex flex-col items-center",
        className
      )}
    >
      <div
        className={isHorizontal ? "flex-grow" : "flex-grow-0"}
        style={{
          width: isHorizontal ? "100%" : height,
          height: isHorizontal ? height : "100%",
          backgroundImage: `radial-gradient(circle, ${color} 25%, transparent 25%)`,
          backgroundSize: isHorizontal
            ? `${parseInt(dotSize) + parseInt(gapSize)}px ${height}`
            : `${height} ${parseInt(dotSize) + parseInt(gapSize)}px`,
          backgroundRepeat: isHorizontal ? "repeat-x" : "repeat-y",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};
