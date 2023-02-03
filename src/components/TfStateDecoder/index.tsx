import { useEffect, useMemo, useState } from "react";
import { VPC } from "..";
import { acquireTerraform } from "../../decoder";
import { Terraform } from "../../decoder/Terraform";
import { ECR } from "../ecr";

interface TfStateDecoderProps {
	file?: File;
}
export const TfStateDecoder = ({ file }: TfStateDecoderProps) => {
	const [terraform, setTerraform] = useState<Terraform | undefined>(undefined);
	useEffect(() => {
		if (file) {
			acquireTerraform(file).then((value) => setTerraform(value));
		}
	}, [file]);
	const mappedVpcs = useMemo(() => {
		const tfStateVPCs = terraform?.resources.filter((r) => r.type === "aws_vpc");
		return tfStateVPCs?.map((v, i) => (
			<VPC cidr={v.instances[0].attributes.cidr_block!} x={i * 7} y={0} width={6} height={6}></VPC>
		));
	}, [terraform?.resources]);
	const mappedECS = useMemo(() => {
		const tfStateECS = terraform?.resources.filter((r) => r.type === "aws_ecr_repository");
		return tfStateECS?.map((e, i) => <ECR x={i * 7} y={7} width={4} height={4} />);
	}, [terraform?.resources]);
	return (
		<>
			{mappedVpcs}
			{mappedECS}
		</>
	);
};
