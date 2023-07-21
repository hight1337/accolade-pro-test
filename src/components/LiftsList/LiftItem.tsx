import React, { FC } from "react";
// types
import { LiftStatus } from "../../generated/graphql";
// ui-components
import { Box, Text, Button } from "@chakra-ui/react";

interface IProps {
  __typename?: "Lift" | undefined;
  id: string;
  name: string;
  elevationGain: number;
  status?: LiftStatus | null | undefined;
  onPress: (id: string) => void;
}

const LiftItem: FC<IProps> = ({ id, name, elevationGain, status, onPress }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      border={"1px solid rgb(226, 232, 240)"}
      p={10}
      mb={15}
    >
      <Box width={"33.3%"}>
        <Text fontSize={18} fontWeight="bold">
          {name}
        </Text>
        <Text fontSize={16} fontWeight="bold">
          {elevationGain}
        </Text>
      </Box>
      <Text width="33.3%">{status}</Text>
      <Button colorScheme="teal" size="sm" onClick={() => onPress(id)}>
        Edit
      </Button>
    </Box>
  );
};

export default LiftItem;
