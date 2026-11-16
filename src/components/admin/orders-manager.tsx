"use client";

import { useState } from "react";
import { OrderStatus } from "@prisma/client";
import { 
  ShoppingBag, 
  Trash2, 
  Loader2, 
  Save, 
  X, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle2,
  Clock,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Order = {
  id: string;
  trackingCode: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceTitle: string;
  servicePrice: string;
  servicePoints: string[];
  projectDetails: string | null;
  status: OrderStatus;
  quotationAmount: number | string | null;
  quotationNotes: string | null;
  createdAt: Date | string;
};

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string }> = {
  PENDING: { label: "Pending Review", color: "border-amber-400/30 bg-amber-400/10 text-amber-300" },
  REVIEWED: { label: "Reviewed", color: "border-blue-400/30 bg-blue-400/10 text-blue-300" },
  QUOTED: { label: "Quote Sent", color: "border-purple-400/30 bg-purple-400/10 text-purple-300" },
  IN_PROGRESS: { label: "In Progress", color: "border-cyan-400/30 bg-cyan-400/10 text-cyan-300" },
  COMPLETED: { label: "Completed", color: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" },
  CANCELLED: { label: "Cancelled", color: "border-red-400/30 bg-red-400/10 text-red-300" },
};

export function OrdersManager({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<OrderStatus>("PENDING");
  const [quotationAmount, setQuotationAmount] = useState("");
  const [quotationNotes, setQuotationNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOpenDetail = (order: Order) => {
    setSelectedOrder(order);
    setStatus(order.status);
    setQuotationAmount(order.quotationAmount !== null && order.quotationAmount !== undefined ? String(order.quotationAmount) : "");
    setQuotationNotes(order.quotationNotes || "");
    setSuccess(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedOrder.id,
          status,
          quotationAmount: quotationAmount ? Number(quotationAmount) || quotationAmount : null,
          quotationNotes,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to update order");

      setOrders(orders.map((o) => (o.id === selectedOrder.id ? data.order : o)));
      setSelectedOrder(data.order);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error updating";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch(`/api/admin/orders?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to delete");
      setOrders(orders.filter((o) => o.id !== id));
      if (selectedOrder?.id === id) setSelectedOrder(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error deleting";
      alert(message);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      {/* Orders List */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <Card className="rounded-3xl border-white/8 bg-slate-950/60 p-8 text-center text-slate-400">
            No inquiries received yet. When visitors submit service orders on your website, they will appear here.
          </Card>
        ) : (
          orders.map((order) => {
            const isSelected = selectedOrder?.id === order.id;
            const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;

            return (
              <Card
                key={order.id}
                onClick={() => handleOpenDetail(order)}
                className={`cursor-pointer rounded-3xl border p-5 transition ${
                  isSelected
                    ? "border-cyan-400/50 bg-cyan-950/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                    : "border-white/8 bg-slate-950/60 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-300">{order.trackingCode}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusConfig.color}`}>
                    {statusConfig.label}
                  </span>
                </div>

                <div className="mt-3 flex items-baseline justify-between">
                  <h3 className="font-display text-base font-semibold text-white">{order.clientName}</h3>
                  <span className="font-display font-semibold text-cyan-300">{order.servicePrice}</span>
                </div>

                <p className="mt-1 text-xs text-slate-300">{order.serviceTitle}</p>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/6 pt-3">
                  <span>{order.clientEmail}</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Order Detail & Management Drawer */}
      <div>
        {selectedOrder ? (
          <Card className="sticky top-6 rounded-3xl border-cyan-400/30 bg-slate-950/80 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-cyan-300">{selectedOrder.trackingCode}</span>
                <h2 className="mt-1 font-display text-lg font-semibold text-white">Order Details</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => handleDelete(selectedOrder.id)}
                  className="h-8 w-8 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
                <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {success && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-xs text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                Order updated successfully!
              </div>
            )}

            <div className="mt-6 space-y-4 text-xs">
              <div className="rounded-2xl border border-white/8 bg-slate-900/60 p-4 space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="font-semibold text-white">Client:</span> {selectedOrder.clientName}
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="h-3.5 w-3.5 text-cyan-300" />
                  <a href={`mailto:${selectedOrder.clientEmail}`} className="text-cyan-300 hover:underline">
                    {selectedOrder.clientEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="h-3.5 w-3.5 text-cyan-300" />
                  <span>{selectedOrder.clientPhone}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-slate-900/60 p-4 space-y-2">
                <p className="font-semibold text-white">Requested Service:</p>
                <p className="text-cyan-300">{selectedOrder.serviceTitle} — {selectedOrder.servicePrice}</p>
                {selectedOrder.projectDetails && (
                  <div className="mt-2 border-t border-white/6 pt-2">
                    <p className="font-semibold text-slate-400 mb-1">Client Note / Project Description:</p>
                    <p className="whitespace-pre-wrap leading-relaxed text-slate-200">
                      {selectedOrder.projectDetails}
                    </p>
                  </div>
                )}
              </div>

              {/* Status & Quote Form */}
              <form onSubmit={handleUpdate} className="space-y-4 border-t border-white/10 pt-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Order Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as OrderStatus)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="PENDING">PENDING - Needs Review</option>
                    <option value="REVIEWED">REVIEWED - Acknowledged</option>
                    <option value="QUOTED">QUOTED - Price Sent to Client</option>
                    <option value="IN_PROGRESS">IN_PROGRESS - Work Started</option>
                    <option value="COMPLETED">COMPLETED - Finished & Delivered</option>
                    <option value="CANCELLED">CANCELLED - Declined</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Quotation / Final Amount</label>
                  <input
                    type="text"
                    value={quotationAmount}
                    onChange={(e) => setQuotationAmount(e.target.value)}
                    placeholder="e.g. $120 USD"
                    className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400">Quotation / Delivery Notes</label>
                  <textarea
                    value={quotationNotes}
                    onChange={(e) => setQuotationNotes(e.target.value)}
                    placeholder="Provide scope notes or link to staging environment for the client"
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full gap-2">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Status & Quote
                </Button>
              </form>
            </div>
          </Card>
        ) : (
          <Card className="rounded-3xl border-dashed border-white/10 bg-slate-950/30 p-8 text-center text-slate-500">
            Select an order from the list to view client requirements, update status, and manage quotes.
          </Card>
        )}
      </div>
    </div>
  );
}

