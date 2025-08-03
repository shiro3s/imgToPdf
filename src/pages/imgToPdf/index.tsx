import { Download, Plus } from "lucide-react";
import React from "react";
import { Card } from "./card";
import styles from "./style.module.css";
import { useImgToPdf } from "./useImgToPdf";

export const ImgToPdfPage: React.FC = () => {
	const {
		handleFileChange,
		images,
		handleDragOver,
		handleDragStart,
		handleDrop,
		handleRemove,
	} = useImgToPdf();

	console.log(images)

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1 className={styles.title}>画像ファイルからPDFを作成</h1>

				<div className={styles.btnContainer}>
					<label htmlFor="inputFile" className={styles.btn}>
						<input
							type="file"
							multiple
							accept="image/*"
							className={styles.input}
							id="inputFile"
							onChange={handleFileChange}
						/>
						<Plus />
						<span>追加</span>
					</label>

					<button type="button" className={styles.btn}>
						<Download />
						<span>ダウンロード</span>
					</button>
				</div>
			</header>

			<div className={styles.content}>
				{images.map((image, index) => (
					<Card
						key={image.id}
						file={image.file}
						name={image.name}
						onDragOver={handleDragOver}
						onDragStart={() => {
							handleDragStart(index);
						}}
						onDrop={(event) => {
							handleDrop(event, index);
						}}
						onRemove={() => {
							handleRemove(image.id);
						}}
					/>
				))}
			</div>
		</div>
	);
};
