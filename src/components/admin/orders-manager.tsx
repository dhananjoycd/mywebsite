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
  FileText,
  Edit2,
  ExternalLink,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DangerConfirmModal } from "@/components/admin/danger-confirm-modal";

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

  // Danger delete modal state
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleOpenModal = (order: Order) => {
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
      setTimeout(() => {
        setSuccess(false);
        setSelectedOrder(null);
      }, 1200);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error updating order";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeleteOrder = async () => {
    if (!orderToDelete) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/orders?id=${orderToDelete.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to delete");
      setOrders(orders.filter((o) => o.id !== orderToDelete.id));
      if (selectedOrder?.id === orderToDelete.id) setSelectedOrder(null);
      setOrderToDelete(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error deleting order";
      alert(message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white">Client Service Inquiries</h2>
          <p className="text-xs text-slate-400">
            Total Inquiries: <span className="font-semibold text-white">{orders.length}</span> (Click any inquiry to update status and send quotation notes)
          </p>
        </div>
      </div>

      {/* Orders Grid Display */}
      {orders.length === 0 ? (
        <Card className="rounded-3xl border-white/8 bg-slate-950/60 p-12 text-center text-slate-400">
          <ShoppingBag className="mx-auto h-10 w-10 text-slate-600 mb-3" />
          <h3 className="font-display text-base font-semibold text-white">No inquiries received yet</h3>
          <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
            When visitors submit service requests from the commercial pricing section, their orders and tracking codes will appear here.
          </p>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => {
            const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;

            return (
              <Card
                key={order.id}
                className="flex flex-col justify-between rounded-3xl border border-white/8 bg-slate-950/60 p-6 backdrop-blur-sm transition duration-200 hover:border-cyan-400/40 hover:bg-slate-900/60"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-cyan-300">
                      {order.trackingCode}
                    </span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                  </div>

                  <div className="mt-4 flex items-baseline justify-between">
                    <h3 className="font-display text-base font-bold text-white">
                      {order.clientName}
                    </h3>
                    <span className="font-display text-sm font-bold text-cyan-300">
                      {order.servicePrice}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-300 font-medium">
                    {order.serviceTitle}
                  </p>

                  <div className="mt-4 space-y-1.5 border-t border-white/6 pt-3 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 truncate">
                      <Mail className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{order.clientEmail}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span>{order.clientPhone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                      <Calendar className="h-3 w-3 shrink-0" />
                      <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
                  <Button
                    onClick={() => handleOpenModal(order)}
                    size="default"
                    className="gap-1.5 text-xs font-semibold"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    Manage / Update
                  </Button>

                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => setOrderToDelete(order)}
                    className="h-8 w-8 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Responsive & Scrollable Order Update Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-cyan-300">
                    {selectedOrder.trackingCode}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                    STATUS_CONFIG[selectedOrder.status]?.color || STATUS_CONFIG.PENDING.color
                  }`}>
                    {STATUS_CONFIG[selectedOrder.status]?.label || selectedOrder.status}
                  </span>
                </div>
                <h2 className="mt-1 font-display text-lg font-bold text-white">
                  Update Inquiry & Quotation
                </h2>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl border border-white/10 p-1.5 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {success && (
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-xs text-emerald-300">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Inquiry and quotation updated successfully!
              </div>
            )}

            {/* Client & Requested Service Details */}
            <div className="mt-5 space-y-3 text-xs">
              <div className="rounded-2xl border border-white/8 bg-slate-900/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white text-sm">{selectedOrder.clientName}</span>
                  <span className="text-[11px] text-slate-400">{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-slate-300 pt-1">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <a href={`mailto:${selectedOrder.clientEmail}`} className="text-cyan-300 hover:underline truncate">
                      {selectedOrder.clientEmail}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>{selectedOrder.clientPhone}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-slate-900/60 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">Selected Package:</p>
                  <p className="font-bold text-cyan-300">{selectedOrder.servicePrice}</p>
                </div>
                <p className="text-cyan-200 font-medium">{selectedOrder.serviceTitle}</p>
                
                {selectedOrder.projectDetails && (
                  <div className="mt-2 border-t border-white/6 pt-2">
                    <p className="font-semibold text-slate-400 mb-1">Client Project Requirements:</p>
                    <p className="whitespace-pre-wrap leading-relaxed text-slate-200 bg-slate-950/60 p-3 rounded-xl border border-white/5">
                      {selectedOrder.projectDetails}
                    </p>
                  </div>
                )}
              </div>

              {/* Status & Quote Form */}
              <form onSubmit={handleUpdate} className="space-y-4 border-t border-white/10 pt-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Change Order Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as OrderStatus)}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="PENDING">PENDING - Needs Review</option>
                    <option value="REVIEWED">REVIEWED - Acknowledged & Under Discussion</option>
                    <option value="QUOTED">QUOTED - Price & Scope Sent</option>
                    <option value="IN_PROGRESS">IN_PROGRESS - Work Started</option>
                    <option value="COMPLETED">COMPLETED - Finished & Delivered</option>
                    <option value="CANCELLED">CANCELLED - Declined / Void</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Quotation / Final Amount
                  </label>
                  <input
                    type="text"
                    value={quotationAmount}
                    onChange={(e) => setQuotationAmount(e.target.value)}
                    placeholder="e.g. $150 USD or Negotiated Rate"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Delivery Notes / Staging Link for Client Portal
                  </label>
                  <textarea
                    value={quotationNotes}
                    onChange={(e) => setQuotationNotes(e.target.value)}
                    placeholder="e.g. Staging preview: https://staging.example.com. Scope includes 3 rounds of design revision."
                    rows={3}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                  <p className="mt-1 text-[11px] text-slate-400">
                    The client will see these notes in real-time when they enter their tracking code at <code className="text-cyan-300">/track-order</code>.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setSelectedOrder(null)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading} className="gap-2">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save Status & Quote
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Danger Confirm Delete Modal */}
      <DangerConfirmModal
        isOpen={!!orderToDelete}
        title="Delete Client Inquiry"
        message={`Are you sure you want to permanently delete order "${orderToDelete?.trackingCode}" from ${orderToDelete?.clientName}? The client will no longer be able to track this inquiry.`}
        confirmText="Yes, Delete Inquiry"
        isLoading={deleteLoading}
        onConfirm={confirmDeleteOrder}
        onCancel={() => setOrderToDelete(null)}
      />
    </div>
  );
}
