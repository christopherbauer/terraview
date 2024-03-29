import { Resource, Terraform } from "./Terraform";

export const acquireTerraform = async (file: File) => {
	const fileText = await file.text();
	return JSON.parse(fileText) as Terraform;
};

export type ResourceInfo = Resource;
