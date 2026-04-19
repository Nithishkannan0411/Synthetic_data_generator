import { useState } from "react";
import { z } from "zod";
import { Loader2, Download, Sparkles, Database, FileDown, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  schema: z.string().trim().min(1, "Schema cannot be empty"),
  rows: z.number().int().min(1, "Row count must be at least 1"),
});

const featureCards = [
  { icon: Sparkles, title: "AI-Powered Detection", desc: "Intelligent schema analysis and data type inference" },
  { icon: Database, title: "GAN-Based Generation", desc: "Realistic synthetic data using generative models" },
  { icon: FileDown, title: "Instant CSV Export", desc: "Download your datasets in one click" },
];

function jsonToCsv(data: Record<string, unknown>[]): string {
  if (!data.length) return "";
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((h) => {
      const val = String(row[h] ?? "");
      return val.includes(",") || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
    }).join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

function downloadCsv(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const Index = () => {
  const [schema, setSchema] = useState("");
  const [rows, setRows] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleGenerate = async () => {
    setError(null);
    setSuccess(false);
    setCsvData(null);
    setFieldErrors({});

    const result = formSchema.safeParse({ schema, rows });
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.errors.forEach((e) => { errs[e.path[0] as string] = e.message; });
      setFieldErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const url = `http://127.0.0.1:8000/generate?schema=${encodeURIComponent(schema.trim())}&rows=${rows}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
      const json = await res.json();
      const data = Array.isArray(json) ? json : json.data ?? [];
      if (!data.length) throw new Error("No data returned from API");
      const csv = jsonToCsv(data);
      setCsvData(csv);
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16">
      {/* Header */}
      <header className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3 tracking-tight">
          AI Synthetic Data Generator
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Generate realistic synthetic datasets using AI
        </p>
      </header>

      {/* Main Card */}
      <div className="w-full max-w-xl glass rounded-2xl p-8 glow-primary animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="space-y-6">
          {/* Schema Input */}
          <div className="space-y-2">
            <Label htmlFor="schema" className="text-sm font-medium text-foreground">
              Dataset Schema
            </Label>
            <Input
              id="schema"
              placeholder="Name, Age, Email, City"
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
              className="bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/30 h-11 text-foreground placeholder:text-muted-foreground"
            />
            {fieldErrors.schema ? (
              <p className="text-sm text-destructive">{fieldErrors.schema}</p>
            ) : (
              <p className="text-xs text-muted-foreground">Enter column names separated by commas.</p>
            )}
          </div>

          {/* Row Count */}
          <div className="space-y-2">
            <Label htmlFor="rows" className="text-sm font-medium text-foreground">
              Number of Rows
            </Label>
            <Input
              id="rows"
              type="number"
              min={1}
              value={rows}
              onChange={(e) => setRows(parseInt(e.target.value) || 0)}
              className="bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/30 h-11 text-foreground w-32"
            />
            {fieldErrors.rows && <p className="text-sm text-destructive">{fieldErrors.rows}</p>}
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full h-12 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_hsla(250,80%,62%,0.4)] disabled:opacity-60 disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Generating dataset...
              </>
            ) : (
              "Generate Synthetic Dataset"
            )}
          </Button>

          {/* Error */}
          {error && (
            <Alert variant="destructive" className="bg-destructive/10 border-destructive/30 animate-fade-in">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Success */}
          {success && csvData && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center gap-2 text-[hsl(var(--success))]">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Dataset generated successfully</span>
              </div>
              <Button
                onClick={() => downloadCsv(csvData, "synthetic_data.csv")}
                variant="outline"
                className="w-full h-11 rounded-xl border-[hsl(var(--success))]/30 text-[hsl(var(--success))] hover:bg-[hsl(var(--success))]/10 transition-all duration-200 hover:scale-[1.02]"
              >
                <Download className="mr-2 h-4 w-4" />
                Download CSV
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 w-full max-w-3xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
        {featureCards.map((f) => (
          <div
            key={f.title}
            className="glass-subtle rounded-xl p-5 text-center transition-all duration-300 hover:scale-105 hover:border-primary/30 group"
          >
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-3 group-hover:bg-primary/20 transition-colors">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-sm text-foreground mb-1">{f.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
