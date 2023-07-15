import React from "react";

export default function useMeasureTextHeight(e: React.SyntheticEvent): number {
  const target = e.target as HTMLTextAreaElement;
  const text = target.value;

  const span = document.createElement("span");
  span.style.visibility = "hidden";
  span.style.whiteSpace = "pre-wrap"; // Preserve line breaks
  span.style.wordBreak = "break-word"; // Handle long words
  span.textContent = text;

  document.body.appendChild(span);
  console.log(span)
  const height = span.clientHeight;
  console.log(height)

  document.body.removeChild(span);
  return height;
}
