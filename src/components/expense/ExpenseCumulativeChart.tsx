import dayjs from "dayjs";
import { Expense } from "../../models/expense";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

interface Props {
  expenses: Expense[];
}

export function ExpenseCumulativeChart({ expenses }: Props) {
  const { t } = useTranslation();
  const dataByMonth = expenses.reduce(
    (acc: Record<string, number>, expense) => {
      const month = dayjs(expense.buyDate).format("YYYY-MM");
      const totalCost = expense.cost + (expense.deliveryCost || 0);

      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += totalCost;

      return acc;
    },
    {},
  );

  const sortedMonths = Object.keys(dataByMonth).sort((a, b) =>
    dayjs(a).diff(dayjs(b)),
  );

  const cumulativeData: number[] = [];
  sortedMonths.reduce((acc, month) => {
    const cumulativeTotal = acc + dataByMonth[month];
    cumulativeData.push(cumulativeTotal);
    return cumulativeTotal;
  }, 0);

  const data = {
    labels: sortedMonths,
    datasets: [
      {
        label: t("general.sum"),
        data: cumulativeData,
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} />;
}
