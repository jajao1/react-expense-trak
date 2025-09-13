import { Transaction } from "./TransactionForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { BarChart3 } from "lucide-react";

interface CategoryChartProps {
  transactions: Transaction[];
}

export function CategoryChart({ transactions }: CategoryChartProps) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const currentMonthTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    return transactionDate.getMonth() === currentMonth && 
           transactionDate.getFullYear() === currentYear &&
           transaction.type === 'expense'; // Only show expenses in the chart
  });

  const categoryData = currentMonthTransactions.reduce((acc, transaction) => {
    const existing = acc.find(item => item.name === transaction.category);
    if (existing) {
      existing.value += transaction.amount;
    } else {
      acc.push({
        name: transaction.category,
        value: transaction.amount
      });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const colors = [
    'hsl(var(--expense))',
    'hsl(var(--primary))',
    'hsl(var(--income))',
    'hsl(var(--savings))',
    'hsl(0, 84%, 70%)',
    'hsl(165, 84%, 51%)',
    'hsl(221, 83%, 63%)',
    'hsl(42, 87%, 55%)'
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (categoryData.length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Despesas por Categoria
          </CardTitle>
          <CardDescription>
            Distribuição das suas despesas mensais
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <BarChart3 className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Nenhuma despesa encontrada</p>
            <p className="text-sm">Adicione algumas despesas para ver o gráfico de categorias.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Despesas por Categoria
        </CardTitle>
        <CardDescription>
          Distribuição das suas despesas mensais
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Valor']}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: '20px',
                  fontSize: '14px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}