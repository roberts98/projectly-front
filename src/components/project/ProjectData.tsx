import { CategoryChartTiles } from "../category/CategoryChartTiles.tsx";
import { ExpenseTable } from "../expense/ExpenseTable.tsx";
import { ExpenseForm } from "../expense/ExpenseForm.tsx";
import { ExpenseForBuyDateBarChart } from "../expense/ExpenseForBuyDateBarChart.tsx";
import { Project } from "../../models/project.ts";
import { useExpenses } from "../../hooks/expense/useExpenses.hook.ts";
import { Spinner } from "flowbite-react";
import { useUserStore } from "../../store/user.store.ts";
import { useTranslation } from "react-i18next";

interface Props {
  project: Project;
  passphrase: string | undefined;
}

export function ProjectData({ project, passphrase }: Props) {
  const { t } = useTranslation();
  const { expenses, areExpensesLoading } = useExpenses(
    project.id,
    project.isEncrypted,
    passphrase,
  );
  const userId = useUserStore((state) => state.user?.userId);
  const isOwned = project?.userId === userId;

  if (areExpensesLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <CategoryChartTiles projectId={project.id} expenses={expenses} />
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div
          className={`col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 ${
            isOwned ? "xl:col-span-8" : "xl:col-span-12"
          }`}
        >
          <div className="flex h-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 mb-5">
            {t("expense.typography.table")}
          </div>
          <div>
            <ExpenseTable
              projectId={project.id}
              readOnly={!isOwned}
              expenses={expenses}
              passphrase={passphrase}
            />
          </div>
        </div>
        {isOwned && (
          <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
            <div className="flex h-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 mb-5">
              {t("expense.typography.new")}
            </div>
            <ExpenseForm projectId={project.id} passphrase={passphrase} />
          </div>
        )}

        <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-12">
          <ExpenseForBuyDateBarChart expenses={expenses} />
        </div>
      </div>
    </section>
  );
}
