import React, { useCallback, useMemo, useState } from "react";

interface UploadButtonProps {
	file?: File;
	onFileUploaded: (file: File) => void;
}
export const UploadButton = ({ file, onFileUploaded }: UploadButtonProps) => {
	const handleChange = useCallback<
		React.ChangeEventHandler<HTMLInputElement>
	>(
		(event) => {
			const files = (event.target as HTMLInputElement).files;
			if (files) {
				if (files.length === 1) {
					const theFile = files[0];
					const fileExtension = theFile.name.split(".").slice(-1)[0];
					if (fileExtension === "tfstate") {
						onFileUploaded(theFile);
					}
				}
			}
		},
		[onFileUploaded]
	);
	const isFilePicked = useMemo(() => file !== undefined, [file]);
	if (isFilePicked) {
		return (
			<div>
				{file?.name} - {file?.size}kb
			</div>
		);
	} else {
		return (
			<>
				<input type="file" onChange={handleChange} />
			</>
		);
	}
};
