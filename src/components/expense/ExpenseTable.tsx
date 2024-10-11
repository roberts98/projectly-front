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
import { useRemoveExpense } from "../../hooks/expense/useRemoveExpense.hook";
import { useUpdateExpense } from "../../hooks/expense/useUpdateExpense.hook";
import { Expense } from "../../models/expense";
import { useTranslation } from "react-i18next";

interface Props {
  projectId: number;
  expenses: Expense[];
  readOnly: boolean;
  passphrase: string | undefined;
}

export function ExpenseTable({
  projectId,
  expenses,
  readOnly,
  passphrase,
}: Props) {
  const { t } = useTranslation();
  const { removeExpense, isRemovingExpense } = useRemoveExpense();
  const { updateExpense, isUpdatingExpense } = useUpdateExpense();
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const columns: GridColDef[] = [
    {
      field: "ordinalNumber",
      headerName: "lp.",
      width: 50,
    },
    {
      field: "buyDate",
      headerName: t("expense.fields.buyDate"),
      width: 100,
    },
    {
      field: "itemName",
      headerName: t("expense.fields.itemName"),
      width: 200,
      editable: !readOnly,
    },
    {
      field: "category",
      headerName: t("expense.fields.category"),
      width: 100,
    },
    {
      field: "subcategory",
      headerName: t("expense.fields.subcategory"),
      width: 100,
    },
    {
      field: "cost",
      headerName: t("expense.fields.cost"),
      type: "number",
      width: 100,
      editable: !readOnly,
      renderCell: (params) => Number(params.value)?.toFixed(2),
    },
    {
      field: "deliveryCost",
      headerName: t("expense.fields.deliveryCost"),
      type: "number",
      width: 140,
      editable: !readOnly,
      renderCell: (params) => params.value?.toFixed(2) || "0.00",
    },
    {
      field: "actions",
      type: "actions",
      headerName: t("expense.fields.action"),
      width: 100,
      getActions: ({ id, row }) => {
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
            onClick={handleDeleteClick(row)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const rows = expenses.map((expense, idx) => ({
    ordinalNumber: idx + 1,
    ...expense,
  }));

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event,
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

  const handleDeleteClick = (expense: GridRowModel<Expense>) => () => {
    removeExpense({ expense });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (
    updatedExpense: GridRowModel<Expense>,
    old: GridRowModel<Expense>,
  ) => {
    updateExpense({
      expenseId: updatedExpense.id,
      projectId,
      categoryId: updatedExpense.categoryId,
      subcategoryId: old.subcategoryId,
      updateExpense: {
        cost: updatedExpense.cost,
        itemName: updatedExpense.itemName,
        deliveryCost: updatedExpense.deliveryCost,
      },
      oldCost: old.cost,
      passphrase,
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
      columns={columns.filter((column) =>
        readOnly ? column.field !== "actions" : true,
      )}
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      editMode="row"
      loading={isRemovingExpense || isUpdatingExpense}
      pageSizeOptions={[
        { label: "10", value: 10 },
        { label: "20", value: 20 },
        { label: "50", value: 50 },
      ]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 0 },
        },
      }}
    />
  );
}
