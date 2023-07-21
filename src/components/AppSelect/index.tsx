import {
  Control,
  FieldPath,
  FieldValues,
  PathValue,
  useController,
} from "react-hook-form";
// ui-components
import { Select } from "@chakra-ui/react";
// types
import { ISelectLIftStatusArray } from "../../constants/lifts-statuses";

interface IProps<T extends FieldValues> {
  defaultValue: PathValue<T, FieldPath<T>>;
  optionList: ISelectLIftStatusArray[];
  name: FieldPath<T>;
  control: Control<T>;
  width?: string;
}
function AppSelect<T extends FieldValues>({
  control,
  name,
  defaultValue,
  optionList,
  width = "20%",
}: IProps<T>) {
  const { field } = useController<T>({
    name,
    defaultValue,
    control,
  });

  return (
    <Select
      onChange={field.onChange}
      width={width}
      defaultValue={defaultValue}
      cursor="pointer"
    >
      {optionList.map((status) => {
        return (
          <option key={status.label} value={status.value}>
            {status.label}
          </option>
        );
      })}
    </Select>
  );
}

export default AppSelect;
