import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useCreateExpense } from "../../hooks/expense/useCreateExpense.hook";
import { useRooms } from "../../hooks/room/useRooms.hook";
import { NewExpense } from "../../models/expense";
import { useItemTypes } from "../../hooks/itemType/useItemTypes.hook";

interface Props {
  projectId: number;
}

function ExpenseForm({ projectId }: Props) {
  const { rooms } = useRooms(projectId);
  const { register, handleSubmit, reset, watch } = useForm();
  const { createExpense } = useCreateExpense();
  const selectedRoomId: number | undefined = watch("roomId");
  const { itemTypes } = useItemTypes(selectedRoomId);

  function onSubmit(formValues: FieldValues) {
    const { roomId, itemTypeId, itemName, cost, deliveryCost } = formValues;
    const expense: NewExpense = {
      roomId: roomId,
      room: rooms.find((room) => room.id == roomId)!.name,
      itemName,
      itemTypeId: itemTypeId,
      itemType: itemTypes.find((itemType) => itemType.id === itemTypeId)!.name,
      cost: Number(cost),
      deliveryCost: Number(deliveryCost) || undefined,
    };
    createExpense({ expense, projectId });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant="outlined"
        label="Nazwa przedmiotu"
        required
        inputProps={register("itemName")}
        sx={{ mr: 1 }}
      />
      <FormControl variant="outlined" sx={{ minWidth: 120, mr: 1 }}>
        <InputLabel id="room-label">Pokój *</InputLabel>
        <Select
          labelId="room-label"
          id="room"
          label="Pokój"
          inputProps={register("roomId")}
          defaultValue={""}
          required
        >
          {rooms.map((room) => (
            <MenuItem key={room.id} value={room.id}>
              {room.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: 200, mr: 1 }}>
        <InputLabel id="item-type-label">Typ przedmiotu *</InputLabel>
        <Select
          labelId="item-type-label"
          id="item type"
          label="Typ przedmiotu"
          inputProps={register("itemTypeId")}
          defaultValue={""}
          required
          disabled={!selectedRoomId}
        >
          {itemTypes.map((itemType) => (
            <MenuItem key={itemType.id} value={itemType.id}>
              {itemType.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        variant="outlined"
        label="Kwota w PLN"
        required
        inputProps={register("cost")}
        sx={{ mr: 1 }}
      />
      <TextField
        variant="outlined"
        label="Kwota dostawy w PLN"
        inputProps={register("deliveryCost")}
        sx={{ mr: 1 }}
      />
      <Button variant="outlined" type="submit" size="large">
        Dodaj
      </Button>
    </form>
  );
}

export default ExpenseForm;
