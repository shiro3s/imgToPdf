import { CircleX } from "lucide-react";
import React, { useEffect, useRef } from "react";

import styles from "./style.module.css";

interface Props {
	file: File;
	name: string;
	onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
	onDragStart?: () => void;
	onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
	onRemove?: () => void;
}

export const Card: React.FC<Props> = ({
	file,
	name,
	onDragOver,
	onDragStart,
	onDrop,
	onRemove,
}) => {
	const imageRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		const elm = imageRef.current;
		if (elm) {
			const imageUrl = URL.createObjectURL(file);
			elm.src = imageUrl;

			return () => {
				URL.revokeObjectURL(imageUrl);
			};
		}
	}, [file]);

	return (
		<div
			draggable
			className={styles.container}
			onDragOver={onDragOver}
			onDragStart={onDragStart}
			onDrop={onDrop}
		>
			<CircleX
				className={styles.clear}
				fill="#333"
				color="#fff"
				onClick={onRemove}
			/>
			<img ref={imageRef} alt={name} className={styles.img} />
			<div className={styles.name}>{name}</div>
		</div>
	);
};
