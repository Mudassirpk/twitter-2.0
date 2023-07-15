import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "./loading.module.css";
type Props = {};

function Loading({}: Props) {
  return (
    <div className={`w-full flex justify-center items-center ${styles.loader}`}>
      <AiOutlineLoading3Quarters className="loader" />
    </div>
  );
}

export default Loading;
