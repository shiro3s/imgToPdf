import { Download, Plus } from "lucide-react";
import React from "react";
import styles from "./style.module.css";
import { useImgToPdf } from "./useImgToPdf";

export const ImgToPdfPage: React.FC = () => {
	const { inputRef } = useImgToPdf();

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<h1 className={styles.title}>画像ファイルからPDFを作成</h1>
				<div className={styles.btnContainer}>
					<label htmlFor="inputFile" className={styles.btn}>
						<input
							type="hidden"
							multiple
							className={styles.input}
							id="inputFile"
							ref={inputRef}
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
		</div>
	);
};
