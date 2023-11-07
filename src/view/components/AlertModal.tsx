import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { cn } from "../../app/utils/cn";
import { Button } from "./Button";

interface IAlertModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  open: boolean;
  handleClose: () => void;
}

export function AlertModal({
  title,
  description,
  onConfirm,
  open,
  handleClose,
}: IAlertModalProps) {
  return (
    <AlertDialog.Root open={open} onOpenChange={handleClose}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className={cn(
            "fixed inset-0 bg-black/20 backdrop-blur-sm",
            "data-[state=open]:animate-overlayShow"
          )}
        />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[51] p-6 space-y-10 bg-white rounded-2xl shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] w-full max-w-[400px] outline-none data-[state=open]:animate-contentShow">
          <AlertDialog.Title asChild>
            <h2 className="font-bold text-2xl">{title}</h2>
          </AlertDialog.Title>
          <AlertDialog.Description className="text-gray-600">
            {description}
          </AlertDialog.Description>
          <div className="flex items-center justify-end gap-4 text-gray-800">
            <AlertDialog.Cancel asChild>
              <Button className="bg-slate-400 hover:bg-slate-300 text-white">
                Cancelar
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                className="bg-red-500 hover:bg-red-300"
                onClick={onConfirm}
              >
                Deletar Trade
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
