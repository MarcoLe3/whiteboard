export function MousePosition(e: React.MouseEvent<HTMLCanvasElement>) {
  const canvas = e.currentTarget;
  const rect = canvas.getBoundingClientRect();

  const displayX = e.clientX - rect.left;
  const displayY = e.clientY - rect.top;

  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: displayX * scaleX,
    y: displayY * scaleY,
  };
};