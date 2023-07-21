import { FC } from "react";
// libs
import { useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
// ui-components
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Spinner,
  Center,
  Text,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react";
// query
import {
  GetAllLiftsByStatusDocument,
  GetLiftByIdDocument,
  GetLiftByIdQuery,
  LiftStatus,
  useUpdateLiftStatusMutation,
} from "../../generated/graphql";
// components
import AppSelect from "../AppSelect";
// constants
import { CHANGE_LIFTS_STATUSES } from "../../constants/lifts-statuses";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  liftId: string;
}

export interface IFormValues {
  singleLiftStatus: string;
}

const AppDrawer: FC<IProps> = ({ isOpen, onClose, liftId }) => {
  const { control, handleSubmit } = useForm<IFormValues>();
  const toast = useToast();

  const { data, loading, refetch } = useQuery<GetLiftByIdQuery>(
    GetLiftByIdDocument,
    {
      variables: {
        id: liftId,
      },
      onCompleted: () => {
        refetch();
      },
      onError: (error) => {
        toast({
          title: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const onSubmit = (formData: IFormValues) => {
    setLiftStatus({
      variables: {
        id: liftId,
        status: formData.singleLiftStatus as LiftStatus,
      },
    });
    toast({
      title: `${data?.Lift.name} status changed to ${formData.singleLiftStatus}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  const [setLiftStatus] = useUpdateLiftStatusMutation({
    refetchQueries() {
      return [
        {
          query: GetAllLiftsByStatusDocument,
          variables: {
            status: data?.Lift.status,
          },
        },
      ];
    },
    onError: (error) => {
      toast({
        title: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        {loading ? (
          <Center height="100%">
            <Spinner size="lg" />
          </Center>
        ) : (
          <>
            <DrawerCloseButton />
            <DrawerHeader textAlign="center">
              <Text>{data?.Lift.name}</Text>
              <Text>{data?.Lift.elevationGain}</Text>
              <Box mt={3} display="flex" flexDir="column" alignItems="center">
                <Box width="80%">
                  <Text fontSize={16} mb={2} textAlign="left">
                    Change Lift Status:
                  </Text>
                  <AppSelect
                    defaultValue={data?.Lift.status as LiftStatus}
                    name="singleLiftStatus"
                    control={control}
                    width="100%"
                    optionList={CHANGE_LIFTS_STATUSES}
                  />
                </Box>
              </Box>
            </DrawerHeader>

            <DrawerBody>
              <Text fontSize={16} fontWeight="bold" mb={2}>
                Trail Access List:
              </Text>
              {data?.Lift.trailAccess?.map((trail) => (
                <Box
                  display="flex"
                  key={trail?.name}
                  alignItems="center"
                  justifyContent="space-between"
                  mb={15}
                  border={"1px solid rgb(226, 232, 240)"}
                  p={5}
                >
                  <Text>{trail?.name}</Text>
                  <Text>{trail?.status}</Text>
                </Box>
              ))}

              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-evenly"
                mb={25}
              >
                <Button colorScheme="red" size="lg" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="green"
                  size="lg"
                  onClick={handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              </Box>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default AppDrawer;
