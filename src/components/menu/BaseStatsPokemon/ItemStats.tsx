import { Flex, Progress, Text } from "@chakra-ui/react";
import { ColorsData } from "../../../types/pokemon";
import { TitleInfo } from "../../core/TitleInfo";
import { ValueInfo } from "../../core/ValueInfo";

interface ItemStatsProps {
    title: string;
    stats: number;
    total?: boolean;
    color?: ColorsData;
}

export function ItemStats({ title, stats, total, color }: ItemStatsProps) {
    

    return (
        <Flex
            align="center"
            mb="1rem"
        >
            <TitleInfo
                text={title}
                w="10rem"
            />
            <ValueInfo
                value={stats}
                w="3rem"
            />
            <Progress
                w="100%"
                h="1"
                colorScheme={color?.colorScheme}
                value={total ? stats / 6 : stats}
                ml="5"
            />
        </Flex>
    )
}