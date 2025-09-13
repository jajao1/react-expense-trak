import { Transaction } from "./TransactionForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, TrendingDown, TrendingUp, Calendar } from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

export function TransactionList({ transactions, onDeleteTransaction }: TransactionListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (transactions.length === 0) {
    return (
      <Card className="shadow-card">
        <CardContent className="pt-8 pb-8">
          <div className="text-center text-muted-foreground">
            <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Nenhuma transação encontrada</p>
            <p className="text-sm">Adicione sua primeira transação para começar a acompanhar seu orçamento.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-xl">Transações Recentes</CardTitle>
        <CardDescription>
          Histórico de suas receitas e despesas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-gradient-card hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'income' 
                    ? 'bg-income/10 text-income' 
                    : 'bg-expense/10 text-expense'
                }`}>
                  {transaction.type === 'income' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{transaction.description}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(transaction.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`font-semibold ${
                  transaction.type === 'income' 
                    ? 'text-income' 
                    : 'text-expense'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'} {formatCurrency(Math.abs(transaction.amount))}
                </span>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}