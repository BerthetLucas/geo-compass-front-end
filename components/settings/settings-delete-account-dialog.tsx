import {
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useDeleteUserMutation } from "@/hooks/mutation/useDeleteUserMutation"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

interface SettingsDeleteAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsDeleteAccountDialog({
  open,
  onOpenChange,
}: SettingsDeleteAccountDialogProps) {
  const t = useTranslations("settings.deleteAccount")
  const { mutate: deleteUser, isPending } = useDeleteUserMutation()
  const handleDeleteUser = () => {
    deleteUser(undefined, {
      onError: () => toast.error(t("error")),
    })
  }

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("dialogTitle")}</DialogTitle>
        </DialogHeader>
        {t("dialogDescription")}
        <div className="mt-6 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            {t("cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteUser}
            disabled={isPending}
          >
            {t("confirm")}
          </Button>
        </div>
      </DialogContent>
    </DialogRoot>
  )
}
