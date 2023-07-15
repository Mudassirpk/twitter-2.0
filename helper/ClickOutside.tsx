import { useRef, useEffect} from "react";

function useClickOutside<T>(
  initialValue: T,
  callback: () => void
): React.MutableRefObject<T> {
  const ref = useRef<T>(initialValue);

  useEffect(() => {
    ref.current = initialValue;
    console.log(ref.current);
    document.addEventListener("mousedown", (e: any) => {
      if (e.target !== ref.current) {
        callback();
      }
    });
  }, [initialValue]);

  return ref;
}

export default useClickOutside;
