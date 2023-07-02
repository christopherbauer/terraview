import { FC, useMemo } from "react";
import { SubnetElement } from ".";
import { THEME, THEMES } from "..";
import { useAdjusted } from "../../../hooks/useAdjusted";

export const Subnet: FC<SubnetElement> = ({ layer = 0, theme = THEME.pastels, ...props }) => {
	const { cidr, info } = props;
	const [x, y, width, height] = useAdjusted(props.x, props.y, props.width, props.height);
	const color = useMemo(() => THEMES[theme][layer], [layer, theme]);
	const tags = info.instances[0].attributes.tags;
	return <></>;
};
