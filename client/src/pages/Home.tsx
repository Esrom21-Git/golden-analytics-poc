import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Search, TrendingUp, DollarSign, Filter } from "lucide-react";
import vendorPaymentsData from "@/data/vendor_payments.json";
import { logAiInteraction } from "@/services/logging";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedFund, setSelectedFund] = useState<string | null>(null);

  const processedData = useMemo(() => {
    let filtered = vendorPaymentsData;

    if (selectedYear) {
      filtered = filtered.filter((item) => item["Fiscal Year"] === selectedYear);
    }

    if (selectedFund) {
      filtered = filtered.filter((item) => item["Fund Type"] === selectedFund);
    }

    const byCategory = filtered.reduce(
      (acc, item) => {
        const existing = acc.find((c) => c.name === item.Category);
        if (existing) {
          existing.value += item.Amount;
        } else {
          acc.push({ name: item.Category, value: item.Amount });
        }
        return acc;
      },
      [] as Array<{ name: string; value: number }>
    );

    const byYear = vendorPaymentsData.reduce(
      (acc, item) => {
        const existing = acc.find((y) => y.year === item["Fiscal Year"]);
        if (existing) {
          existing.total += item.Amount;
        } else {
          acc.push({ year: item["Fiscal Year"], total: item.Amount });
        }
        return acc;
      },
      [] as Array<{ year: number; total: number }>
    );

    const totalSpending = filtered.reduce((sum, item) => sum + item.Amount, 0);
    const topVendor = filtered.sort((a, b) => b.Amount - a.Amount)[0];

    return { byCategory, byYear, totalSpending, topVendor, filtered };
  }, [selectedYear, selectedFund]);

  const handleNaturalLanguageQuery = (query: string) => {
    logAiInteraction({
      question: query,
      response: "Processing query...",
      action: "natural_language_parse",
      timestamp: new Date().toISOString(),
    });

    let response = "";
    if (query.toLowerCase().includes("top spending")) {
      response = `Top Spending Category: ${processedData.byCategory[0]?.name} - $${processedData.byCategory[0]?.value.toLocaleString()}`;
      alert(response);
    } else if (query.toLowerCase().includes("total")) {
      response = `Total Spending: $${processedData.totalSpending.toLocaleString()}`;
      alert(response);
    } else if (query.toLowerCase().includes("trend")) {
      response = "Showing spending trends over fiscal years in the chart below";
      alert(response);
    } else {
      response = "Try asking: 'What is the top spending category?' or 'Show me the total spending'";
      alert(response);
    }

    // Log final AI response (POC)
    logAiInteraction({
      question: query,
      response,
      action: "natural_language_response",
      timestamp: new Date().toISOString(),
    });
  };

  const fundTypes = [...new Set(vendorPaymentsData.map((item) => item["Fund Type"]))] as string[];
  const years = [...new Set(vendorPaymentsData.map((item) => item["Fiscal Year"]))].sort() as number[];
  const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">GoldenInsights</h1>
              <p className="text-slate-600 mt-1">Washington State Fiscal Data Explorer</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600">For non-technical users</p>
              <p className="text-xs text-slate-500 mt-1">AI-powered data insights</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Ask a Question (AI-Powered)
            </CardTitle>
            <CardDescription>
              Type a natural language question about the spending data. The AI will help you find answers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., 'What is the top spending category?' or 'Show me the total spending'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && searchQuery) {
                    handleNaturalLanguageQuery(searchQuery);
                    setSearchQuery("");
                  }
                }}
              />
              <Button
                onClick={() => {
                  if (searchQuery) {
                    handleNaturalLanguageQuery(searchQuery);
                    setSearchQuery("");
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Search className="w-4 h-4 mr-2" />
                Ask
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Fiscal Year</label>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={selectedYear === null ? "default" : "outline"}
                    onClick={() => setSelectedYear(null)}
                    size="sm"
                  >
                    All Years
                  </Button>
                  {years.map((year) => (
                    <Button
                      key={year}
                      variant={selectedYear === year ? "default" : "outline"}
                      onClick={() => setSelectedYear(year)}
                      size="sm"
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Fund Type</label>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={selectedFund === null ? "default" : "outline"}
                    onClick={() => setSelectedFund(null)}
                    size="sm"
                  >
                    All Funds
                  </Button>
                  {fundTypes.map((fund) => (
                    <Button
                      key={fund}
                      variant={selectedFund === fund ? "default" : "outline"}
                      onClick={() => setSelectedFund(fund)}
                      size="sm"
                      className="text-xs"
                    >
                      {fund}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Total Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-2xl font-bold text-slate-900">
                  ${(processedData.totalSpending / 1000000).toFixed(1)}M
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {processedData.filtered.length} transactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Top Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-2xl font-bold text-slate-900">
                  {processedData.byCategory[0]?.name}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                ${(processedData.byCategory[0]?.value / 1000000).toFixed(1)}M
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Top Vendor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <span className="text-lg font-bold text-slate-900 truncate">
                  {processedData.topVendor?.Vendor}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                ${(processedData.topVendor?.Amount / 1000000).toFixed(1)}M
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>Distribution of funds across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={processedData.byCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${(value / 1000000).toFixed(1)}M`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {processedData.byCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${(value / 1000000).toFixed(1)}M`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spending Trends</CardTitle>
              <CardDescription>Total spending over fiscal years</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={processedData.byYear}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `$${(value / 1000000).toFixed(1)}M`} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#3b82f6"
                    name="Total Spending"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Detailed Transactions</CardTitle>
            <CardDescription>All spending records matching your filters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Year</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Fund Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Vendor</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Category</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {processedData.filtered.slice(0, 10).map((item, idx) => (
                    <tr key={idx} className="border-b hover:bg-slate-50">
                      <td className="py-3 px-4">{item["Fiscal Year"]}</td>
                      <td className="py-3 px-4 text-slate-600">{item["Fund Type"]}</td>
                      <td className="py-3 px-4 text-slate-600">{item.Vendor}</td>
                      <td className="py-3 px-4 text-slate-600">{item.Category}</td>
                      <td className="py-3 px-4 text-right font-medium">
                        ${item.Amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {processedData.filtered.length > 10 && (
                <p className="text-xs text-slate-500 mt-4">
                  Showing 10 of {processedData.filtered.length} transactions
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-xs text-slate-600">
            <strong>Design Note:</strong> This interface is designed for non-technical users. No SQL is exposed. All data exploration is done through filters and natural language questions.
          </p>
        </div>
      </main>
    </div>
  );
}
