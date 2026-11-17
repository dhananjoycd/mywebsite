"use client";

import { useState } from "react";
import { 
  KeyRound, 
  UserPlus, 
  ShieldCheck, 
  Trash2, 
  Eye, 
  EyeOff, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  User,
  Mail,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DangerConfirmModal } from "@/components/admin/danger-confirm-modal";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string | Date;
};

export function SecurityManager({
  initialAdmins,
  currentUserId,
}: {
  initialAdmins: AdminUser[];
  currentUserId: string;
}) {
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState<string | null>(null);
  const [pwdError, setPwdError] = useState<string | null>(null);

  // Add Admin State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAdminPwd, setNewAdminPwd] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Delete Admin State
  const [adminToDelete, setAdminToDelete] = useState<AdminUser | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Handle Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError(null);
    setPwdSuccess(null);

    if (newPassword.length < 6) {
      setPwdError("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdError("New passwords do not match.");
      return;
    }

    setPwdLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to update password");

      setPwdSuccess("Your password has been changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      setPwdError(err instanceof Error ? err.message : "Error updating password");
    } finally {
      setPwdLoading(false);
    }
  };

  // Handle Add Admin
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);

    if (!newName || !newEmail || !newAdminPwd) {
      setAddError("All fields are required.");
      return;
    }

    setAddLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          password: newAdminPwd,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to create admin");

      setAdmins([data.admin, ...admins]);
      setShowAddModal(false);
      setNewName("");
      setNewEmail("");
      setNewAdminPwd("");
    } catch (err: unknown) {
      setAddError(err instanceof Error ? err.message : "Error creating admin");
    } finally {
      setAddLoading(false);
    }
  };

  // Handle Delete Admin
  const confirmDeleteAdmin = async () => {
    if (!adminToDelete) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/users?id=${adminToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to delete admin");

      setAdmins(admins.filter((a) => a.id !== adminToDelete.id));
      setAdminToDelete(null);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error deleting admin");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* 1. Change Password Section */}
        <Card className="rounded-3xl border-white/10 bg-slate-950/60 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">Change Password</h2>
              <p className="text-xs text-slate-400">Update your current admin account password</p>
            </div>
          </div>

          {pwdError && (
            <div className="mt-5 flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{pwdError}</span>
            </div>
          )}

          {pwdSuccess && (
            <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{pwdSuccess}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="mt-6 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                Current Password
              </label>
              <div className="relative mt-1.5">
                <input
                  type={showPwd ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 pr-10 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                New Password
              </label>
              <input
                type={showPwd ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                Confirm New Password
              </label>
              <input
                type={showPwd ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                required
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <Button type="submit" disabled={pwdLoading} className="w-full gap-2 mt-2">
              {pwdLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
              Update Password
            </Button>
          </form>
        </Card>

        {/* 2. Registered Admins & Add New Admin */}
        <Card className="rounded-3xl border-white/10 bg-slate-950/60 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-white">Admin Accounts</h2>
                  <p className="text-xs text-slate-400">Users authorized to manage this portfolio</p>
                </div>
              </div>

              <Button 
                onClick={() => setShowAddModal(true)} 
                size="default" 
                className="gap-2 text-xs"
              >
                <UserPlus className="h-4 w-4" />
                Add Admin
              </Button>
            </div>

            <div className="mt-6 space-y-3">
              {admins.map((adm) => {
                const isCurrent = adm.id === currentUserId;
                return (
                  <div
                    key={adm.id}
                    className="flex items-center justify-between rounded-2xl border border-white/8 bg-slate-900/60 p-4 transition hover:border-white/15"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300 font-bold text-sm">
                        {adm.name?.charAt(0).toUpperCase() || "A"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white">{adm.name}</p>
                          {isCurrent && (
                            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[10px] font-medium text-cyan-300">
                              You (Active)
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">{adm.email}</p>
                      </div>
                    </div>

                    {!isCurrent && (
                      <button
                        onClick={() => setAdminToDelete(adm)}
                        className="rounded-xl border border-white/8 p-2 text-slate-400 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                        title="Delete Admin"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/8 bg-slate-900/40 p-4 text-xs text-slate-400">
            <span className="font-semibold text-white">Multi-Admin Security:</span> All admins can access CMS controls, orders, and site settings. Only delete accounts that you trust should no longer have access.
          </div>
        </Card>
      </div>

      {/* Responsive & Scrollable Add New Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Create New Admin</h3>
                  <p className="text-xs text-slate-400">Add an administrator to collaborate on CMS</p>
                </div>
              </div>
            </div>

            {addError && (
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <span>{addError}</span>
              </div>
            )}

            <form onSubmit={handleAddAdmin} className="mt-5 space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Full Name
                </label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Admin Email Address
                </label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                  Initial Password
                </label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="password"
                    value={newAdminPwd}
                    onChange={(e) => setNewAdminPwd(e.target.value)}
                    placeholder="At least 6 characters"
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowAddModal(false)}
                  disabled={addLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={addLoading} className="gap-2">
                  {addLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                  Create Admin
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Danger Delete Confirmation Modal */}
      <DangerConfirmModal
        isOpen={!!adminToDelete}
        title="Revoke Admin Access"
        message={`Are you sure you want to permanently remove "${adminToDelete?.name}" (${adminToDelete?.email})? They will immediately lose access to all admin and CMS controls.`}
        confirmText="Yes, Revoke Access"
        isLoading={deleteLoading}
        onConfirm={confirmDeleteAdmin}
        onCancel={() => setAdminToDelete(null)}
      />
    </div>
  );
}

