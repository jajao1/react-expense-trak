import { Transaction } from "./TransactionForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, PiggyBank, DollarSign } from "lucide-react";

interface BudgetSummaryProps {
  transactions: Transaction[];
}

export function BudgetSummary({ transactions }: BudgetSummaryProps) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const currentMonthTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate.getMonth() === currentMonth && 
           transactionDate.getFullYear() === currentYear;
  });

  const totalIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const currentMonthName = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="shadow-card hover:shadow-hover transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receitas</CardTitle>
          <TrendingUp className="h-4 w-4 text-income" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-income">
            {formatCurrency(totalIncome)}
          </div>
          <p className="text-xs text-muted-foreground">
            {currentMonthName}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card hover:shadow-hover transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas</CardTitle>
          <TrendingDown className="h-4 w-4 text-expense" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-expense">
            {formatCurrency(totalExpenses)}
          </div>
          <p className="text-xs text-muted-foreground">
            {currentMonthName}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card hover:shadow-hover transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo</CardTitle>
          <DollarSign className={`h-4 w-4 ${balance >= 0 ? 'text-income' : 'text-expense'}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${balance >= 0 ? 'text-income' : 'text-expense'}`}>
            {formatCurrency(balance)}
          </div>
          <p className="text-xs text-muted-foreground">
            {currentMonthName}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-card hover:shadow-hover transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Transações</CardTitle>
          <PiggyBank className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {currentMonthTransactions.length}
          </div>
          <p className="text-xs text-muted-foreground">
            Este mês
          </p>
        </CardContent>
      </Card>
    </div>
  );
}