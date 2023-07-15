import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "./loading.module.css";
interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
  extraClasses?: string;
}

function Loading({ extraClasses }: Props) {
  return (
    <div
      className={`w-full flex justify-center items-center ${styles.loader} ${extraClasses}`}
    >
      <AiOutlineLoading3Quarters className={styles.loader} />
    </div>
  );
}

export default Loading;
