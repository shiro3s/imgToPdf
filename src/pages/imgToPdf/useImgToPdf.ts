import { nanoid } from "nanoid";
import { useCallback, useRef, useState } from "react";

type Image = {
	id: string;
	name: string;
	url: string;
	file: File;
};

export const useImgToPdf = () => {
	const [images, setImages] = useState<Image[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			// if (inputRef.current) inputRef.current.value = "";

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
		inputRef,
		images,
		handleFileChange,
	};
};
