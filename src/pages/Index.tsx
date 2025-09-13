import { useState, useEffect } from "react";
import { TransactionForm, Transaction } from "@/components/TransactionForm";
import { TransactionList } from "@/components/TransactionList";
import { BudgetSummary } from "@/components/BudgetSummary";
import { CategoryChart } from "@/components/CategoryChart";
import { Calculator, Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { toast } = useToast();

  // Load transactions from localStorage on component mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('budget-transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Save transactions to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('budget-transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString()
    };
    
    setTransactions(prev => [transaction, ...prev]);
    
    toast({
      title: "Transação adicionada!",
      description: `${newTransaction.type === 'income' ? 'Receita' : 'Despesa'} de ${new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(newTransaction.amount)} adicionada com sucesso.`,
    });
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    
    toast({
      title: "Transação removida",
      description: "A transação foi removida do seu orçamento.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-gradient-card shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl">
              <Calculator className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Calculadora de Orçamento</h1>
              <p className="text-muted-foreground">Gerencie suas finanças pessoais de forma inteligente</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Summary Cards */}
          <BudgetSummary transactions={transactions} />

          {/* Transaction Form */}
          <TransactionForm onAddTransaction={addTransaction} />

          {/* Charts and Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CategoryChart transactions={transactions} />
            <TransactionList 
              transactions={transactions} 
              onDeleteTransaction={deleteTransaction}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gradient-card mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Wallet className="h-4 w-4" />
            <p className="text-sm">
              Desenvolvido com React • Sua ferramenta de controle financeiro pessoal
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
