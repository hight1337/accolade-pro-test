import React, { FC, useEffect } from "react";
// ui-components
import { Box, Text, Divider } from "@chakra-ui/react";
// constants
import {
  LIFTS_STATUSES,
  TSelectLiftStatusValue,
} from "../../constants/lifts-statuses";
import AppSelect from "../AppSelect";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/hooks";
import { setCurrentLiftStatus } from "../../store/liftSlice";
import { LiftStatus } from "../../generated/graphql";

export interface IFormValues {
  liftStatus: TSelectLiftStatusValue;
}

const AppHeader: FC = () => {
  const { control, watch } = useForm<IFormValues>();
  const dispatch = useAppDispatch();
  const liftStatus = watch("liftStatus");
  useEffect(() => {
    dispatch(setCurrentLiftStatus(liftStatus));
  }, [liftStatus]);
  return (
    <>
      <Box display="flex" alignItems="center" p={4}>
        <Text
          fontSize={26}
          fontWeight="bold"
          width="80%"
          textAlign="center"
          textTransform="uppercase"
        >
          Lifts List
        </Text>
        <AppSelect
          defaultValue={LIFTS_STATUSES[0].label as LiftStatus}
          optionList={LIFTS_STATUSES}
          name="liftStatus"
          control={control}
        />
      </Box>
      <Divider />
    </>
  );
};

export default AppHeader;
