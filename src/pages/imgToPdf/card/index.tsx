import { CircleX } from "lucide-react";
import React from "react";

import styles from "./style.module.css";

interface Props {
	id: string;
	url: string;
	name: string;
}

export const Card: React.FC<Props> = ({ id, url, name }) => {
	return (
		<div draggable className={styles.container}>
			<CircleX className={styles.clear} fill="#333" color="#fff" />
			<img src={url} alt={name} className={styles.img} />
      <div className={styles.name}>{name}</div>
		</div>
	);
};
