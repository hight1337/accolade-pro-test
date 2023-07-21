import React, { FC } from "react";
// ui-components
import {
  Spinner,
  Center,
  useToast,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
// query
import { useGetAllLiftsByStatusQuery } from "../../generated/graphql";
import LiftItem from "./LiftItem";
import AppDrawer from "../AppDrawer";
import { useAppSelector } from "../../hooks/hooks";
import { selectCurrentLiftStatus } from "../../store/liftSlice";

const LiftsList: FC = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLift, setSelectedLift] = React.useState<string>("");
  const currentLiftsStatus = useAppSelector(selectCurrentLiftStatus);
  const handlePress = (id: string) => {
    setSelectedLift(id);
    onOpen();
  };
  const { data, loading, refetch } = useGetAllLiftsByStatusQuery({
    partialRefetch: true,
    variables: {
      status: currentLiftsStatus === "ALL" ? undefined : currentLiftsStatus,
    },
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      const { message } = error;
      toast({
        title: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  if (loading)
    return (
      <Center mt={50}>
        <Spinner size="xl" />
      </Center>
    );
  return (
    <>
      <Box mt={25}>
        {data?.allLifts?.map((lift) => (
          <LiftItem key={lift?.id} {...lift} onPress={handlePress} />
        ))}
      </Box>
      {isOpen && (
        <AppDrawer isOpen={isOpen} onClose={onClose} liftId={selectedLift} />
      )}
    </>
  );
};

export default LiftsList;
