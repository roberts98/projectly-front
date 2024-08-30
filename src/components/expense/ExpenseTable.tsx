import { Cancel, Delete, Edit, Save } from "@mui/icons-material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";
import { useState } from "react";
import { useExpenses } from "../../hooks/expense/useExpenses.hook";
import { useRemoveExpense } from "../../hooks/expense/useRemoveExpense.hook";
import { useUpdateExpense } from "../../hooks/expense/useUpdateExpense.hook";
import { useAllItemTypes } from "../../hooks/itemType/useAllItemTypes.hook";
import { Expense } from "../../models/expense";

interface Props {
  projectId: number;
}

function ExpenseTable({ projectId }: Props) {
  const { expenses } = useExpenses(Number(projectId));
  const { removeExpense } = useRemoveExpense();
  const { updateExpense } = useUpdateExpense();
  const { itemTypes } = useAllItemTypes();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const columns: GridColDef[] = [
    {
      field: "ordinalNumber",
      headerName: "lp.",
      width: 50,
    },
    {
      field: "itemName",
      headerName: "Nazwa",
      width: 400,
      editable: true,
    },
    {
      field: "itemType",
      headerName: "Typ przedmiotu",
      width: 400,
      editable: false,
    },
    {
      field: "cost",
      headerName: "Koszt",
      type: "number",
      width: 100,
      editable: true,
      renderCell: (params) => params.value?.toFixed(2),
    },
    {
      field: "deliveryCost",
      headerName: "Koszt dostawy",
      type: "number",
      width: 200,
      editable: true,
      renderCell: (params) => params.value?.toFixed(2) || "0.00",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Akcja",
      width: 100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Save />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const rows = expenses.map((expense, idx) => ({
    ordinalNumber: idx + 1,
    itemType:
      itemTypes.find((itemType) => itemType.id === expense.itemTypeId)?.name ||
      "Ogólne",
    ...expense,
  }));

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    removeExpense({ expenseId: Number(id), projectId });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (updatedExpense: GridRowModel<Expense>) => {
    updateExpense({
      expenseId: updatedExpense.id,
      projectId,
      updateExpense: {
        cost: updatedExpense.cost,
        itemName: updatedExpense.itemName,
        deliveryCost: updatedExpense.deliveryCost,
      },
    });
    return updatedExpense;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <DataGrid
      style={{ width: "100%" }}
      rows={rows}
      columns={columns}
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      editMode="row"
      pageSizeOptions={[
        { label: "10", value: 10 },
        { label: "20", value: 20 },
      ]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 2 },
        },
      }}
    />
  );
}

export default ExpenseTable;
