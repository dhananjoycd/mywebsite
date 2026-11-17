"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Check, Save, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DangerConfirmModal } from "@/components/admin/danger-confirm-modal";

export type AdminService = {
  id: string;
  title: string;
  slug: string;
  description: string;
  points: string[];
  price: string;
  orderIndex: number;
  active: boolean;
};

export function ServicesManager({ initialServices }: { initialServices: AdminService[] }) {
  const [services, setServices] = useState<AdminService[]>(initialServices);
  const [editingService, setEditingService] = useState<Partial<AdminService> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Danger delete modal state
  const [serviceToDelete, setServiceToDelete] = useState<AdminService | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleOpenNew = () => {
    setIsNew(true);
    setEditingService({
      title: "",
      slug: "",
      description: "",
      points: ["Clean UI & UX", "Fully Responsive", "Modern Tech Stack"],
      price: "$100",
      orderIndex: services.length + 1,
      active: true,
    });
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService.description) {
      setError("Title and description are required.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/services", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to save service");

      if (isNew) {
        setServices([...services, data.service]);
      } else {
        setServices(services.map((s) => (s.id === data.service.id ? data.service : s)));
      }
      setEditingService(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error saving service";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeleteService = async () => {
    if (!serviceToDelete) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/services?id=${serviceToDelete.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to delete");
      setServices(services.filter((s) => s.id !== serviceToDelete.id));
      setServiceToDelete(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error deleting";
      alert(message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-slate-400">
          Total Commercial Packages: <span className="font-semibold text-white">{services.length}</span>
        </p>
        <Button onClick={handleOpenNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Service
        </Button>
      </div>

      {/* Responsive & Scrollable Edit / Add Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display text-lg font-semibold text-white">
                {isNew ? "Add New Service" : `Edit Service: ${editingService.title}`}
              </h2>
              <button
                onClick={() => setEditingService(null)}
                className="rounded-xl border border-white/10 p-1.5 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSave} className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Service Title</label>
                <input
                  type="text"
                  value={editingService.title || ""}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="e.g. Frontend Development"
                  required
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Price Display</label>
                <input
                  type="text"
                  value={editingService.price || ""}
                  onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  placeholder="e.g. $80 or Starts at $150"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Description</label>
                <textarea
                  value={editingService.description || ""}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  rows={2}
                  placeholder="Clear overview of what the client gets"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Deliverables / Points (one per line)</label>
                <textarea
                  value={editingService.points?.join("\n") || ""}
                  onChange={(e) => setEditingService({ ...editingService, points: e.target.value.split("\n").filter(Boolean) })}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  rows={4}
                  placeholder="Pixel-perfect Tailwind UI&#10;Mobile responsive&#10;Next.js 15 App Router"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="activeCheckbox"
                  checked={editingService.active !== false}
                  onChange={(e) => setEditingService({ ...editingService, active: e.target.checked })}
                  className="h-4 w-4 rounded border-white/20 bg-slate-900 text-cyan-400 focus:ring-0"
                />
                <label htmlFor="activeCheckbox" className="text-sm text-slate-300">
                  Active & Visible on Public Booking Section
                </label>
              </div>

              <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Button type="button" variant="secondary" onClick={() => setEditingService(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="gap-2">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Service
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Services List Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <Card key={service.id} className="flex flex-col justify-between rounded-3xl border-white/8 bg-slate-950/60 p-6 hover:border-white/15 transition">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-bold text-cyan-300">{service.price}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                  service.active ? "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20" : "bg-slate-800 text-slate-400"
                }`}>
                  {service.active ? "Active" : "Hidden"}
                </span>
              </div>

              <h3 className="mt-3 font-display text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-300">{service.description}</p>

              <div className="mt-4 space-y-2 border-t border-white/6 pt-4">
                {service.points.map((point, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 border-t border-white/8 pt-4">
              <Button
                size="icon"
                variant="secondary"
                onClick={() => {
                  setIsNew(false);
                  setEditingService(service);
                }}
                className="h-8 w-8 rounded-lg"
                title="Edit Service"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setServiceToDelete(service)}
                className="h-8 w-8 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10"
                title="Delete Service"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Danger Confirm Delete Modal */}
      <DangerConfirmModal
        isOpen={!!serviceToDelete}
        title="Delete Service Package"
        message={`Are you sure you want to permanently delete the "${serviceToDelete?.title}" package? Existing client orders linked to this service will be preserved, but new clients will not be able to select it.`}
        confirmText="Yes, Delete Package"
        isLoading={deleteLoading}
        onConfirm={confirmDeleteService}
        onCancel={() => setServiceToDelete(null)}
      />
    </div>
  );
}
