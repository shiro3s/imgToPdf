import { jsPDF } from "jspdf";
import { nanoid } from "nanoid";
import { useCallback, useRef, useState } from "react";

type Image = {
	id: string;
	name: string;
	file: File;
};

export const useImgToPdf = () => {
	const [images, setImages] = useState<Image[]>([]);
	const draggedItemIndexRef = useRef<number>(0);

	const handleDragStart = (index: number) => {
		draggedItemIndexRef.current = index;
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDrop = useCallback(
		(event: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
			event.preventDefault();
			const fromIndex = draggedItemIndexRef.current;

			setImages((prevImages) => {
				const newImages = [...prevImages];
				const [movedItem] = newImages.splice(fromIndex, 1);
				newImages.splice(targetIndex, 0, movedItem);
				return newImages;
			});
		},
		[],
	);

	const handleRemove = useCallback((id: string) => {
		setImages((prevImages) => {
			return prevImages.filter((image) => image.id !== id);
		});
	}, []);

	const handleFileChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const files = event.target.files;
			if (!files?.length) return;

			const newImages = Array.from(files).map((file) => {
				const url = URL.createObjectURL(file);

				return {
					id: nanoid(),
					name: file.name,
					url,
					file,
				};
			});

			setImages((prevImages) => [...prevImages, ...newImages]);
		},
		[],
	);

	const handleGenPdf = useCallback(async () => {
		if (images.length === 0) return;

		try {
			const doc = new jsPDF();
			for (let i = 0; i < images.length; i += 1) {
				const image = images[i];

				const url = URL.createObjectURL(image.file);
				const imgElm = new Image();
				imgElm.src = url;
				await imgElm.decode()

				const { naturalWidth, naturalHeight } = imgElm;
				const pageWidth = doc.internal.pageSize.getWidth();
				const pageHeight = doc.internal.pageSize.getHeight();

				const ratio = Math.min(
					pageWidth / naturalWidth,
					pageHeight / naturalHeight,
				);
				const imageWidth = naturalWidth * ratio;
				const imageHeight = naturalHeight * ratio;

				const x = (pageWidth - imageWidth) / 2;
				const y = (pageHeight - imageHeight) / 2;

				doc.addImage(url, "JPEG", x, y, imageWidth, imageHeight);

				if (i < images.length - 1) doc.addPage();

				URL.revokeObjectURL(url);
			}

			doc.save();
		} catch (err) {
			console.log(err);
		}
	}, [images]);

	return {
		images,
		handleFileChange,
		handleDragOver,
		handleDragStart,
		handleDrop,
		handleRemove,
		handleGenPdf,
	};
};
