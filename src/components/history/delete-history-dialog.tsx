import { History } from "@/server";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export const DeleteHistoryDialog = ({
  itemToDelete,
  setItemToDelete,
  handleCancelDelete,
  handleConfirmDelete,
}: {
  itemToDelete: History | null;
  setItemToDelete: (item: History | null) => void;
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
}) => {
  return (
    <AlertDialog
      open={!!itemToDelete}
      onOpenChange={() => setItemToDelete(null)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Search History</AlertDialogTitle>
          <AlertDialogDescription>
            {`Are you sure you want to delete the search for "${itemToDelete?.address}"? This action cannot be undone.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelDelete}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
