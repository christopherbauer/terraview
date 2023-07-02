import { useEffect, useMemo, useState } from "react";
import { acquireTerraform } from "../../decoder";
import { Terraform } from "../../decoder/Terraform";
import { ECR, VPC } from "../terraform";

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
		return tfStateVPCs?.map((v, idx) =>
			v.instances.map((i) => (
				<VPC
					key={i.attributes.name}
					info={v}
					cidr={v.instances[0].attributes.cidr_block!}
					x={idx * 9}
					y={0}
					width={8}
					height={6}
				></VPC>
			))
		);
	}, [terraform?.resources]);
	const mappedECS = useMemo(() => {
		const tfStateECS = terraform?.resources.filter((r) => r.type === "aws_ecr_repository");
		return tfStateECS?.map((e, idx) =>
			e.instances.map((i) => (
				<ECR key={i.attributes.name} info={e} name={i.attributes.name} x={idx * 7} y={7} width={6} height={5} />
			))
		);
	}, [terraform?.resources]);
	return (
		<>
			{mappedVpcs}
			{mappedECS}
		</>
	);
};
