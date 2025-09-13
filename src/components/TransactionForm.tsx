import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string;
}

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, "id">) => void;
}

const categories = {
  income: ["Salário", "Freelance", "Investimentos", "Outros"],
  expense: ["Alimentação", "Transporte", "Moradia", "Lazer", "Saúde", "Educação", "Outros"]
};

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount || !category) return;

    onAddTransaction({
      description,
      amount: parseFloat(amount),
      category,
      type,
      date: new Date().toISOString().split('T')[0]
    });

    // Reset form
    setDescription("");
    setAmount("");
    setCategory("");
  };

  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <PlusCircle className="h-5 w-5 text-primary" />
          Nova Transação
        </CardTitle>
        <CardDescription>
          Adicione uma nova receita ou despesa ao seu orçamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                placeholder="Ex: Supermercado, Salário..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Valor (R$)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select value={type} onValueChange={(value: "income" | "expense") => {
                setType(value);
                setCategory(""); // Reset category when type changes
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Receita</SelectItem>
                  <SelectItem value="expense">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories[type].map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            disabled={!description || !amount || !category}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Transação
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}