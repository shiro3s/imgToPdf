import { Download, Plus } from "lucide-react";
import React from "react";
import { Card } from "./card";
import styles from "./style.module.css";
import { useImgToPdf } from "./useImgToPdf";

export const ImgToPdfPage: React.FC = () => {
	const { inputRef, handleFileChange, images } = useImgToPdf();
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
							ref={inputRef}
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
				{images.map((image) => (
					<Card
						key={image.id}
						id={image.id}
						name={image.name}
						url={image.url}
					/>
				))}
			</div>
		</div>
	);
};
