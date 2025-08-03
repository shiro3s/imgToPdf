import { nanoid } from "nanoid";
import { useCallback, useEffect, useRef, useState } from "react";

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

	return {
		images,
		handleFileChange,
		handleDragOver,
		handleDragStart,
		handleDrop,
		handleRemove,
	};
};
